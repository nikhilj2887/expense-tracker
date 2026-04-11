"use client"

import { ArrowUpRight, ArrowDownRight, Wallet, PiggyBank } from "lucide-react"

const formatCurrency = (amount:number) =>
  amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

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

{/* Income */}

<div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow hover:border-green-500/40 transition">

<div className="flex items-center justify-between mb-3">
<p className="text-gray-400 text-sm">Total Income</p>
<ArrowUpRight className="text-green-500" size={20}/>
</div>

<h2 className="text-3xl font-bold text-green-500">
₹{formatCurrency(totalIncome)}
</h2>

<p className="text-xs text-gray-500 mt-1">
Money received this month
</p>

</div>


{/* Expenses */}

<div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow hover:border-red-500/40 transition">

<div className="flex items-center justify-between mb-3">
<p className="text-gray-400 text-sm">Total Expenses</p>
<ArrowDownRight className="text-red-500" size={20}/>
</div>

<h2 className="text-3xl font-bold text-red-500">
₹{formatCurrency(totalExpense)}
</h2>

<p className="text-xs text-gray-500 mt-1">
Money spent this month
</p>

</div>


{/* Balance */}

<div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow hover:border-blue-500/40 transition">

<div className="flex items-center justify-between mb-3">
<p className="text-gray-400 text-sm">Current Balance</p>
<Wallet className="text-blue-500" size={20}/>
</div>

<h2 className="text-3xl font-bold text-blue-400">
₹{formatCurrency(balance)}
</h2>

<p className="text-xs text-gray-500 mt-1">
Income minus expenses
</p>

</div>


{/* Savings */}

<div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow hover:border-purple-500/40 transition">

<div className="flex items-center justify-between mb-3">
<p className="text-gray-400 text-sm">Savings Rate</p>
<PiggyBank className="text-purple-400" size={20}/>
</div>

<h2 className="text-3xl font-bold text-purple-400">
{savingsRate}%
</h2>

<p className="text-xs text-gray-500 mt-1">
Percentage of income saved
</p>

</div>

</div>

)
}
