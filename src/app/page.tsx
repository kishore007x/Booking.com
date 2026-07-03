"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, MapPin, Calendar, Users, TrendingUp, Star, Shield, CreditCard } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { mockHotels, getRoomsForHotel } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

export default function HomePage() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const searchUrl = destination
    ? `/search?destination=${encodeURIComponent(destination)}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
    : "#";

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-glow" />
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />

        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-medium mb-6 border border-indigo-100">
              Your Premium Booking Companion
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight text-gray-900">
              Find Your Perfect
              <br />
              <span className="text-gradient">Stay in India</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mb-8 px-4">
              Curated luxury hotels across India&apos;s most beautiful destinations.
              Experience world-class hospitality at the best prices.
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Destination (city, hotel)"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full sm:w-36 pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full sm:w-36 pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full sm:w-28 pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
                  ))}
                </select>
              </div>
              <Link href={searchUrl} onClick={(e) => { if (!destination) e.preventDefault(); }}>
                <GlassButton className="w-full sm:w-auto">
                  <Search className="w-4 h-4" />
                  Search
                </GlassButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-5 h-8 rounded-full border-2 border-gray-300 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-gray-400 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="relative z-10 -mt-12 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 sm:p-8 shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Popular Destinations</h2>
              <Link href="/search" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                View all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {mockHotels.slice(0, 6).map((hotel) => {
                const rooms = getRoomsForHotel(hotel.id);
                const minPrice = rooms.length > 0 ? Math.min(...rooms.map((r) => r.pricePerNight)) : 5000;
                return (
                  <Link key={hotel.id} href={`/hotel/${hotel.id}`}>
                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <div className="relative h-44 sm:h-48 overflow-hidden">
                        <img
                          src={hotel.images[0]}
                          alt={hotel.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <span className="text-xs bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-gray-700 font-medium">{hotel.state}</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold text-sm text-gray-900">{hotel.name}</h3>
                          <div className="flex items-center gap-1 text-xs shrink-0">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="font-medium text-gray-700">{hotel.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{hotel.city}</p>
                        <p className="text-sm font-semibold text-indigo-600">
                          From {formatPrice(minPrice)} <span className="text-xs font-normal text-gray-400">/ night</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Why Choose StayEase?</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
              We make booking premium hotels simple, secure, and seamless.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: TrendingUp, title: "Best Price Guarantee", desc: "We match any lower price you find on premium hotels across India." },
              { icon: Shield, title: "Secure Booking", desc: "Your payment is protected with bank-grade encryption and fraud monitoring." },
              { icon: CreditCard, title: "Easy Cancellation", desc: "Flexible policies. Cancel for free up to 24-48 hours before check-in." },
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 sm:p-8 text-center transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-4 border border-indigo-100">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
