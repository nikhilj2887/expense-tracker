import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://gtkesskhhgwgxfwecdmu.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0a2Vzc2toaGd3Z3hmd2VjZG11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMDM5OTcsImV4cCI6MjA5MDg3OTk5N30.d8WoZZ3y8o1in2wEF8YEMZtYXkF8usBI0RfZcmkl2GA"

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)