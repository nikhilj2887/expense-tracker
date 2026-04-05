"use client"

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"
import { motion } from "framer-motion"

const COLORS = ["#3b82f6","#10b981","#f59e0b","#ef4444"]

export default function CategoryPieChart({data}:any) {

  return (

    <motion.div
      initial={{opacity:0, scale:0.9}}
      animate={{opacity:1, scale:1}}
      transition={{duration:0.4}}
      className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
    >

      <h2 className="text-xl font-semibold mb-4">
        Category Breakdown
      </h2>

      <ResponsiveContainer width="100%" height={300}>
  <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={90}
          label
        >
          {data.map((entry:any,index:number)=>(
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip/>
        <Legend/>

      </PieChart>

    </motion.div>

  )
}