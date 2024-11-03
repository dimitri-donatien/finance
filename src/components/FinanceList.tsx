// src/components/FinanceList.tsx
import { createSignal, onMount, For } from 'solid-js';
import { getAllFinances } from '../services/financeService.js';

export default function FinanceList() {
    const [finances, setFinances] = createSignal<any[]>([]);

    onMount(async () => {
        try {
            const data = await getAllFinances();
            setFinances(data);
        } catch (error) {
            console.error("Error fetching finances:", error);
        }
    });

    return (
        <div>
            <h2>Finances</h2>
            <ul>
                <For each={finances()} fallback={<li>Loading...</li>}>
                    {(finance, id) => (
                        <li>
                            {finance.description} - ${finance.amount} on {finance.date}
                        </li>
                    )}
                </For>
            </ul>
        </div>
    );
}
