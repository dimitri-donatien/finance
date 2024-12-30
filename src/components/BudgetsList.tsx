import { createSignal, For, onMount } from 'solid-js';

import { supabase } from "@/lib/supabase";

import { user } from '@/stores/authStore';

import { BudgetType } from '@/types/Budget';

import { getAllBudget, getBudget, createBudget, updateBudget, deleteBudget, deleteAllBudget, getBudgetsByCategory } from '@/lib/budget';

function BudgetsList() {
    const [amount, setAmount] = createSignal(0);
    const [category_id, setCategory] = createSignal(0);
    const [start_date, setStartDate] = createSignal('');
    const [end_date, setEndDate] = createSignal('');

    const [budgets, setBudgets] = createSignal<any[]>([]);

    onMount(async () => {
        const budget = await getAllBudget();
        setBudgets(budget);
    });

    function handleCreateBudget(e: Event, data: BudgetType) {
        e.preventDefault();
        createBudget(data);
    }

    function handleBudget(e: Event, id: number) {
        e.preventDefault();
        getBudget(id);
    }

    function handleUpdate(e: Event, id: number, data: BudgetType) {
        e.preventDefault();
        updateBudget(id, data);
    }

    function handleDelete(e: Event, id: number) {
        e.preventDefault();
        deleteBudget(id);
    }

    function handleDeleteAll(e: Event) {
        e.preventDefault();
        deleteAllBudget();
    }

    function handleGetBudgetsByCategory(e: Event, category_id: number) {
        e.preventDefault();
        getBudgetsByCategory(category_id);
    }

    return (
        <>
            {/* <h2>Liste des Budgets :</h2>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nom du budget" onInput={(e) => setName(e.currentTarget.value)} />
                <input type="number" placeholder="Montant total" onInput={(e) => setTotalAmount(e.currentTarget.value)} />
                <input type="text" placeholder="Période" onInput={(e) => setPeriod(e.currentTarget.value)} />

                <select>
                    <option value="">Choisir une catégorie</option>
                    <For each={categories()}>
                        {(category) => (
                            <option value={category.id}>{category.name}</option>
                        )}
                    </For>
                </select>

                <button type="submit">Ajouter le budget</button>
            </form>

            <For each={budgets()}>
                {(budget) => (
                    <div>
                        <span>{budget.name}</span>
                        <span>{budget.amount}</span>
                        <span>{budget.period}</span>
                        <button onClick={(e) => handleUpdate(e, budget.id)}>Modifier</button>
                        <button onClick={(e) => handleDelete(e, budget.id)}>Supprimer</button>
                    </div>
                )}
            </For> */}
        </>
    );
}

export default BudgetsList;