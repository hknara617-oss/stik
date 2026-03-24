"use server";

import { supabase } from "@/lib/supabaseClient";
import { validateContent } from "@/lib/moderation";

export async function createStik(wallId: string, deviceId: string, message: string, color: string) {
  // 1. Content Moderation Check
  const moderation = validateContent(message);
  if (!moderation.isSafe) {
    return { success: false, error: moderation.reason };
  }

  // 2. Ban Check
  const { data: ban } = await supabase.from('banned_devices').select('*').eq('device_id', deviceId).maybeSingle();
  if (ban) {
    return { success: false, error: "신고 누적으로 인해 일시적으로 이용이 제한되었습니다." };
  }

  // Check if this device already has a stik on this wall
  const { data: existing } = await supabase
    .from('signals')
    .select('id')
    .eq('wall_id', wallId)
    .eq('device_id', deviceId)
    .maybeSingle();

  if (existing) {
    return { success: false, error: "이미 이 벽에 신호를 남겼습니다." };
  }

  const { data: newSignal, error } = await supabase
    .from('signals')
    .insert({
      wall_id: wallId,
      device_id: deviceId,
      message,
      color,
      status: 'waiting',
      temperature: 0
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating stik:", error);
    return { success: false, error: error.message };
  }

  return { success: true, signal: newSignal };
}

export async function reportStik(signalId: string, reporterDeviceId: string, reason: string) {
  // 1. Log report
  const { error: reportError } = await supabase
    .from('reports')
    .insert({ signal_id: signalId, reporter_device_id: reporterDeviceId, reason });

  if (reportError) {
    if (reportError.code === '23505') return { success: false, error: "이미 신고한 게시물입니다." };
    return { success: false, error: reportError.message };
  }

  // 2. Increment count and check for blind
  // We use postgres increment for atomic update
  const { data: updatedSignal, error: updateError } = await supabase.rpc('increment_report_count', { row_id: signalId });
  
  if (updateError) {
    // Fallback if RPC isn't defined yet
    const { data: current } = await supabase.from('signals').select('report_count').eq('id', signalId).single();
    const newCount = (current?.report_count || 0) + 1;
    await supabase.from('signals').update({ 
      report_count: newCount,
      is_blinded: newCount >= 3 
    }).eq('id', signalId);
  }

  // 3. Automated Device Banning Logic (Safety Feature)
  // If a user has >= 3 blinded posts, they get a temporary ban.
  const { data: signalOwner } = await supabase.from('signals').select('device_id').eq('id', signalId).single();
  if (signalOwner) {
    const { count } = await supabase
      .from('signals')
      .select('*', { count: 'exact', head: true })
      .eq('device_id', signalOwner.device_id)
      .eq('is_blinded', true);

    if (count !== null && count >= 3) {
      await supabase.from('banned_devices').insert({
        device_id: signalOwner.device_id,
        reason: "부적절한 콘텐츠 게시 누적으로 인한 자동 차단",
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ban
      }).upsert({ onConflict: 'device_id' });
    }
  }

  return { success: true };
}
