import { createSignal, For, onMount } from 'solid-js';
import { supabase } from "@/services/supabaseClient";
import { getAllTransaction } from '@/services/transactionService';

import { user } from '@/stores/authStore';

import { TransactionType } from '@/types/Transaction';

function TransactionsList() {

    const [amount, setAmount] = createSignal(0);
    const [type, setType] = createSignal('expense');
    const [note, setNote] = createSignal('');
    const [transactionDate, setTransactionDate] = createSignal('');

    const [transactions, setTransactions] = createSignal<any[]>([]);

    onMount(async () => {
        const data = await getAllTransaction();
        setTransactions(data);
    })

    async function createTransaction() {
        const { data, error } = await supabase
            .from('transactions')
            .insert(
                [
                    {
                        amount: amount(),
                        type: type(),
                        note: note(),
                        transaction_date: transactionDate(),
                        user_id: user().id
                    } as TransactionType
                ]
            );
    }

    async function updateTransaction(id: number) {
        const { data, error } = await supabase
            .from('transactions')
            .update({
                amount: amount(),
                type: type(),
                note: note(),
                transaction_date: transactionDate()
            })
            .eq('id', id);
    }

    async function deleteTransaction(id: number) {
        const { data, error } = await supabase
            .from('transactions')
            .delete()
            .eq('id', id);
    }

    function handleUpdate(e: Event, id: number) {
        e.preventDefault();
        updateTransaction(id);
    }

    function handleDelete(e: Event, id: number) {
        e.preventDefault();
        deleteTransaction(id);
    }

    function handleSubmit(e: Event) {
        e.preventDefault();
        createTransaction();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
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
            </For>
        </>
    );
}

export default TransactionsList;