"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function TransactionTable({ transactions }: any) {

const [editing,setEditing] = useState<any>(null)

/* DELETE TRANSACTION */

async function deleteTransaction(id:any){

const confirmDelete = confirm("Delete this transaction?")

if(!confirmDelete) return

const { error } = await supabase
.from("transactions")
.delete()
.eq("id", id)

if(error){
alert(error.message)
return
}

window.location.reload()

}

/* SAVE EDIT */

async function saveEdit(){

const { error } = await supabase
.from("transactions")
.update({
amount: editing.amount,
category: editing.category,
notes: editing.description
})
.eq("id", editing.id)

if(error){
alert(error.message)
return
}

setEditing(null)
window.location.reload()

}

return(

<div className="bg-gray-900/70 backdrop-blur-md p-6 rounded-xl border border-gray-800">

<h2 className="text-xl font-semibold mb-5">
Transactions
</h2>

{/* DESKTOP TABLE */}

<div className="hidden md:block overflow-x-auto">

<table className="w-full text-left">

<thead>

<tr className="text-gray-400 border-b border-gray-700">

<th className="py-3">Date</th>
<th className="py-3">Category</th>
<th className="py-3">Description</th>
<th className="py-3">Amount</th>
<th className="py-3">Person</th>
<th className="py-3">Actions</th>

</tr>

</thead>

<tbody>

{transactions.map((t:any, index:number)=>{

return(

<tr
key={t.id}
className={`border-b border-gray-800 
${index % 2 === 0 ? "bg-gray-900" : "bg-gray-950"} hover:bg-gray-800`}
>

<td className="py-3">
{new Date(t.date).toLocaleDateString()}
</td>

<td className="font-medium">
{t.category}
</td>

<td className="text-gray-300">
{t.notes || "-"}
</td>

<td className={`font-semibold ${t.type==="income" ? "text-green-400" : "text-red-400"}`}>
₹{Number(t.amount).toLocaleString("en-IN")}
</td>

<td className="text-gray-300">
{t.person}
</td>

<td className="flex items-center gap-3 py-3">

<button
onClick={()=>setEditing(t)}
className="text-blue-400 hover:text-blue-500 transition"
>
✏️
</button>

<button
onClick={()=>deleteTransaction(t.id)}
className="text-red-400 hover:text-red-500 transition"
>
🗑
</button>

</td>

</tr>

)

})}

</tbody>

</table>

</div>

{/* MOBILE CARD VIEW */}

<div className="space-y-4 md:hidden">

{transactions.map((t:any, index:number)=>{

return(

<div
key={t.id}
className={`p-4 rounded-xl border border-gray-800 backdrop-blur-md 
${index % 2 === 0 ? "bg-gray-900/70" : "bg-gray-950/70"}`}
>

<div className="flex justify-between text-sm text-gray-400">

<span>
{new Date(t.date).toLocaleDateString()}
</span>

<span>
{t.person}
</span>

</div>

<div className="mt-2 font-semibold text-lg">
{t.category}
</div>

{t.notes && (
<div className="text-gray-400 text-sm mt-1">
{t.notes}
</div>
)}

<div
className={`mt-2 font-bold ${
t.type==="income" ? "text-green-400" : "text-red-400"
}`}
>
₹{Number(t.amount).toLocaleString("en-IN")}
</div>

<div className="flex gap-4 mt-3">

<button
onClick={()=>setEditing(t)}
className="text-blue-400 text-sm"
>
Edit
</button>

<button
onClick={()=>deleteTransaction(t.id)}
className="text-red-400 text-sm"
>
Delete
</button>

</div>

</div>

)

})}

</div>

{/* EDIT MODAL */}

{editing && (

<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

<div className="bg-gray-900 p-6 rounded-xl w-96 border border-gray-800">

<h2 className="text-lg font-semibold mb-4">
Edit Transaction
</h2>

<input
value={editing.amount}
onChange={(e)=>setEditing({...editing,amount:e.target.value})}
className="border border-gray-700 bg-gray-800 p-2 w-full mb-3 rounded"
/>

<input
value={editing.category}
onChange={(e)=>setEditing({...editing,category:e.target.value})}
className="border border-gray-700 bg-gray-800 p-2 w-full mb-3 rounded"
/>

<input
value={editing.description || ""}
onChange={(e)=>setEditing({...editing,description:e.target.value})}
placeholder="Description"
className="border border-gray-700 bg-gray-800 p-2 w-full mb-4 rounded"
/>

<div className="flex justify-end gap-3">

<button
onClick={()=>setEditing(null)}
className="text-gray-400 hover:text-gray-200"
>
Cancel
</button>

<button
onClick={saveEdit}
className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
>
Save
</button>

</div>

</div>

</div>

)}

</div>

)

}