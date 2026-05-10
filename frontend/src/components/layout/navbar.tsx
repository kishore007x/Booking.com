"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plane, Menu, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-3" : "bg-white/80 backdrop-blur-sm border-b border-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 text-primary p-2 rounded-xl group-hover:scale-110 transition-transform">
            <Plane size={24} className="stroke-[2.5]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Booking<span className="text-primary">Portal</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/stays" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Stays</Link>
          <Link href="#" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Flights</Link>
          <Link href="#" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Car Rentals</Link>
          <Link href="#" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Experiences</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full border border-slate-200 bg-white">
            <Bell size={18} className="text-slate-600" />
          </Button>
          <Link href="/auth/login">
            <Button variant="outline" className="rounded-full flex items-center gap-2 border-slate-200 bg-white text-slate-900 hover:bg-slate-50">
              <User size={16} />
              Sign In
            </Button>
          </Link>
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="text-slate-900" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
