"use client"

export default function DashboardLayout({children}: {children: React.ReactNode}) {

return (

<div className="flex h-screen bg-slate-950 text-gray-200">

{/* Sidebar */}

<div className="hidden md:block w-64 bg-slate-900 border-r border-slate-800 p-6">

<h1 className="text-xl font-bold mb-8">
ExpenseTracker
</h1>

<nav className="space-y-4 text-gray-400">

<a className="block hover:text-white">Dashboard</a>
<a className="block hover:text-white">Transactions</a>
<a className="block hover:text-white">Budgets</a>
<a className="block hover:text-white">Reports</a>
<a className="block hover:text-white">Settings</a>

</nav>

</div>

{/* Main content */}

<div className="flex-1 flex flex-col w-full">

{/* Top Bar */}



{/* Page Content */}

<div className="p-8 overflow-y-auto">

{children}

</div>

</div>

</div>

)

}