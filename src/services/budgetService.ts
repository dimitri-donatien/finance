import { supabase } from "./supabaseClient.js";

export async function getAllBudgets() {
  const { data, error } = await supabase.from("budgets").select("*");
  if (error) throw new Error(error.message);
  return data || [];
}
