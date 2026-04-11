"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function AddTransaction({ reload }: any) {

const [amount,setAmount] = useState("")
const [category,setCategory] = useState("Food")
const [type,setType] = useState("expense")
const [date,setDate] = useState("")
const [person,setPerson] = useState("")
const [description,setDescription] = useState("")

/* GET LOGGED IN USER */

useEffect(()=>{

async function loadUser(){

const { data:{ user } } = await supabase.auth.getUser()

if(user){

/* If name stored in metadata */

const name = user.user_metadata?.name

if(name){
setPerson(name)
}

/* fallback using email */

else if(user.email === "nikhil@email.com"){
setPerson("Nikhil")
}
else if(user.email === "sirisha@email.com"){
setPerson("Sirisha")
}

}

}

loadUser()

},[])

/* CATEGORY LISTS */

const expenseCategories = [
"Bills",
"CC Bill",
"Debt",
"EMI",
"Entertainment",
"Food",
"Food Card Expenses",
"Gifts",
"Holiday",
"Home",
"Household Expenses",
"Medical",
"Niksha Nilayam",
"Other",
"Personal",
"Rapidnest",
"Rent",
"Sai Ganesh",
"Savings",
"Shopping",
"Transportation",
"Travel"
].sort()

const incomeCategories = [
"Paycheck",
"Bonus",
"Interest",
"Business Income",
"Rent",
"Savings",
"Other Income"
].sort()

const categories = type === "expense" ? expenseCategories : incomeCategories

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
alert(error.message)
return
}

/* Reset form */

setAmount("")
setType("expense")
setCategory("Food")
setDescription("")
setDate("")

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

{categories.map((c)=>(
<option key={c} value={c}>
{c}
</option>
))}

</select>

{/* Description */}

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