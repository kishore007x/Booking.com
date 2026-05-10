import React from "react";
import { 
  LayoutDashboard, 
  Hotel, 
  CalendarCheck, 
  Wallet, 
  Settings, 
  PieChart,
  Bell,
  ArrowUpRight,
  Users
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  // In a real app, role would be fetched from auth context
  const role: string = "owner"; // 'customer' | 'owner' | 'intermediate'

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 pt-20">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">
              JS
            </div>
            <div>
              <h3 className="font-bold text-sm">John Smith</h3>
              <p className="text-xs text-slate-500 capitalize">{role} Account</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 bg-primary/10 text-primary rounded-lg font-medium text-sm">
            <LayoutDashboard size={18} /> Overview
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-medium text-sm transition-colors">
            <CalendarCheck size={18} /> Bookings
          </Link>
          {role === 'owner' && (
            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-medium text-sm transition-colors">
              <Hotel size={18} /> My Properties
            </Link>
          )}
          {(role === 'owner' || role === 'intermediate') && (
            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-medium text-sm transition-colors">
              <Wallet size={18} /> Earnings
            </Link>
          )}
          {role === 'intermediate' && (
            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-medium text-sm transition-colors">
              <PieChart size={18} /> Commission Reports
            </Link>
          )}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-medium text-sm transition-colors">
            <Settings size={18} /> Settings
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
            <p className="text-slate-500 text-sm">Welcome back, here&apos;s what&apos;s happening with your properties today.</p>
          </div>
          <button className="relative p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900" />
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Revenue", value: "$24,500", change: "+12.5%", icon: Wallet, color: "text-green-500", bg: "bg-green-500/10" },
            { label: "Active Bookings", value: "142", change: "+5.2%", icon: CalendarCheck, color: "text-blue-500", bg: "bg-blue-500/10" },
            { label: "Properties Listed", value: "12", change: "0%", icon: Hotel, color: "text-purple-500", bg: "bg-purple-500/10" },
            { label: "Profile Views", value: "3,400", change: "+18.2%", icon: Users, color: "text-orange-500", bg: "bg-orange-500/10" },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-md">
                  {stat.change} <ArrowUpRight size={12} />
                </div>
              </div>
              <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Recent Activity / Table */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent Bookings</h2>
            <button className="text-sm text-primary font-semibold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/50 uppercase">
                <tr>
                  <th className="px-6 py-4 font-semibold">Guest</th>
                  <th className="px-6 py-4 font-semibold">Property</th>
                  <th className="px-6 py-4 font-semibold">Dates</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {[
                  { guest: "Alice Smith", property: "Luxury Villa Santorini", dates: "Oct 12 - Oct 18", amount: "$1,250", status: "Confirmed", statusColor: "text-green-500 bg-green-500/10" },
                  { guest: "Robert Johnson", property: "Paris Loft", dates: "Oct 15 - Oct 20", amount: "$850", status: "Pending", statusColor: "text-yellow-500 bg-yellow-500/10" },
                  { guest: "Emily Davis", property: "Bali Treehouse", dates: "Oct 22 - Oct 29", amount: "$940", status: "Confirmed", statusColor: "text-green-500 bg-green-500/10" },
                  { guest: "Michael Wilson", property: "Swiss Chalet", dates: "Nov 01 - Nov 05", amount: "$2,100", status: "Cancelled", statusColor: "text-red-500 bg-red-500/10" },
                ].map((booking, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{booking.guest}</td>
                    <td className="px-6 py-4 text-slate-500">{booking.property}</td>
                    <td className="px-6 py-4 text-slate-500">{booking.dates}</td>
                    <td className="px-6 py-4 font-bold">{booking.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${booking.statusColor}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
