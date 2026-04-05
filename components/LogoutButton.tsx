"use client"

import { supabase } from "@/lib/supabase"

export default function LogoutButton(){

  async function logout(){
    await supabase.auth.signOut()
    window.location.href="/login"
  }

  return(
    <button
      onClick={logout}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
    >
      Logout
    </button>
  )
}