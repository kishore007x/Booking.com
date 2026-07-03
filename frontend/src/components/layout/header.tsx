"use client";

import Link from "next/link";
import { Building2, User, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-strong bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold">
              <span className="text-gradient">Stay</span>
              <span className="text-gray-800">Ease</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Home</Link>
            <Link href="/search" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Hotels</Link>
            <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">My Bookings</Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth"
              className="bg-white border border-gray-200 hover:border-gray-300 shadow-sm px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-gray-900 transition-all flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Sign In
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-gray-500 hover:text-gray-900"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-200 px-4 py-4 space-y-3 shadow-lg">
          <Link href="/" className="block text-sm text-gray-600 hover:text-gray-900 py-2" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/search" className="block text-sm text-gray-600 hover:text-gray-900 py-2" onClick={() => setOpen(false)}>Hotels</Link>
          <Link href="/dashboard" className="block text-sm text-gray-600 hover:text-gray-900 py-2" onClick={() => setOpen(false)}>My Bookings</Link>
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-gray-900"
            onClick={() => setOpen(false)}
          >
            <User className="w-4 h-4" /> Sign In
          </Link>
        </div>
      )}
    </header>
  );
}
