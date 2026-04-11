"use client"

import {
ResponsiveContainer,
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
Legend,
CartesianGrid
} from "recharts"

export default function MonthlyChart({ data }: any) {

return(

<div className="bg-gray-900 p-6 rounded-2xl border border-gray-700">

<h2 className="text-xl font-semibold mb-4">
Monthly Income vs Expense
</h2>

<ResponsiveContainer width="100%" height={320}>

<BarChart 
data={data}
barSize={40}
barGap={8}

>
<defs>

<linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
<stop offset="0%" stopColor="#22c55e" stopOpacity={0.9}/>
<stop offset="100%" stopColor="#22c55e" stopOpacity={0.3}/>
</linearGradient>

<linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
<stop offset="0%" stopColor="#ef4444" stopOpacity={0.9}/>
<stop offset="100%" stopColor="#ef4444" stopOpacity={0.3}/>
</linearGradient>

</defs>

<CartesianGrid strokeDasharray="3 3" stroke="#374151" />

<XAxis dataKey="month" stroke="#9ca3af" />

<YAxis stroke="#9ca3af" />

<Tooltip
formatter={(value: any) => `₹${Number(value).toLocaleString("en-IN")}`}
contentStyle={{
  background: "#1f2937",
  border: "1px solid #374151",
  borderRadius: "8px"
}}
/>

<Legend />

<Bar
dataKey="expense"
fill="url(#expenseGradient)"
radius={[6,6,0,0]}
animationDuration={1000}
/>

<Bar
dataKey="income"
fill="url(#incomeGradient)"
radius={[6,6,0,0]}
animationDuration={1000}
/>

</BarChart>

</ResponsiveContainer>

</div>

)

}