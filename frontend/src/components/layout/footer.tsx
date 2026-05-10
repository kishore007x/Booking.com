import React from "react";
import Link from "next/link";
import { Plane } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white text-slate-600 py-16 border-t border-slate-200">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary text-white p-2 rounded-xl shadow-sm">
                <Plane size={24} className="stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Booking<span className="text-primary">Portal</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 mt-4 max-w-xs">
              Your ultimate destination for seamless travel bookings. Experience premium stays, flights, and more.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="#" className="hover:text-primary transition-colors text-sm font-semibold">Twitter</Link>
              <Link href="#" className="hover:text-primary transition-colors text-sm font-semibold">Facebook</Link>
              <Link href="#" className="hover:text-primary transition-colors text-sm font-semibold">Instagram</Link>
              <Link href="#" className="hover:text-primary transition-colors text-sm font-semibold">LinkedIn</Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-slate-900 font-semibold mb-6">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-slate-900 transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-slate-900 transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-slate-900 transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-slate-900 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-900 font-semibold mb-6">Discover</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-slate-900 transition-colors">Top Destinations</Link></li>
              <li><Link href="#" className="hover:text-slate-900 transition-colors">Flights</Link></li>
              <li><Link href="#" className="hover:text-slate-900 transition-colors">Hotels</Link></li>
              <li><Link href="#" className="hover:text-slate-900 transition-colors">Exclusive Deals</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-900 font-semibold mb-6">Partners</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-slate-900 transition-colors">Partner Portal</Link></li>
              <li><Link href="#" className="hover:text-slate-900 transition-colors">Become a Partner</Link></li>
              <li><Link href="#" className="hover:text-slate-900 transition-colors">Affiliate Program</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Booking Portal. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
