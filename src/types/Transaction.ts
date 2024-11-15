export type TransactionType = {
  id?: number;
  user_id: string;
  amount: number;
  type: string;
  note: string;
  created_at?: string;
  transaction_date: string;
};
