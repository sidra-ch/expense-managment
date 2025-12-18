"use client"; 

import Sidebar from "@/components/Sidebar";
import ProductsChart from "@/components/Products-chart";
import { TrendingUpIcon } from "lucide-react";

// ------------------ MOCK DATA ------------------
const mockTotalProducts = 25;
const mockLowStock = 8;
const mockAllProducts = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  quantity: Math.floor(Math.random() * 20) + 1,
}));

const mockWeeklyData = Array.from({ length: 12 }, (_, i) => ({
  week: `W${i + 1}`,
  products: Math.floor(Math.random() * 5) + 1,
}));

// ------------------ COMPONENT ------------------
export default function DashboardPage() {
  const totalValue = mockAllProducts.reduce(
    (sum, product) => sum + product.quantity * 10, // Mock price
    0
  );

  // ------------------ Efficiency calculations ------------------
  const inStockCount = mockAllProducts.filter((p) => p.quantity > 5).length;
  const lowStockCount = mockAllProducts.filter(
    (p) => p.quantity <= 5 && p.quantity >= 1
  ).length;
  const outStockCount = mockAllProducts.filter((p) => p.quantity === 0).length;

  const inStockPercentage =
    mockTotalProducts > 0 ? Math.round((inStockCount / mockTotalProducts) * 100) : 0;
  const lowStockPercentage =
    mockTotalProducts > 0 ? Math.round((lowStockCount / mockTotalProducts) * 100) : 0;
  const outOfStockPercentage =
    mockTotalProducts > 0 ? Math.round((outStockCount / mockTotalProducts) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/dashboard" />

      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Welcome back! Here is an overview of your inventory.
          </p>
        </div>

        {/* Metrics & Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Key Metrics */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Key Metrics</h2>
            <div className="grid grid-cols-3 gap-6 text-center">
              {/* Total Products */}
              <div className="bg-purple-100 rounded-lg p-4">
                <div className="text-3xl font-bold text-purple-700">{mockTotalProducts}</div>
                <div className="text-sm text-purple-600">Total Products</div>
                <div className="flex justify-center items-center text-xs text-green-600 mt-1">
                  +{mockTotalProducts} <TrendingUpIcon className="w-3 h-3 ml-1" />
                </div>
              </div>

              {/* Total Value */}
              <div className="bg-green-100 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-700">${totalValue}</div>
                <div className="text-sm text-green-600">Total Value</div>
                <div className="flex justify-center items-center text-xs text-green-600 mt-1">
                  +${totalValue} <TrendingUpIcon className="w-3 h-3 ml-1" />
                </div>
              </div>

              {/* Low Stock */}
              <div className="bg-red-100 rounded-lg p-4">
                <div className="text-3xl font-bold text-red-700">{mockLowStock}</div>
                <div className="text-sm text-red-600">Low Stock</div>
                <div className="flex justify-center items-center text-xs text-green-600 mt-1">
                  +{mockLowStock} <TrendingUpIcon className="w-3 h-3 ml-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="mb-6 font-semibold">New products per week</h2>
            <div className="h-48">
              <ProductsChart data={mockWeeklyData} />
            </div>
          </div>
        </div>

        {/* Stock Levels & Efficiency */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stock Levels */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Stock Levels</h2>
            <div className="space-y-3">
              {mockAllProducts.slice(0, 5).map((product) => {
                const stockLevel = product.quantity <= 5 ? 1 : 2; // 0=out,1=low,2=ok
                const bg = ["bg-red-600", "bg-yellow-600", "bg-green-600"];
                const text = ["text-red-600", "text-yellow-600", "text-green-600"];
                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${bg[stockLevel]}`} />
                      <span>{product.name}</span>
                    </div>
                    <div className={`text-sm font-medium ${text[stockLevel]}`}>
                      {product.quantity} units
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Efficiency */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-6">Efficiency</h2>
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48">
                {/* Background circle */}
                <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>

                {/* Progress circle */}
                <div
                  className="absolute inset-0 rounded-full border-8 border-green-500"
                  style={{ clipPath: `polygon(50% 0%, 100% 0%, 100% 50%, 50% 50%)` }}
                ></div>

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">{inStockPercentage}%</span>
                  <span className="text-gray-500">In Stock</span>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-6 space-y-2 w-full">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-3 h-3 rounded-full bg-green-200" />
                  <span>In Stock ({inStockPercentage}%)</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-3 h-3 rounded-full bg-yellow-200" />
                  <span>Low Stock ({lowStockPercentage}%)</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-3 h-3 rounded-full bg-gray-200" />
                  <span>Out of Stock ({outOfStockPercentage}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
