"use client"

export default function FloatingAddButton(){

return(

<button
className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white w-14 h-14 rounded-full text-2xl shadow-lg md:hidden"
onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}
>
+
</button>

)

}