"use client"

import { getCategoryIcon } from "@/lib/categoryIcons"

export default function TransactionTable({transactions=[]}:any){

return(

<div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">

<h2 className="text-xl font-semibold mb-5">
Transactions
</h2>

<div className="overflow-x-auto">

<table className="w-full text-sm">

<thead className="text-gray-400 border-b border-gray-700">

<tr>

<th className="text-left py-3">Date</th>
<th className="text-left py-3">Category</th>
<th className="text-left py-3">Amount</th>
<th className="text-left py-3">Person</th>

</tr>

</thead>

<tbody>

{transactions.map((t:any)=>(

<tr key={t.id} className="border-b border-gray-700">

<td className="py-3">
{t.date ? new Date(t.date).toLocaleDateString() : "-"}
</td>

<td className="py-3">
{getCategoryIcon(t.category)} {t.category}
</td>

<td className={`py-3 font-semibold ${t.type==="expense" ? "text-red-400":"text-green-400"}`}>
₹{t.amount}
</td>

<td className="py-3">
{t.person}
</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)

}