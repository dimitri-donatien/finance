export const getCategoryName = (id: number, categories: any[]) => {
  const category = categories.find(cat => cat.id === id)
  return category ? category.name : "Unknown"
}
