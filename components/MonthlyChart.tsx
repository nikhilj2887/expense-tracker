"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts"

export default function MonthlyChart({ data }: any) {

return(

<div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">

<h2 className="text-xl font-semibold mb-4">
Monthly Income vs Expense
</h2>

<ResponsiveContainer width="100%" height={280}>

<BarChart data={data}>

<CartesianGrid strokeDasharray="3 3" />

<XAxis dataKey="month" />

<YAxis />

<Tooltip />

<Legend />

<Bar dataKey="expense" fill="#ef4444" />

<Bar dataKey="income" fill="#22c55e" />

</BarChart>

</ResponsiveContainer>

</div>

)

}