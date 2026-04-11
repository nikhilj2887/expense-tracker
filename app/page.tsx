"use client"

import { useEffect, useState, useMemo } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Menu } from "lucide-react"
import DashboardLayout from "@/components/DashboardLayout"

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

const router = useRouter()

const [transactions,setTransactions] = useState<any[]>([])
const [loading,setLoading] = useState(true)

const [selectedMonth,setSelectedMonth] = useState(new Date().getMonth())
const [selectedYear,setSelectedYear] = useState(new Date().getFullYear())

useEffect(()=>{
checkUser()
},[])

async function checkUser(){

const { data: { user } } = await supabase.auth.getUser()

if(!user){
router.push("/login")
return
}

loadTransactions()

}

async function loadTransactions(){

setLoading(true)

const { data } = await supabase
.from("transactions")
.select("*")
.order("date",{ascending:false})

setTransactions(data || [])

setLoading(false)

}

/* FILTERED TRANSACTIONS */

const filteredTransactions = useMemo(()=>{

return transactions.filter((t:any)=>{

if(!t.date) return false

const d = new Date(t.date)

return (
d.getMonth() === selectedMonth &&
d.getFullYear() === selectedYear
)

})

},[transactions,selectedMonth,selectedYear])

/* CATEGORY DATA */

const categoryData = useMemo(()=>{

return Object.values(
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

},[filteredTransactions])

/* MONTHLY DATA */

const monthlyData = useMemo(()=>{

return Object.values(
transactions.reduce((acc:any,t:any)=>{

if(!t.date) return acc

const month = new Date(t.date).toLocaleString("default",{month:"short"})

if(!acc[month]){
acc[month] = {month,income:0,expense:0}
}

if(t.type==="income"){
acc[month].income += Number(t.amount)
}else{
acc[month].expense += Number(t.amount)
}

return acc

},{})
)

},[transactions])

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

/* LOADING SCREEN */

if(loading){

return(

<div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">

Loading dashboard...

</div>

)

}

return(

<DashboardLayout>

<div className="min-h-screen bg-gray-950">
    </div>

{/* HEADER */}

{/* HEADER */}

<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10">

{/* LEFT SIDE */}

<div className="flex items-start justify-between w-full">

<div>
<h1 className="text-2xl md:text-3xl font-bold">
Family Expense Tracker
</h1>

<p className="text-gray-400 text-sm mt-1">
Viewing: {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][selectedMonth]} {selectedYear}
</p>
</div>

{/* MOBILE MENU BUTTON */}



</div>

{/* RIGHT CONTROLS */}

<div className="flex items-center gap-3">

<select
value={selectedMonth}
onChange={(e)=>setSelectedMonth(Number(e.target.value))}
className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg text-sm"
>
{["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m,i)=>(
<option key={i} value={i}>{m}</option>
))}
</select>

<select
value={selectedYear}
onChange={(e)=>setSelectedYear(Number(e.target.value))}
className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg text-sm"
>
<option value={2026}>2026</option>
<option value={2027}>2027</option>
<option value={2028}>2028</option>
<option value={2029}>2029</option>
</select>

<LogoutButton/>

</div>

</div>

{/* TREND */}

<div className="mb-6 text-gray-300">

Expense trend vs last month:

<span className={`ml-2 font-bold ${trendArrow==="↑"?"text-red-400":"text-green-400"}`}>

{trendArrow}

</span>

</div>

{/* SUMMARY */}

<SummaryCards transactions={filteredTransactions}/>

{/* DASHBOARD GRID */}

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

<AddTransaction reload={loadTransactions}/>

<CategoryPieChart data={categoryData}/>

<BudgetChart/>

<MonthlyChart data={monthlyData} className="lg:col-span-2"/>

<DailySpendingChart transactions={filteredTransactions}/>

<SpendingLeaderboard transactions={filteredTransactions}/>

<YearlyOverviewChart transactions={transactions}/>

<TopCategories transactions={filteredTransactions}/>

</div>

{/* TABLE */}

<div className="mt-8">

<TransactionTable transactions={filteredTransactions}/>

</div>



</div>

</DashboardLayout>

)

}