import { supabase } from "@/services/supabaseClient";

export async function getAllCategory() {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) throw new Error(error.message);
  return data || [];
}
