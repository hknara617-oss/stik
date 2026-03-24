"use server";

import { supabase } from "@/lib/supabaseClient";

export async function submitMemory(wallId: string, deviceId: string, question: string, answer: string) {
  const { data: memory, error } = await supabase
    .from('memories')
    .insert({
      wall_id: wallId,
      device_id: deviceId,
      question,
      answer
    })
    .select()
    .single();

  if (error) {
    console.error("Error submitting memory:", error);
    return { success: false, error: error.message };
  }
  
  // Find signal for this device on this wall to increase temperature
  const { data: signal } = await supabase
    .from('signals')
    .select('id, temperature')
    .eq('wall_id', wallId)
    .eq('device_id', deviceId)
    .maybeSingle();

  if (signal) {
    const newTemp = Math.min(100, signal.temperature + 5);
    await supabase.from('signals').update({ temperature: newTemp }).eq('id', signal.id);
  }

  return { success: true, memory };
}
