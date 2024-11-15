import { createSignal, For } from 'solid-js';
import { supabase } from "@/services/supabaseClient";
import { getAllCategory } from '@/services/categoryService';

import { user } from '@/stores/authStore';

import { CategoryType } from '@/types/Category';

function CategoriesList() {

    const [name, setName] = createSignal('');

    async function createCategory() {
        const { data, error } = await supabase
            .from('categories')
            .insert(
                [
                    {
                        name: name(),
                        user_id: user().id
                    } as CategoryType
                ]
            );
    }

    async function updateCategory(id: number) {
        const { data, error } = await supabase
            .from('categories')
            .update({
                name: name()
            })
            .eq('id', id);
    }

    async function deleteCategory(id: number) {
        const { data, error } = await supabase
            .from('categories')
            .delete()
            .eq('id', id);
    }

    function handleUpdate(e: Event, id: number) {
        e.preventDefault();
        updateCategory(id);
    }

    function handleDelete(e: Event, id: number) {
        e.preventDefault();
        deleteCategory(id);
    }

    function handleSubmit(e: Event) {
        e.preventDefault();
        createCategory();
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name()} onInput={(e) => setName(e.target.value)} placeholder="Nom de la catégorie" required />
            <button type="submit">Ajouter la catégorie</button>
        </form>
    );
}

export default CategoriesList;