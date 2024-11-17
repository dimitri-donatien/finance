import { createSignal, For, onMount } from 'solid-js';
import { supabase } from "@/services/supabaseClient";
import { getAllBudget } from '@/services/budgetService';

import { user } from '@/stores/authStore';

function BudgetsList() {
    const [name, setName] = createSignal('');
    const [totalAmount, setTotalAmount] = createSignal('');
    const [spentAmount, setSpentAmount] = createSignal('');
    const [startDate, setStartDate] = createSignal('');
    const [endDate, setEndDate] = createSignal('');

    const [budgets, setBudgets] = createSignal<any[]>([]);

    onMount(async () => {
        const data = await getAllBudget();
        setBudgets(data);
    });

    async function createBudget() {
        const { data, error } = await supabase
            .from('budgets')
            .insert(
                [
                    {
                        name: name(),
                        total_amount: totalAmount(),
                        spent_amount: spentAmount(),
                        start_date: startDate(),
                        end_date: endDate(),
                        user_id: user().id
                    }
                ]
            );
    }

    async function updateBudget(id: number) {
        const { data, error } = await supabase
            .from('budgets')
            .update({
                name: name(),
                total_amount: totalAmount(),
                spent_amount: spentAmount(),
                start_date: startDate(),
                end_date: endDate()
            })
            .eq('id', id);
    }

    async function deleteBudget(id: number) {
        const { data, error } = await supabase
            .from('budgets')
            .delete()
            .eq('id', id);
    }

    function handleUpdate(e: Event, id: number) {
        e.preventDefault();
        updateBudget(id);
    }

    function handleDelete(e: Event, id: number) {
        e.preventDefault();
        deleteBudget(id);
    }

    function handleSubmit(e: Event) {
        e.preventDefault();
        createBudget();
    }

    return (
        <>
            <h2>Liste des Bugdgets :</h2>

            <form onSubmit={handleSubmit}>
                <input type="text" value={name()} onInput={(e) => setName(e.target.value)} placeholder="Nom du budget" required />
                <input type="number" value={spentAmount()} onInput={(e) => setSpentAmount(e.target.value)} placeholder="Montant dépensé" />
                <input type="date" value={startDate()} onInput={(e) => setStartDate(e.target.value)} placeholder="Date de début" required />
                <input type="date" value={endDate()} onInput={(e) => setEndDate(e.target.value)} placeholder="Date de fin" required />
                <button type="submit">Ajouter le budget</button>
            </form>

            <For each={budgets()}>
                {(budget) => (
                    <div>
                        <span>{budget.name}</span>
                        <span>{budget.total_amount}</span>
                        <span>{budget.spent_amount}</span>
                        <span>{budget.start_date}</span>
                        <span>{budget.end_date}</span>
                        <button onClick={(e) => handleUpdate(e, budget.id)}>Modifier</button>
                        <button onClick={(e) => handleDelete(e, budget.id)}>Supprimer</button>
                    </div>
                )}
            </For>
        </>
    );
}

export default BudgetsList;