"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

import AddTransaction from "@/components/AddTransaction"
import CategoryPieChart from "@/components/CategoryPieChart"
import MonthlyChart from "@/components/MonthlyChart"
import BudgetChart from "@/components/BudgetChart"
import TransactionTable from "@/components/TransactionTable"
import SummaryCards from "@/components/SummaryCards"
import DailySpendingChart from "@/components/DailySpendingChart"
import FloatingAddButton from "@/components/FloatingAddButton"
import SpendingLeaderboard from "@/components/SpendingLeaderboard"
import YearlyOverviewChart from "@/components/YearlyOverviewChart"
import TopCategories from "@/components/TopCategories"
import LogoutButton from "@/components/LogoutButton"

export default function Home(){

const [transactions,setTransactions] = useState<any[]>([])
const [selectedMonth,setSelectedMonth] = useState(new Date().getMonth())
const [selectedYear,setSelectedYear] = useState(new Date().getFullYear())

useEffect(()=>{
loadTransactions()
},[])

async function loadTransactions(){

const { data } = await supabase
.from("transactions")
.select("*")
.order("date",{ascending:false})

setTransactions(data || [])

}

const filteredTransactions = transactions.filter((t:any)=>{

if(!t.date) return false

const d = new Date(t.date)

return (
d.getMonth() === selectedMonth &&
d.getFullYear() === selectedYear
)

})

/* CATEGORY DATA */

const categoryData = Object.values(
filteredTransactions
.filter((t:any)=>t.type==="expense")
.reduce((acc:any,t:any)=>{

if(!acc[t.category]){
acc[t.category] = {name:t.category,value:0}
}

acc[t.category].value += Number(t.amount)

return acc

},{})
)

/* MONTHLY DATA */

const monthlyData = transactions.reduce((acc:any,t:any)=>{

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

/* TREND CALCULATION */

const prevMonthTransactions = transactions.filter((t:any)=>{

if(!t.date) return false

const d = new Date(t.date)

return (
d.getMonth() === selectedMonth-1 &&
d.getFullYear() === selectedYear
)

})

const currentExpense = filteredTransactions
.filter((t:any)=>t.type==="expense")
.reduce((sum:number,t:any)=>sum+Number(t.amount),0)

const prevExpense = prevMonthTransactions
.filter((t:any)=>t.type==="expense")
.reduce((sum:number,t:any)=>sum+Number(t.amount),0)

const trendArrow = currentExpense > prevExpense ? "↑" : "↓"

return(

<div className="px-4 md:px-10 py-8 bg-gray-900 min-h-screen text-white">

{/* HEADER */}

<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10">

<div>

<h1 className="text-3xl font-bold">
Family Expense Tracker
</h1>

<p className="text-gray-400 text-sm mt-1">
Viewing: {selectedMonth+1}/{selectedYear}
</p>

</div>

{/* RIGHT SIDE CONTROLS */}

<div className="flex items-center gap-3">

<select
value={selectedMonth}
onChange={(e)=>setSelectedMonth(Number(e.target.value))}
className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg text-sm"
>

<option value={0}>Jan</option>
<option value={1}>Feb</option>
<option value={2}>Mar</option>
<option value={3}>Apr</option>
<option value={4}>May</option>
<option value={5}>Jun</option>
<option value={6}>Jul</option>
<option value={7}>Aug</option>
<option value={8}>Sep</option>
<option value={9}>Oct</option>
<option value={10}>Nov</option>
<option value={11}>Dec</option>

</select>

<select
value={selectedYear}
onChange={(e)=>setSelectedYear(Number(e.target.value))}
className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg text-sm"
>

<option value={2024}>2024</option>
<option value={2025}>2025</option>
<option value={2026}>2026</option>
<option value={2027}>2027</option>

</select>

{/* LOGOUT BUTTON */}

<LogoutButton/>

</div>

</div>

{/* TREND INDICATOR */}

<div className="mb-6 text-sm text-gray-400">

Expense trend vs last month:
<span className={`ml-2 font-bold ${trendArrow==="↑"?"text-red-400":"text-green-400"}`}>
{trendArrow}
</span>

</div>

{/* SUMMARY */}

<SummaryCards transactions={filteredTransactions}/>

{/* DASHBOARD GRID */}

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

<AddTransaction reload={loadTransactions}/>

<CategoryPieChart data={categoryData}/>

<BudgetChart/>

<MonthlyChart data={Object.values(monthlyData)}/>

<DailySpendingChart transactions={filteredTransactions}/>

<SpendingLeaderboard transactions={filteredTransactions}/>

<YearlyOverviewChart transactions={transactions}/>

<TopCategories transactions={filteredTransactions}/>

</div>

{/* TABLE */}

<div className="mt-8">

<TransactionTable transactions={filteredTransactions}/>

</div>

{/* FLOATING BUTTON */}

<FloatingAddButton/>

</div>

)

}