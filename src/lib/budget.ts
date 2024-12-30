import { supabase } from "@/lib/supabase";

import { BudgetType } from "@/types/Budget";

export async function getAllBudget() {
  const { data, error } = await supabase.from("budgets").select("*");
  if (error) throw new Error(error.message);
  return data || [];
}

export async function getBudget(id: number) {
  const { data, error } = await supabase
    .from("budgets")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function createBudget(data: BudgetType) {
  const { error } = await supabase.from("budgets").insert([data]);
  if (error) throw new Error(error.message);
}

export async function updateBudget(id: number, data: BudgetType) {
  const { error } = await supabase.from("budgets").update(data).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteBudget(id: number) {
  const { error } = await supabase.from("budgets").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteAllBudget() {
  const { error } = await supabase.from("budgets").delete();
  if (error) throw new Error(error.message);
}

export async function getBudgetsByCategory(category: number) {
  const { data, error } = await supabase
    .from("budgets")
    .select("*")
    .eq("category", category);
  if (error) throw new Error(error.message);
  return data || [];
}
