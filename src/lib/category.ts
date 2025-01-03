import { supabase } from "@/lib/supabase"

import { CategoryType } from "@/types/Category"

export async function getAllCategory() {
  const { data, error } = await supabase.from("categories").select("*")
  if (error) throw new Error(error.message)
  return data || []
}

// get id associate with category name
export async function getCategoryID(name: string) {
  const { data, error } = await supabase
    .from("categories")
    .select("id")
    .eq("name", name)
  if (error) throw new Error(error.message)
  return data || []
}

// get category name associate with id
export async function getCategoryName(id: number) {
  const { data, error } = await supabase
    .from("categories")
    .select("name")
    .eq("id", id)
  if (error) throw new Error(error.message)
  return data || []
}

export async function createCategory(data: CategoryType) {
  const { error } = await supabase.from("categories").insert([data])
  if (error) throw new Error(error.message)
}

export async function updateCategory(id: string, data: CategoryType) {
  const { error } = await supabase.from("categories").update(data).eq("id", id)
  if (error) throw new Error(error.message)
}

export async function deleteCategory(id: string) {
  const { error } = await supabase.from("categories").delete().eq("id", id)
  if (error) throw new Error(error.message)
}

export async function deleteAllCategory() {
  const { error } = await supabase.from("categories").delete()
  if (error) throw new Error(error.message)
}
