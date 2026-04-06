"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AddTransaction({ reload }: any) {

const [amount,setAmount] = useState("")
const [category,setCategory] = useState("Food")
const [type,setType] = useState("expense")
const [date,setDate] = useState("")
const [person,setPerson] = useState("Nikhil")

/* NEW DESCRIPTION STATE */

const [description,setDescription] = useState("")

/* CATEGORY LISTS */

const expenseCategories = [
"Food",
"Travel",
"Shopping",
"Entertainment",
"Health",
"Home",
"Transportation",
"Utilities",
"Bills",
"CC Bill",
"Rent",
"Savings",
"Debt",
"Niksha Nilayam",
"Sai Ganesh"
]

const incomeCategories = [
"Paycheck",
"Bonus",
"Interest",
"Business Income",
"Rent",
"Other Income"
]

/* ADD TRANSACTION */

async function addTransaction(e:any){

e.preventDefault()

const { error } = await supabase
.from("transactions")
.insert([
{
amount: Number(amount),
category,
type,
person,
notes: description,
date: date || new Date().toISOString()
}
])

if(error){
console.log(error)
alert(error.message)
return
}

/* Reset form */

setAmount("")
setType("expense")
setCategory("Food")
setDescription("")   // ← RESET DESCRIPTION
setDate("")
setPerson("Nikhil")

reload()

}

return(

<div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 w-full">

<h2 className="text-xl font-semibold mb-5">
Add Transaction
</h2>

<form onSubmit={addTransaction} className="space-y-4">

{/* Amount */}

<input
type="number"
placeholder="Amount"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
className="border border-gray-600 bg-gray-900 p-3 w-full rounded-lg"
/>

{/* Type */}

<select
value={type}
onChange={(e)=>{

setType(e.target.value)

if(e.target.value==="income"){
setCategory("Paycheck")
}else{
setCategory("Food")
}

}}
className="border border-gray-600 bg-gray-900 p-3 w-full rounded-lg"
>

<option value="expense">Expense</option>
<option value="income">Income</option>

</select>

{/* Category */}

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
className="border border-gray-600 bg-gray-900 p-3 w-full rounded-lg"
>

{type === "expense"
? expenseCategories.map((cat)=>(
<option key={cat} value={cat}>{cat}</option>
))
: incomeCategories.map((cat)=>(
<option key={cat} value={cat}>{cat}</option>
))
}

</select>

{/* DESCRIPTION TEXTBOX */}

<input
placeholder="Description (Eg: Swiggy dinner, Uber ride, Petrol)"
value={description}
onChange={(e)=>setDescription(e.target.value)}
className="border border-gray-600 bg-gray-900 p-3 w-full rounded-lg"
/>

{/* Date */}

<input
type="date"
value={date}
onChange={(e)=>setDate(e.target.value)}
className="border border-gray-600 bg-gray-900 p-3 w-full rounded-lg"
/>

{/* Person */}

<select
value={person}
onChange={(e)=>setPerson(e.target.value)}
className="border border-gray-600 bg-gray-900 p-3 w-full rounded-lg"
>
<option value="Nikhil">Nikhil</option>
<option value="Sirisha">Sirisha</option>
</select>

<button
className="bg-blue-600 hover:bg-blue-700 text-white w-full p-3 rounded-lg transition"
>
Add Transaction
</button>

</form>

</div>

)
}