import { onMount, createRoot } from "solid-js"
import { produce, createStore } from "solid-js/store"
import { supabase } from "@/lib/supabase"

const statisticsStore = createRoot(() => {
  const [state, setState] = createStore({
    statistics: {
      totalAmount: 0,
      income: 0,
      expense: 0,
      saving: 0,
      totalTransactions: 0,
      totalIncomeTransactions: 0,
      totalExpenseTransactions: 0,
      totalSavingTransactions: 0,
    },
    error: "" as string | null,
    loading: true,
  })

  return state
})
