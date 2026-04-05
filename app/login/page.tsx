"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  async function signIn(){

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if(error){
      alert(error.message)
    } else {
      window.location.href = "/"
    }

  }

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-80">

        <h1 className="text-xl font-bold mb-4">
          Login
        </h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <button
          onClick={signIn}
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Login
        </button>

      </div>

    </div>

  )
}