"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Pagination from "@/components/Pagination";

// ---------------- MOCK DATA (20 CATEGORIES) ----------------
const INITIAL_CATEGORIES = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Category ${i + 1}`,
  quantity: Math.floor(Math.random() * 20),
}));

export default function CategoriesPage() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 10;

  // 🔍 Client-side search
  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedCategories = filteredCategories.slice(start, end);

  // ❌ Delete mock
  const handleDelete = (id: number) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/categories" />

      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500">
            Manage your categories and their products.
          </p>
        </div>

        <div className="space-y-6">
          {/* 🔍 Search Bar */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Categories..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={() => setPage(1)}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Search
            </button>
          </div>

          {/* 📦 Categories Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Category Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {paginatedCategories.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      No categories found
                    </td>
                  </tr>
                )}

                {paginatedCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {category.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {category.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-right flex justify-end gap-2">
                      <button
                        onClick={() => {
                          const name = prompt(
                            "Edit category name:",
                            category.name
                          );
                          if (name) {
                            setCategories((prev) =>
                              prev.map((c) =>
                                c.id === category.id ? { ...c, name } : c
                              )
                            );
                          }
                        }}
                        className="px-3 py-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🔢 Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />
          )}
        </div>
      </main>
    </div>
  );
}
