import { supabase } from "@/services/supabaseClient";

export async function getAllBudget() {
  const { data, error } = await supabase.from("budgets").select("*");
  if (error) throw new Error(error.message);
  return data || [];
}
