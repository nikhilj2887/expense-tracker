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
  localStorage.setItem("login_time", Date.now().toString())
  window.location.href = "/"
}

  }

  return (

    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">

      {/* Floating background shapes */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-30"></div>

      {/* Login Card */}
      <div className="backdrop-blur-md bg-white/30 p-8 rounded-xl shadow-xl w-80 border border-white/20">

        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Login
        </h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="border border-white/30 bg-white/70 p-2 w-full mb-3 rounded text-gray-800"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="border border-white/30 bg-white/70 p-2 w-full mb-4 rounded text-gray-800"
        />

        <button
          onClick={signIn}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full p-2 rounded transition"
        >
          Login
        </button>

      </div>

    </div>

  )
}