import { createSignal, createMemo, For, Show, onCleanup } from "solid-js";
import { onMount } from "solid-js";
import { Portal } from "solid-js/web";

import { TransactionType } from "@/types/Transaction";
import { user } from "@/stores/authStore";

import { getAllTransaction, createTransaction, updateTransaction, deleteTransaction } from "@/lib/transaction";
import { getAllCategory, createCategory } from "@/lib/category";
import { getCategoryName } from "@/lib/utils";

import "@/scss/components/transaction-table.scss";

const TransactionTable = () => {
    const [transactions, setTransactions] = createSignal<any[]>([]);
    const [categories, setCategories] = createSignal<any[]>([]);
    const [searchTerm, setSearchTerm] = createSignal("");
    const [sortColumn, setSortColumn] = createSignal<keyof TransactionType>("amount");
    const [sortOrder, setSortOrder] = createSignal<"asc" | "desc">("asc");

    const [isModalOpen, setIsModalOpen] = createSignal(false); // Ensure only one modal is open
    const [modalType, setModalType] = createSignal<"transaction" | "category" | "delete" | null>(null);

    const [isEditMode, setIsEditMode] = createSignal(false);
    const [selectedTransaction, setSelectedTransaction] = createSignal<TransactionType | null>(null);
    const [transactionToDelete, setTransactionToDelete] = createSignal<number | null>(null);

    onMount(async () => {
        const transactionData = await getAllTransaction();
        const categoryData = await getAllCategory();
        setTransactions(transactionData);
        setCategories(categoryData);
    });

    const filteredTransactions = createMemo(() => {
        const lowerSearchTerm = searchTerm().toLowerCase();
        return transactions()
            .filter((t) =>
                Object.values(t).some((value) => String(value).toLowerCase().includes(lowerSearchTerm))
            )
            .sort((a, b) => {
                const valueA = a[sortColumn()];
                const valueB = b[sortColumn()];
                if (valueA < valueB) return sortOrder() === "asc" ? -1 : 1;
                if (valueA > valueB) return sortOrder() === "asc" ? 1 : -1;
                return 0;
            });
    });

    const toggleSortOrder = (column: keyof TransactionType) => {
        if (sortColumn() === column) {
            setSortOrder(sortOrder() === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }
    };

    const openModal = (type: "transaction" | "category" | "delete") => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setModalType(null);
        setIsModalOpen(false);
        setIsEditMode(false);
        setSelectedTransaction(null);
        setTransactionToDelete(null);
    };

    const handleCreateOrUpdateTransaction = async (e: Event) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData) as unknown as TransactionType;

        if (isEditMode()) {
            await updateTransaction(selectedTransaction()?.id!, data);
        } else {
            data.user_id = user().id;
            await createTransaction(data);
        }

        setTransactions(await getAllTransaction()); // Refresh transactions
        closeModal();
    };

    const handleDeleteTransaction = async () => {
        if (transactionToDelete() !== null) {
            await deleteTransaction(transactionToDelete()!);
            setTransactions(await getAllTransaction()); // Refresh transactions
        }
        closeModal();
    };

    const handleEditTransaction = (transaction: TransactionType) => {
        setSelectedTransaction(transaction);
        setIsEditMode(true);
        openModal("transaction");
    };

    onCleanup(() => document.removeEventListener("keydown", handleKeyPress));

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeModal();
    };

    onMount(() => document.addEventListener("keydown", handleKeyPress));

    const handleCreateCategory = async (e: Event) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = { name: formData.get("name") as string, user_id: user().id };
        await createCategory(data);
        setCategories(await getAllCategory()); // Refresh categories
        closeModal();
    };

    return (
        <div class="transaction-table">
            <div class="toolbar">
                <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm()}
                    onInput={(e) => setSearchTerm(e.currentTarget.value)}
                />
                <button onClick={() => openModal("category")}>Create Category</button>
                <button onClick={() => openModal("transaction")}>Create Transaction</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th onClick={() => toggleSortOrder("amount")}>Amount {sortColumn() === "amount" ? (sortOrder() === "asc" ? "↑" : "↓") : ""}</th>
                        <th>Category</th>
                        <th onClick={() => toggleSortOrder("transaction_date")}>Date {sortColumn() === "transaction_date" ? (sortOrder() === "asc" ? "↑" : "↓") : ""}</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <For each={filteredTransactions()}>
                        {(transaction) => (
                            <tr>
                                <td>${transaction.amount.toFixed(2)}</td>
                                <td>{getCategoryName(transaction.category_id, categories())}</td>
                                <td>{transaction.transaction_date}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.type}</td>
                                <td>
                                    <button onClick={() => handleEditTransaction(transaction)}>Edit</button>
                                    <button onClick={() => { setTransactionToDelete(transaction.id); openModal("delete"); }}>Delete</button>
                                </td>
                            </tr>
                        )}
                    </For>
                </tbody>
            </table>

            {/* Transaction Modal */}
            <Show when={modalType() === "transaction"}>
                <Portal>
                    <div class="modal" onClick={(e) => e.target === e.currentTarget && closeModal()}>
                        <div class="modal-content">
                            <h2>{isEditMode() ? "Edit Transaction" : "Create Transaction"}</h2>
                            <form onSubmit={handleCreateOrUpdateTransaction}>
                                <label>
                                    Amount:
                                    <input type="number" name="amount" step="0.01" value={selectedTransaction()?.amount || ""} required />
                                </label>
                                <label>
                                    Category:
                                    <select name="category_id" required>
                                        <option value="">Choose a category</option>
                                        <For each={categories()}>{(category) => <option value={category.id}>{category.name}</option>}</For>
                                    </select>
                                </label>
                                <label>
                                    Date:
                                    <input type="date" name="transaction_date" value={selectedTransaction()?.transaction_date || ""} required />
                                </label>
                                <label>
                                    Description:
                                    <textarea name="description" value={selectedTransaction()?.description || ""}></textarea>
                                </label>
                                <label>
                                    Type:
                                    <select name="type" required>
                                        <option value="income" selected={selectedTransaction()?.type === "income"}>Income</option>
                                        <option value="expense" selected={selectedTransaction()?.type === "expense"}>Expense</option>
                                    </select>
                                </label>
                                <button type="submit">{isEditMode() ? "Update" : "Save"}</button>
                                <button type="button" onClick={closeModal}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </Portal>
            </Show>

            {/* Category Modal */}
            <Show when={modalType() === "category"}>
                <Portal>
                    <div class="modal" onClick={(e) => e.target === e.currentTarget && closeModal()}>
                        <div class="modal-content">
                            <h2>Create Category</h2>
                            <form onSubmit={handleCreateCategory}>
                                <label>
                                    Name:
                                    <input type="text" name="name" required />
                                </label>
                                <button type="submit">Save</button>
                                <button type="button" onClick={closeModal}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </Portal>
            </Show>

            {/* Delete Confirmation Modal */}
            <Show when={modalType() === "delete"}>
                <Portal>
                    <div class="modal" onClick={(e) => e.target === e.currentTarget && closeModal()}>
                        <div class="modal-content">
                            <h2>Confirm Delete</h2>
                            <p>Are you sure you want to delete this transaction?</p>
                            <button onClick={handleDeleteTransaction}>Yes</button>
                            <button onClick={closeModal}>No</button>
                        </div>
                    </div>
                </Portal>
            </Show>
        </div>
    );
};

export default TransactionTable;
