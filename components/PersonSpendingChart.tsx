"use client"

import { PieChart,Pie,Cell,Tooltip } from "recharts"

const COLORS=["#6366f1","#f43f5e"]

export default function PersonSpendingChart({transactions}:any){

const data = Object.values(
transactions.reduce((acc:any,t:any)=>{

if(t.type!=="expense") return acc

if(!acc[t.person]){
acc[t.person]={name:t.person,value:0}
}

acc[t.person].value+=Number(t.amount)

return acc

},{})
)

return(

<div className="bg-white p-6 rounded-xl shadow">

<h2 className="font-semibold mb-4">
Who Spent More
</h2>

<PieChart width={300} height={250}>

<Pie
data={data}
dataKey="value"
nameKey="name"
outerRadius={90}
>

{data.map((entry:any,index:number)=>(
<Cell key={index} fill={COLORS[index%COLORS.length]} />
))}

</Pie>

<Tooltip/>

</PieChart>

</div>

)

}