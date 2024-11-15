export type BudgetType = {
  id?: number;
  user_id: string;
  category_id: number;
  amount: number;
  period: string;
  created_at?: string;
};
