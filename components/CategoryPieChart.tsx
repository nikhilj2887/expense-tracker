"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

const COLORS = [
"#ef4444",
"#22c55e",
"#3b82f6",
"#f59e0b",
"#8b5cf6",
"#06b6d4",
"#ec4899"
]

export default function CategoryPieChart({ data }) {

const total = data.reduce((sum:any,i:any)=>sum+i.value,0)

return(

<div className="bg-gray-900/70 backdrop-blur-md p-6 rounded-xl border border-gray-800">

<h2 className="text-lg font-semibold mb-4">
Category Breakdown
</h2>

<ResponsiveContainer width="100%" height={320}>

<PieChart>

<Pie
data={data}
dataKey="value"
nameKey="name"
innerRadius={70}
outerRadius={100}
paddingAngle={3}
>

{data.map((entry:any,index:number)=>(
<Cell key={index} fill={COLORS[index % COLORS.length]}/>
))}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

<div className="text-center text-sm text-gray-400 mt-2">
Total Spent
</div>

<div className="text-center text-xl font-bold">
₹{total.toLocaleString()}
</div>

</div>

)

}