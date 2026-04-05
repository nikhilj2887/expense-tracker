"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

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

<div className="bg-gray-800 p-6 rounded-xl border border-gray-700">

<h2 className="mb-4 font-semibold">
Daily Spending
</h2>

<LineChart width={400} height={250} data={dailyData}>

<CartesianGrid strokeDasharray="3 3"/>
<XAxis dataKey="day"/>
<YAxis/>
<Tooltip/>

<Line
type="monotone"
dataKey="amount"
stroke="#6366f1"
strokeWidth={3}
/>

</LineChart>

</div>

)

}