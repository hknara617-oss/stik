"use server";

import { supabase } from "@/lib/supabaseClient";

export async function findOrCreateSchoolWall(name: string, year: number, grade: string) {
  // Try to find existing wall
  const { data: existing } = await supabase
    .from('walls')
    .select('*')
    .eq('type', 'school')
    .eq('name', name)
    .eq('year', year)
    .eq('grade', grade)
    .maybeSingle();

  if (existing) {
    return { success: true, wall: existing };
  }

  // Create new wall if not found
  const { data: newWall, error: createError } = await supabase
    .from('walls')
    .insert({
      type: 'school',
      name,
      year,
      grade
    })
    .select()
    .single();

  if (createError) {
    console.error("Error creating wall:", createError);
    return { success: false, error: createError.message };
  }

  return { success: true, wall: newWall };
}

export async function findOrCreateHagwonWall(region: string, subject: string, year: number, session: string) {
  const { data: existing } = await supabase
    .from('walls')
    .select('*')
    .eq('type', 'hagwon')
    .eq('region', region)
    .eq('subject', subject)
    .eq('year', year)
    .eq('session', session)
    .maybeSingle();

  if (existing) {
    return { success: true, wall: existing };
  }

  const { data: newWall, error: createError } = await supabase
    .from('walls')
    .insert({
      type: 'hagwon',
      region,
      subject,
      year,
      session
    })
    .select()
    .single();

  if (createError) {
    console.error("Error creating hagwon wall:", createError);
    return { success: false, error: createError.message };
  }

  return { success: true, wall: newWall };
}

export async function getWallSignals(wallId: string) {
  const { data, error } = await supabase
    .from('signals')
    .select('*')
    .eq('wall_id', wallId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching signals:", error);
    return { success: false, signals: null, error: error.message };
  }

  return { success: true, signals: data };
}
