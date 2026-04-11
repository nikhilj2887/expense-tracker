"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

export default function CategoryPieChart({ data }: { data: any[] }) {

const total = data.reduce((sum:any,i:any)=>sum+i.value,0)

const COLORS = [
"#3b82f6",
"#22c55e",
"#f59e0b",
"#ef4444",
"#8b5cf6",
"#14b8a6"
]

return(

<div className="bg-gray-900/70 backdrop-blur-md p-6 rounded-xl border border-gray-800">

<h2 className="text-xl font-semibold mb-4">
Category Breakdown
</h2>

<ResponsiveContainer width="100%" height={260}>

<PieChart>

<Pie
data={data}
dataKey="value"
nameKey="name"
label={false}
>

{data.map((entry:any,index:number)=>(
<Cell key={index} fill={COLORS[index % COLORS.length]} />
))}

</Pie>

<Tooltip
formatter={(value:any)=>`₹${Number(value).toLocaleString("en-IN")}`}
/>

<Legend />

</PieChart>

</ResponsiveContainer>

</div>

)

}