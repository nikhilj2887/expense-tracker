"use client"

import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
ResponsiveContainer
} from "recharts"

export default function DailySpendingChart({transactions}:any){

const dailyData = Object.values(
transactions.reduce((acc:any,t:any)=>{

if(t.type !== "expense") return acc

const day = new Date(t.date).getDate()

if(!acc[day]){
acc[day] = {day, amount:0}
}

acc[day].amount += Number(t.amount)

return acc

},{})
)

return(

<div className="bg-gray-800 p-6 rounded-xl border border-gray-700 w-full">

<h2 className="mb-4 font-semibold">
Daily Spending
</h2>

<ResponsiveContainer width="100%" height={260}>

<LineChart data={dailyData}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="day"/>

<YAxis/>

<Tooltip
contentStyle={{
background:"#111827",
border:"1px solid #374151",
borderRadius:"8px",
color:"#fff"
}}
/>

<Line
type="monotone"
dataKey="amount"
stroke="#6366f1"
strokeWidth={3}
dot={{ r:4 }}
/>

</LineChart>

</ResponsiveContainer>

</div>

)

}