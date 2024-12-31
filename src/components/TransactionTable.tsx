import { createSignal, createMemo } from "solid-js";

// Transaction interface
interface Transaction {
    id: number;
    name: string;
    amount: number;
    category: string;
    date: string;
}

import "@/scss/components/transaction-table.scss";

const TransactionTable = () => {
    // Sample transaction data
    const [transactions, setTransactions] = createSignal<Transaction[]>([
        { id: 1, name: "Groceries", amount: 50, category: "Food", date: "2024-12-01" },
        { id: 2, name: "Rent", amount: 1000, category: "Housing", date: "2024-12-01" },
        { id: 3, name: "Netflix", amount: 15, category: "Entertainment", date: "2024-12-02" },
    ]);

    const [searchTerm, setSearchTerm] = createSignal("");
    const [sortColumn, setSortColumn] = createSignal<keyof Transaction>("name");
    const [sortOrder, setSortOrder] = createSignal<"asc" | "desc">("asc");
    const [isModalOpen, setIsModalOpen] = createSignal(false);

    // Filtered and sorted transactions
    const filteredTransactions = createMemo(() => {
        const lowerSearchTerm = searchTerm().toLowerCase();
        const filtered = transactions().filter((t) =>
            Object.values(t).some((value) =>
                String(value).toLowerCase().includes(lowerSearchTerm)
            )
        );

        return filtered.sort((a, b) => {
            const valueA = a[sortColumn()];
            const valueB = b[sortColumn()];
            if (valueA < valueB) return sortOrder() === "asc" ? -1 : 1;
            if (valueA > valueB) return sortOrder() === "asc" ? 1 : -1;
            return 0;
        });
    });

    const toggleSortOrder = (column: keyof Transaction) => {
        if (sortColumn() === column) {
            setSortOrder(sortOrder() === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }
    };

    // Modal form submission
    const handleCreateTransaction = (event: Event) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const newTransaction: Transaction = {
            id: transactions().length + 1,
            name: formData.get("name") as string,
            amount: parseFloat(formData.get("amount") as string),
            category: formData.get("category") as string,
            date: formData.get("date") as string,
        };
        setTransactions([...transactions(), newTransaction]);
        setIsModalOpen(false);
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
                <button onClick={() => setIsModalOpen(true)}>Create Transaction</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th onClick={() => toggleSortOrder("name")}>
                            Name {sortColumn() === "name" ? (sortOrder() === "asc" ? "↑" : "↓") : ""}
                        </th>
                        <th onClick={() => toggleSortOrder("amount")}>
                            Amount {sortColumn() === "amount" ? (sortOrder() === "asc" ? "↑" : "↓") : ""}
                        </th>
                        <th onClick={() => toggleSortOrder("category")}>
                            Category {sortColumn() === "category" ? (sortOrder() === "asc" ? "↑" : "↓") : ""}
                        </th>
                        <th onClick={() => toggleSortOrder("date")}>
                            Date {sortColumn() === "date" ? (sortOrder() === "asc" ? "↑" : "↓") : ""}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions().map((transaction) => (
                        <tr>
                            <td>{transaction.name}</td>
                            <td>${transaction.amount.toFixed(2)}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen() && (
                <div class="modal">
                    <div class="modal-content">
                        <h2>Create Transaction</h2>
                        <form onSubmit={handleCreateTransaction}>
                            <label>
                                Name:
                                <input type="text" name="name" required />
                            </label>
                            <label>
                                Amount:
                                <input type="number" name="amount" step="0.01" required />
                            </label>
                            <label>
                                Category:
                                <input type="text" name="category" required />
                            </label>
                            <label>
                                Date:
                                <input type="date" name="date" required />
                            </label>
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionTable;
