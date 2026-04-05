"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function UpdatePassword(){

  const [password,setPassword] = useState("")
  const [ready,setReady] = useState(false)

  useEffect(() => {

    // Supabase sets session automatically from reset link
    supabase.auth.getSession().then(({ data }) => {
      if(data.session){
        setReady(true)
      }
    })

  }, [])

  async function updatePassword(){

    const { error } = await supabase.auth.updateUser({
      password
    })

    if(error){
      alert(error.message)
    } else {
      alert("Password updated successfully")
      window.location.href="/login"
    }

  }

  if(!ready){
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-80">

        <h1 className="text-xl font-bold mb-4">
          Update Password
        </h1>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <button
          onClick={updatePassword}
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Update Password
        </button>

      </div>

    </div>

  )
}