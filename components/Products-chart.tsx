"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ChartData {
  week: string;
  products: number;
}

export default function ProductsChart({ data }: { data: ChartData[] }) {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />

          {/* X Axis */}
          <XAxis
            dataKey="week"
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />

          {/* Y Axis */}
          <YAxis
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />

          {/* Area */}
          <Area
            type="monotone"
            dataKey="products"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.2}
            strokeWidth={2}
            dot={{ r: 3, fill: "#10b981" }}
            activeDot={{ r: 5, fill: "#059669" }}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
            labelStyle={{ color: "#374151", fontWeight: 500 }}
            itemStyle={{ color: "#10b981", fontWeight: 500 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
