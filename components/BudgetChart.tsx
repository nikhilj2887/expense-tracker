"use client"

import {
RadialBarChart,
RadialBar,
ResponsiveContainer
} from "recharts"

export default function BudgetChart(){

const data = [
{ name:"Used", value:65, fill:"#ef4444"},
{ name:"Remaining", value:35, fill:"#22c55e"}
]

return(

<div className="bg-gray-900/70 backdrop-blur-md p-6 rounded-xl border border-gray-800">

<h2 className="text-lg font-semibold mb-4">
Budget Usage
</h2>

<ResponsiveContainer width="100%" height={260}>

<RadialBarChart
innerRadius="40%"
outerRadius="100%"
data={data}
startAngle={180}
endAngle={0}
>

<RadialBar dataKey="value"/>

</RadialBarChart>

</ResponsiveContainer>

</div>

)

}