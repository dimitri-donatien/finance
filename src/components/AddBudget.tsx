import { createSignal } from 'solid-js';
import { supabase } from "../services/supabaseClient";

import { user } from '../stores/authStore';
import { Budget } from '../types/Budget';

export default function AddBudget() {
    const [name, setName] = createSignal('');
    const [totalAmount, setTotalAmount] = createSignal('');
    const [spentAmount, setSpentAmount] = createSignal('');
    const [startDate, setStartDate] = createSignal('');
    const [endDate, setEndDate] = createSignal('');

    async function createBudget() {
        const { data, error } = await supabase
            .from('budgets')
            .insert({ name: name(), total_amount: parseInt(totalAmount()), spent_amount: parseInt(spentAmount()), start_date: startDate(), end_date: endDate(), user_id: user()?.id } as Budget);
    }

    function handleSubmit(e: Event) {
        e.preventDefault();
        createBudget();
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name()} onInput={(e) => setName(e.target.value)} placeholder="Nom du budget" required />
            <input type="number" value={totalAmount()} onInput={(e) => setTotalAmount(e.target.value)} placeholder="Montant total" required />
            <input type="number" value={spentAmount()} onInput={(e) => setSpentAmount(e.target.value)} placeholder="Montant dépensé" />
            <input type="date" value={startDate()} onInput={(e) => setStartDate(e.target.value)} placeholder="Date de début" required />
            <input type="date" value={endDate()} onInput={(e) => setEndDate(e.target.value)} placeholder="Date de fin" required />
            <button type="submit">Ajouter le budget</button>
        </form>
    );
}