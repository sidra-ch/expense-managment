"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";

// ---------------- TYPES ----------------
interface Product {
  id: number;
  name: string;
  sku?: string;
  quantity: number;
  price: number;
  lowStockAt: number;
}

export default function AddProductPage() {
  const router = useRouter();

  // ---------------- FORM STATE ----------------
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [lowStockAt, setLowStockAt] = useState<number>(5);

  // ---------------- LOCAL STORAGE HELPERS ----------------
  const getProducts = (): Product[] => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("mockProducts") || "[]");
    } catch {
      return [];
    }
  };

  const saveProducts = (products: Product[]) => {
    localStorage.setItem("mockProducts", JSON.stringify(products));
  };

  // ---------------- SUBMIT HANDLER ----------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    const products = getProducts();

    const newProduct: Product = {
      id: products.length ? products[products.length - 1].id + 1 : 1,
      name: name.trim(),
      sku: sku.trim() || `SKU-${Date.now()}`, // ✅ safer than Math.random
      quantity,
      price,
      lowStockAt,
    };

    saveProducts([...products, newProduct]);
    router.push("/inventory");
  };

  const handleCancel = () => {
    router.push("/inventory");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/add-product" />

      <main className="ml-64 p-8">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-semibold mb-1">Add Product</h1>
          <p className="text-gray-500 mb-6">
            Add a new product to your inventory
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Product Name *
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter product name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Quantity & Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium mb-1">
                  Quantity *
                </label>
                <input
                  id="quantity"
                  type="number"
                  min={0}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-1">
                  Price *
                </label>
                <input
                  id="price"
                  type="number"
                  min={0}
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* SKU */}
            <div>
              <label htmlFor="sku" className="block text-sm font-medium mb-1">
                SKU (optional)
              </label>
              <input
                id="sku"
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="Enter SKU"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Low Stock Threshold */}
            <div>
              <label htmlFor="lowStockAt" className="block text-sm font-medium mb-1">
                Low Stock Threshold *
              </label>
              <input
                id="lowStockAt"
                type="number"
                min={0}
                value={lowStockAt}
                onChange={(e) => setLowStockAt(Number(e.target.value))}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Add Product
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
