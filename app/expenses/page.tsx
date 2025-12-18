"use client";

import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination"; // <- import your new Pagination component

export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
};

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Generate 25 sample expenses
  const generateExpenses = (): Expense[] => {
    const categories = ["Food", "Travel", "Shopping", "Bills", "Entertainment"];
    const expense: Expense[] = [];
    for (let i = 1; i <= 25; i++) {
      expense.push({
        id: i.toString(),
        title: `Expense ${i}`,
        amount: parseFloat((Math.random() * 100 + 1).toFixed(2)),
        category: categories[i % categories.length],
        date: new Date(
          Date.now() - Math.floor(Math.random() * 10000000000)
        )
          .toISOString()
          .split("T")[0],
      });
    }
    return expense;
  };

  // Load expenses from localStorage or generate sample data
  useEffect(() => {
    const data = localStorage.getItem("expenses");
    if (data) {
      setExpenses(JSON.parse(data) as Expense[]);
    } else {
      const sampleExpenses = generateExpenses();
      setExpenses(sampleExpenses);
      localStorage.setItem("expenses", JSON.stringify(sampleExpenses));
    }
  }, []);

  // Filter expenses by search term
  const filtered = expenses.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  // Delete expense
  const deleteExpense = (id: string) => {
    const updated = expenses.filter((e) => e.id !== id);
    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 sticky top-0 h-screen bg-white border-r">
        <Sidebar currentPath="/expenses" />
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-x-auto">
        {/* Header: search + add button */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search expense..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 w-64 focus:outline-teal-500"
          />
          <Link
            href="/expenses/add-expense"
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            + Add New Expense
          </Link>
        </div>

        {/* Expenses table */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b">#</th>
                <th className="p-3 border-b">Title</th>
                <th className="p-3 border-b">Category</th>
                <th className="p-3 border-b">Amount</th>
                <th className="p-3 border-b">Date</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-3 text-center text-gray-500">
                    No expenses found.
                  </td>
                </tr>
              ) : (
                paginated.map((e, i) => (
                  <tr key={e.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{startIndex + i + 1}</td>
                    <td className="p-3 border-b">{e.title}</td>
                    <td className="p-3 border-b">{e.category}</td>
                    <td className="p-3 border-b">{e.amount.toFixed(2)}</td>
                    <td className="p-3 border-b">{e.date}</td>
                    <td className="p-3 border-b space-x-2">
                      <button
                        onClick={() => deleteExpense(e.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>
    </div>
  );
}
