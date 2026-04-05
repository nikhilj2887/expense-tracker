"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts"

export default function YearlyOverviewChart({transactions}:any){

const monthlyData = Object.values(
transactions.reduce((acc:any,t:any)=>{

if(!t.date) return acc

const month = new Date(t.date).toLocaleString("default",{month:"short"})

if(!acc[month]){
acc[month] = {month,income:0,expense:0}
}

if(t.type === "income"){
acc[month].income += Number(t.amount)
}else{
acc[month].expense += Number(t.amount)
}

return acc

},{})
)

return(

<div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">

<h2 className="text-xl font-semibold mb-4">
Yearly Financial Overview
</h2>

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={monthlyData}>

    <CartesianGrid strokeDasharray="3 3" />

    <XAxis dataKey="month" />

    <YAxis />

    <Tooltip />

    <Legend />

    <Bar dataKey="income" fill="#10b981" />

    <Bar dataKey="expense" fill="#ef4444" />

  </BarChart>
</ResponsiveContainer>

</div>

)

}