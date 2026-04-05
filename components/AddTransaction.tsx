"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AddTransaction({ reload }: any) {

const [amount,setAmount] = useState("")
const [category,setCategory] = useState("Food")
const [type,setType] = useState("expense")
const [date,setDate] = useState("")
const [person,setPerson] = useState("Nikhil")

async function addTransaction(e:any){

e.preventDefault()

const { data: { user } } = await supabase.auth.getUser()

const { data, error } = await supabase
.from("transactions")
.insert([
{
amount,
category,
type,
person,
date: date || new Date().toISOString()
}
])

if(error){
console.log(error)
alert(error.message)
}

setAmount("")
reload()

}

return(

<div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">

<h2 className="text-xl font-semibold mb-5">
Add Transaction
</h2>

<form onSubmit={addTransaction} className="space-y-4">

<input
type="number"
placeholder="Amount"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
className="border p-3 w-full rounded-lg"
/>

<select
value={type}
onChange={(e)=>setType(e.target.value)}
className="border p-3 w-full rounded-lg"
>
<option value="expense">Expense</option>
<option value="income">Income</option>
</select>

<input
list="categories"
value={category}
onChange={(e)=>setCategory(e.target.value)}
placeholder="Category"
className="border p-3 w-full rounded-lg"
/>

<datalist id="categories">
<option value="Food"/>
<option value="Rent"/>
<option value="Travel"/>
<option value="Shopping"/>
<option value="Entertainment"/>
<option value="Health/Medical"/>
<option value="Home"/>
<option value="Transportation"/>
<option value="Personal"/>
<option value="EMI"/>
<option value="Utilities/Groceries"/>
<option value="Debt"/>
<option value="Other"/>
<option value="Bills"/>
<option value="CC Bill"/>
<option value="Food Card Expenses"/>
<option value="Holiday"/>
<option value="Savings"/>
<option value="Niksha Nilayam"/>
<option value="Sai Ganesh"/>
<option value="Rapidnest"/>
<option value="Paycheck"/>
<option value="Savings"/>
<option value="Interest"/>
<option value="Bonus"/>
</datalist>

<input
type="date"
value={date}
onChange={(e)=>setDate(e.target.value)}
className="border p-3 w-full rounded-lg"
/>

<select
value={person}
onChange={(e)=>setPerson(e.target.value)}
className="border p-3 w-full rounded-lg"
>
<option>Nikhil</option>
<option>Sirisha</option>
</select>

<button
className="bg-blue-600 hover:bg-blue-700 text-white w-full p-3 rounded-lg"
>
Add Transaction
</button>

</form>

</div>

)
}