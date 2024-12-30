import { supabase } from "@/lib/supabase";

import { TransactionType } from "@/types/Transaction";

export async function getAllTransaction() {
  const { data, error } = await supabase.from("transactions").select("*");
  if (error) throw new Error(error.message);
  return data || [];
}

export async function getTransactionById(id: number) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function createTransaction(data: TransactionType) {
  const { error } = await supabase.from("transactions").insert([data]);
  if (error) throw new Error(error.message);
}

export async function updateTransaction(id: number, data: TransactionType) {
  const { error } = await supabase
    .from("transactions")
    .update(data)
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteTransaction(id: number) {
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteAllTransaction() {
  const { error } = await supabase.from("transactions").delete();
  if (error) throw new Error(error.message);
}

export async function getTransactionByCategory(category: string) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("category", category);
  if (error) throw new Error(error.message);
  return data || [];
}
