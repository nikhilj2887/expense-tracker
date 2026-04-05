"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabase"

const IDLE_LIMIT = 30 * 60 * 1000 // 30 minutes

export default function SessionTimeout() {

  useEffect(() => {

    let timeout: NodeJS.Timeout

    const logout = async () => {
      await supabase.auth.signOut()
      window.location.href = "/login"
    }

    const resetTimer = () => {
      clearTimeout(timeout)
      timeout = setTimeout(logout, IDLE_LIMIT)
    }

    const events = [
      "mousemove",
      "mousedown",
      "keypress",
      "scroll",
      "touchstart"
    ]

    // Start timer initially
    resetTimer()

    // Listen for activity
    events.forEach(event => {
      window.addEventListener(event, resetTimer)
    })

    return () => {
      clearTimeout(timeout)
      events.forEach(event => {
        window.removeEventListener(event, resetTimer)
      })
    }

  }, [])

  return null
}