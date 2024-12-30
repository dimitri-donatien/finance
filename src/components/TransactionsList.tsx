import { createSignal, For, onMount } from 'solid-js';

import { supabase } from "@/lib/supabase";

import { user } from '@/stores/authStore';

import { getAllTransaction, getTransactionById, getTransactionByCategory, createTransaction, updateTransaction, deleteTransaction, deleteAllTransaction } from '@/lib/transaction';

import { TransactionType } from '@/types/Transaction';

function TransactionsList() {
    const [amount, setAmount] = createSignal(0);
    const [category, setCategory] = createSignal(0);
    const [transactionDate, setTransactionDate] = createSignal('');
    const [description, setDescription] = createSignal('');

    const [transactions, setTransactions] = createSignal<any[]>([]);

    onMount(async () => {
        const data = await getAllTransaction();
        setTransactions(data);
    });

    function handleCreateTransaction(e: Event, data: TransactionType) {
        e.preventDefault();
        createTransaction(data);
    }

    function handleGetTransactionById(e: Event, id: number) {
        e.preventDefault();
        getTransactionById(id);
    }

    function handleUpdate(e: Event, id: number, data: TransactionType) {
        e.preventDefault();
        updateTransaction(id, data);
    }

    function handleDelete(e: Event, id: number) {
        e.preventDefault();
        deleteTransaction(id);
    }

    function handleDeleteAll(e: Event) {
        e.preventDefault();
        deleteAllTransaction();
    }

    function handleGetTransactionByCategory(e: Event, category: string) {
        e.preventDefault();
        getTransactionByCategory(category);
    }

    return (
        <>
            {/* <form onSubmit={handleSubmit}>
                <input type="number" value={amount()} onInput={(e) => setAmount(Number(e.target.value))} placeholder="Nom de la transaction" required />
                <select value={type()} onChange={(e) => setType(e.target.value)}>
                    <option value="expense">Dépense</option>
                    <option value="income">Revenu</option>
                </select>
                <input type="text" value={note()} onInput={(e) => setNote(e.target.value)} placeholder="Note" required />
                <input type="date" value={transactionDate()} onInput={(e) => setTransactionDate(e.target.value)} placeholder="Date de la transaction" required />
                <button type="submit">Ajouter une transaction</button>
            </form>

            <For each={transactions()}>
                {(transaction) => (
                    <div>
                        <span>{transaction.amount}</span>
                        <span>{transaction.type}</span>
                        <span>{transaction.note}</span>
                        <span>{transaction.transaction_date}</span>
                        <button onClick={(e) => handleUpdate(e, transaction.id)}>Modifier</button>
                        <button onClick={(e) => handleDelete(e, transaction.id)}>Supprimer</button>
                    </div>

                )}
            </For> */}
        </>
    );
}

export default TransactionsList;