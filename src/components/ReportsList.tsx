import { createSignal, For, onMount } from 'solid-js';
import { supabase } from "@/services/supabaseClient";
import { getAllReport } from '@/services/reportService';

import { user } from '@/stores/authStore';

import { ReportType } from '@/types/Report';

function ReportsList() {

    const [startDate, setStartDate] = createSignal('');
    const [endDate, setEndDate] = createSignal('');
    const [totalIncome, setTotalIncome] = createSignal(0);
    const [totalExpense, setTotalExpense] = createSignal(0);

    const [reports, setReports] = createSignal<any[]>([]);

    onMount(async () => {
        const data = await getAllReport();
        setReports(data);
    })

    async function createReport() {
        const { data, error } = await supabase
            .from('reports')
            .insert(
                [
                    {
                        start_date: startDate(),
                        end_date: endDate(),
                        total_income: totalIncome(),
                        total_expense: totalExpense(),
                        user_id: user().id
                    } as ReportType
                ]
            );
    }

    async function updateReport(id: number) {
        const { data, error } = await supabase
            .from('reports')
            .update({
                start_date: startDate(),
                end_date: endDate(),
                total_income: totalIncome(),
                total_expense: totalExpense()
            })
            .eq('id', id);
    }

    async function deleteReport(id: number) {
        const { data, error } = await supabase
            .from('transactions')
            .delete()
            .eq('id', id);
    }

    function handleUpdate(e: Event, id: number) {
        e.preventDefault();
        updateReport(id);
    }

    function handleDelete(e: Event, id: number) {
        e.preventDefault();
        deleteReport(id);
    }

    function handleSubmit(e: Event) {
        e.preventDefault();
        createReport();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="date" value={startDate()} onInput={(e) => setStartDate(e.target.value)} placeholder="Date de début" required />
                <input type="date" value={endDate()} onInput={(e) => setEndDate(e.target.value)} placeholder="Date de fin" required />
                <input type="number" value={totalIncome()} onInput={(e) => setTotalIncome(Number(e.target.value))} placeholder="Revenu total" required />
                <input type="number" value={totalExpense()} onInput={(e) => setTotalExpense(Number(e.target.value))} placeholder="Dépense totale" required />
                <button type="submit">Ajouter un rapport</button>
            </form>

            <For each={reports()}>
                {(report) => (
                    <div>
                        <span>{report.start_date}</span>
                        <span>{report.end_date}</span>
                        <span>{report.total_income}</span>
                        <span>{report.total_expense}</span>
                        <button onClick={(e) => handleUpdate(e, report.id)}>Modifier</button>
                        <button onClick={(e) => handleDelete(e, report.id)}>Supprimer</button>
                    </div>

                )}
            </For>
        </>
    );
}

export default ReportsList;