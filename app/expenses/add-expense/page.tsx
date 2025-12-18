"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export default function AddExpensePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const getExpenses = (): Expense[] => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("expenses") || "[]");
    } catch {
      return [];
    }
  };

  const saveExpenses = (expenses: Expense[]) => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || !category || !date) {
      alert("Please fill all fields");
      return;
    }

    const expenses = getExpenses();
    const newExpense: Expense = {
      id: Date.now().toString(),
      title,
      amount: Number(amount),
      category,
      date,
    };

    saveExpenses([newExpense, ...expenses]);
    router.push("/expenses");
  };

  const handleCancel = () => router.push("/expenses");

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full z-20">
        <Sidebar currentPath="/expenses" />
      </div>

      {/* Main content */}
      <main className="flex-1 ml-64 flex justify-center items-start p-8">
        <div className="w-full max-w-lg bg-white border border-gray-200 rounded-xl shadow-lg p-6 mt-12">
          <h1 className="text-2xl font-semibold mb-2">Add Expense</h1>
          <p className="text-gray-500 mb-6">
            Add a new expense to your expense manager
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter expense title"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium mb-1">
                Amount *
              </label>
              <input
                id="amount"
                type="number"
                min={0}
                value={amount}
                onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="Enter amount"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">
                Category *
              </label>
              <input
                id="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-1">
                Date *
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Save Expense
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
