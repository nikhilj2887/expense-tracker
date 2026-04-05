"use client"

export default function SummaryCards({transactions}:any){

const totalExpense = transactions
.filter((t:any)=>t.type==="expense")
.reduce((sum:number,t:any)=>sum+Number(t.amount),0)

const totalIncome = transactions
.filter((t:any)=>t.type==="income")
.reduce((sum:number,t:any)=>sum+Number(t.amount),0)

const balance = totalIncome - totalExpense

const savingsRate =
totalIncome > 0
? Math.round(((totalIncome-totalExpense)/totalIncome)*100)
: 0

return(

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

<div className="bg-gray-800 border border-gray-700 p-5 rounded-xl shadow">
<p className="text-gray-400 text-sm">Income</p>
<h2 className="text-2xl font-bold text-green-500">
₹{totalIncome}
</h2>
</div>

<div className="bg-gray-800 border border-gray-700 p-5 rounded-xl shadow">
<p className="text-gray-400 text-sm">Expenses</p>
<h2 className="text-2xl font-bold text-red-500">
₹{totalExpense}
</h2>
</div>

<div className="bg-gray-800 border border-gray-700 p-5 rounded-xl shadow">
<p className="text-gray-400 text-sm">Balance</p>
<h2 className="text-2xl font-bold text-blue-500">
₹{balance}
</h2>
</div>

<div className="bg-gray-800 border border-gray-700 p-5 rounded-xl shadow">
<p className="text-gray-400 text-sm">Savings Rate</p>
<h2 className="text-2xl font-bold text-purple-400">
{savingsRate}%
</h2>
</div>

</div>

)
}