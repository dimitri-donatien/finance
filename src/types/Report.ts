export type ReportType = {
  id?: number;
  user_id: string;
  start_date: string;
  end_date: string;
  total_income: number;
  total_expense: number;
  created_at?: string;
};
