"use client"

import { RadialBarChart,RadialBar,Legend } from "recharts"

export default function BudgetChart() {

  const data = [
    {name:"Used",value:650,fill:"#ef4444"},
    {name:"Remaining",value:350,fill:"#22c55e"}
  ]

  return (

    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">

      <h2 className="text-xl font-semibold mb-4">
        Budget Usage
      </h2>

      <RadialBarChart
        width={300}
        height={250}
        innerRadius="40%"
        outerRadius="90%"
        data={data}
      >
        <RadialBar dataKey="value"/>
        <Legend/>
      </RadialBarChart>

    </div>
  )
}