import { supabase } from "@/services/supabaseClient";

export async function getAllTransaction() {
  const { data, error } = await supabase.from("transactions").select("*");
  if (error) throw new Error(error.message);
  return data || [];
}
