"use server";

import { supabase } from "@/lib/supabaseClient";

export async function createSignal(wallId: string, deviceId: string, message: string, color: string) {
  // Check if this device already has a signal on this wall
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
    console.error("Error creating signal:", error);
    return { success: false, error: error.message };
  }

  return { success: true, signal: newSignal };
}
