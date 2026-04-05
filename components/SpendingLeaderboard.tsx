"use client"

export default function SpendingLeaderboard({transactions}:any){

const totals = transactions.reduce((acc:any,t:any)=>{

if(t.type !== "expense") return acc

if(!acc[t.person]){
acc[t.person] = 0
}

acc[t.person] += Number(t.amount)

return acc

},{})

const sorted = Object.entries(totals)
.sort((a:any,b:any)=>b[1]-a[1])

return(

<div className="bg-gray-800 p-6 rounded-xl border border-gray-700">

<h2 className="mb-4 font-semibold">
Spending Leaderboard
</h2>

{sorted.map(([name,amount]:any,i)=>(
<div key={name} className="flex justify-between mb-2">

<span>
{i===0 ? "🥇" : "🥈"} {name}
</span>

<span>₹{amount}</span>

</div>
))}

</div>

)

}