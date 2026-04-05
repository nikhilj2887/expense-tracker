"use client"

import { BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid,Legend } from "recharts"

export default function MonthlyChart({data}:any) {

  return (

    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">

      <h2 className="text-xl font-semibold mb-4">
        Monthly Income vs Expense
      </h2>

      <BarChart width={400} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="month"/>
        <YAxis/>
        <Tooltip/>
        <Legend/>

        <Bar dataKey="income" fill="#22c55e"/>
        <Bar dataKey="expense" fill="#ef4444"/>

      </BarChart>

    </div>
  )
}