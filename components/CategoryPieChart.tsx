"use client"

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"

const COLORS = [
"#4F46E5",
"#22C55E",
"#EF4444",
"#F59E0B",
"#06B6D4",
"#A855F7"
]

export default function CategoryPieChart({data}:any) {

  return (

    <motion.div
      initial={{opacity:0, scale:0.95}}
      animate={{opacity:1, scale:1}}
      transition={{duration:0.4}}
      className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 w-full"
    >

      <h2 className="text-xl font-semibold mb-4">
        Category Breakdown
      </h2>

      <ResponsiveContainer width="100%" height={280}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={false}
            animationDuration={500}
          >

            {data.map((entry:any,index:number)=>(
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

          </Pie>

          <Tooltip
            contentStyle={{
              background:"#111827",
              border:"1px solid #374151",
              borderRadius:"8px",
              color:"#fff"
            }}
          />

          <Legend
            wrapperStyle={{
              fontSize:"12px"
            }}
          />

        </PieChart>

      </ResponsiveContainer>

    </motion.div>

  )
}