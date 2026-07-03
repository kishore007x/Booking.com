"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";
import { mockBookings } from "@/lib/mock-data";
import { formatPrice, formatDate } from "@/lib/utils";
import type { BookingStatus } from "@/lib/types";

const statusConfig: Record<BookingStatus, { label: string; bg: string; dot: string }> = {
  confirmed: { label: "Confirmed", bg: "bg-green-100 text-green-700 border-green-200", dot: "bg-green-500" },
  hold: { label: "Payment Pending", bg: "bg-yellow-100 text-yellow-700 border-yellow-200", dot: "bg-yellow-500" },
  cancelled: { label: "Cancelled", bg: "bg-red-100 text-red-700 border-red-200", dot: "bg-red-500" },
  expired: { label: "Expired", bg: "bg-gray-100 text-gray-600 border-gray-200", dot: "bg-gray-400" },
};

export default function DashboardPage() {
  const [filter, setFilter] = useState<BookingStatus | "all">("all");
  const filtered = filter === "all" ? mockBookings : mockBookings.filter((b) => b.status === filter);

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pt-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Bookings</h1>
            <p className="text-sm text-gray-500 mt-1">{mockBookings.length} total bookings</p>
          </div>
          <Link href="/search">
            <GlassButton>Book a Hotel</GlassButton>
          </Link>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-1 px-1">
          {["all", "confirmed", "hold", "cancelled"].map((s) => (
            <button key={s} onClick={() => setFilter(s as BookingStatus | "all")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                filter === s
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300"
              }`}>
              {s === "all" ? "All" : statusConfig[s as BookingStatus].label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 text-center py-16 px-4">
            <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No bookings found</h3>
            <p className="text-sm text-gray-500 mb-4">You haven&apos;t made any bookings yet.</p>
            <Link href="/search"><GlassButton>Start Exploring</GlassButton></Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((booking, i) => {
              const config = statusConfig[booking.status];
              return (
                <Link key={booking.id} href={`/hotel/${booking.hotelId}`}>
                  <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-4 transition-all hover:shadow-md">
                    <div className="sm:w-36 h-28 rounded-xl overflow-hidden shrink-0">
                      <img src={booking.hotelImage} alt={booking.hotelName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-sm text-gray-900 truncate">{booking.hotelName}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 shrink-0 self-start ${config.bg}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                          {config.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{booking.hotelCity}</p>
                      <p className="text-xs text-gray-500 mb-2">{booking.roomType}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                        </span>
                        <span className="font-semibold text-indigo-600">{formatPrice(booking.price)}</span>
                      </div>
                    </div>
                    <div className="sm:self-center hidden sm:block">
                      <ChevronRight className="w-5 h-5 text-gray-300" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
