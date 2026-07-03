"use client";

import { useState } from "react";
import { TrendingUp, DollarSign, CalendarCheck, Users, ArrowUp, ArrowDown } from "lucide-react";
import { mockBookings, mockHotels } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

export default function AdminPage() {
  const totalRevenue = mockBookings
    .filter((b) => b.status === "confirmed")
    .reduce((sum, b) => sum + b.price, 0);

  const stats = [
    { label: "Total Revenue", value: formatPrice(totalRevenue), change: "+12.5%", up: true, icon: DollarSign },
    { label: "Active Bookings", value: mockBookings.filter((b) => b.status === "confirmed").length.toString(), change: "+8.2%", up: true, icon: CalendarCheck },
    { label: "Pending Payments", value: mockBookings.filter((b) => b.status === "hold").length.toString(), change: "-3.1%", up: false, icon: TrendingUp },
    { label: "Total Guests", value: mockBookings.reduce((sum, b) => sum + b.guests, 0).toString(), change: "+15.3%", up: true, icon: Users },
  ];

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6 pt-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Overview of bookings and revenue</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, i) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100">
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-medium ${stat.up ? "text-green-600" : "text-red-500"}`}>
                  {stat.change}
                  {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mb-0.5">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Recent Bookings</h2>
            <div className="space-y-3">
              {mockBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden shrink-0">
                      <img src={booking.hotelImage} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{booking.hotelName}</p>
                      <p className="text-xs text-gray-500 truncate">{booking.hotelCity}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <p className="text-sm font-semibold text-indigo-600">{formatPrice(booking.price)}</p>
                    <span className={`text-xs capitalize ${
                      booking.status === "confirmed" ? "text-green-600" :
                      booking.status === "hold" ? "text-yellow-600" : "text-red-500"
                    }`}>{booking.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hotels Overview */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Hotels Overview</h2>
            <div className="space-y-3">
              {mockHotels.map((hotel) => (
                <div key={hotel.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden shrink-0">
                      <img src={hotel.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{hotel.name}</p>
                      <p className="text-xs text-gray-500 truncate">{hotel.city}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <p className="text-sm font-semibold text-gray-900">{hotel.rating}</p>
                    <p className="text-xs text-gray-500">{hotel.reviewCount} reviews</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
