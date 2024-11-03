import { supabase } from "./supabaseClient.js";

export async function getAllFinances() {
  const { data, error } = await supabase.from("finances").select("*");
  if (error) throw new Error(error.message);
  return data ?? [];
}

interface Finance {
  id?: number;
  amount: number;
  description: string;
  date: string;
}

export async function createFinance(finance: Finance): Promise<Finance[]> {
  const { data, error } = await supabase.from("finances").insert([finance]);
  if (error) throw new Error(error.message);
  return data ?? [];
}
