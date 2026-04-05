"use client"

import { getCategoryIcon } from "@/lib/categoryIcons"

export default function TopCategories({transactions}:any){

const categoryTotals = Object.entries(
transactions.reduce((acc:any,t:any)=>{

if(t.type !== "expense") return acc

if(!acc[t.category]){
acc[t.category] = 0
}

acc[t.category] += Number(t.amount)

return acc

},{})
)
.sort((a:any,b:any)=>b[1]-a[1])
.slice(0,5)

return(

<div className="bg-gray-800 p-6 rounded-xl border border-gray-700">

<h2 className="font-semibold mb-4">
Top Spending Categories
</h2>

{categoryTotals.map(([category,amount]:any)=>(
<div key={category} className="flex justify-between mb-2">

<span>
{getCategoryIcon(category)} {category}
</span>

<span className="text-red-400">
₹{amount}
</span>

</div>
))}

</div>

)

}