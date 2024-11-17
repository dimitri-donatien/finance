import { supabase } from "@/services/supabaseClient";

export async function getAllReport() {
  const { data, error } = await supabase.from("reports").select("*");
  if (error) throw new Error(error.message);
  return data || [];
}
