"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Share, Heart, CheckCircle2, ChevronRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

// A mock property for the details page
const property = {
  id: "1",
  title: "Luxury Villa with Private Pool & Ocean View",
  location: "Santorini, Greece",
  host: "Elena",
  pricePerNight: 450,
  rating: 4.96,
  reviews: 128,
  description: "Experience the ultimate luxury in our stunning cliffside villa. Featuring panoramic views of the Aegean Sea, a private infinity pool, and world-class amenities. Perfect for a romantic getaway or a serene retreat.",
  images: [
    "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=800&auto=format&fit=crop"
  ],
  amenities: ["Private Pool", "Ocean View", "Free Wifi", "Full Kitchen", "Air Conditioning", "Free Parking"]
};

export default function PropertyDetailsPage() {
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const totalNights = 3; // Hardcoded for demo purposes
  const basePrice = property.pricePerNight * totalNights * rooms;
  const serviceFee = Math.round(basePrice * 0.1);
  const taxes = Math.round(basePrice * 0.05);
  const total = basePrice + serviceFee + taxes;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Breadcrumbs & Header */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-slate-500 mb-4 gap-2">
            <Link href="/" className="hover:text-primary">Home</Link> <ChevronRight size={14} />
            <Link href="/stays" className="hover:text-primary">Stays</Link> <ChevronRight size={14} />
            <span className="text-slate-900 font-medium truncate">{property.title}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                {property.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600">
                <span className="flex items-center gap-1"><Star size={16} className="fill-yellow-500 text-yellow-500" /> {property.rating} ({property.reviews} reviews)</span>
                <span className="flex items-center gap-1"><MapPin size={16} /> {property.location}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-full gap-2"><Share size={16} /> Share</Button>
              <Button variant="outline" className="rounded-full gap-2"><Heart size={16} /> Save</Button>
            </div>
          </div>
        </div>

        {/* Image Gallery Bento Box */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] md:h-[500px] mb-12 rounded-[2rem] overflow-hidden">
          <div className="md:col-span-2 row-span-2 h-full">
            <div className="relative h-full w-full">
              <Image src={property.images[0]} alt="Main" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
            </div>
          </div>
          <div className="md:col-span-1 row-span-1 h-full hidden md:block">
            <div className="relative h-full w-full">
              <Image src={property.images[1]} alt="View 2" fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
            </div>
          </div>
          <div className="md:col-span-1 row-span-1 h-full hidden md:block">
            <div className="relative h-full w-full">
              <Image src={property.images[2]} alt="View 3" fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
            </div>
          </div>
          <div className="md:col-span-2 row-span-1 h-full hidden md:block">
            <div className="relative h-full w-full">
              <Image src={property.images[3]} alt="View 4" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Host Info */}
            <div className="flex items-center justify-between pb-8 border-b border-slate-200">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Hosted by {property.host}</h2>
                <p className="text-slate-500">Superhost · 5 years hosting</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                {property.host.charAt(0)}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-bold mb-4">About this space</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-bold mb-6">What this place offers</h3>
              <div className="grid grid-cols-2 gap-4">
                {property.amenities.map(am => (
                  <div key={am} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 size={20} className="text-primary" /> {am}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Widget (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white p-8 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-200">
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-extrabold">${property.pricePerNight}</span>
                <span className="text-slate-500 font-medium">/ night</span>
              </div>

              {/* Booking Form */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1">Check-in</label>
                    <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full bg-transparent border-none outline-none text-sm font-medium cursor-pointer" />
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1">Check-out</label>
                    <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full bg-transparent border-none outline-none text-sm font-medium cursor-pointer" />
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">Guests</label>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold shadow-sm">-</button>
                    <span className="font-bold w-4 text-center">{guests}</span>
                    <button onClick={() => setGuests(guests + 1)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold shadow-sm">+</button>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">Rooms</label>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setRooms(Math.max(1, rooms - 1))} className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold shadow-sm">-</button>
                    <span className="font-bold w-4 text-center">{rooms}</span>
                    <button onClick={() => setRooms(rooms + 1)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold shadow-sm">+</button>
                  </div>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full rounded-[1.5rem] py-6 text-lg font-bold shadow-xl shadow-primary/25 mb-4">
                  Pay Now
                </Button>
              </Link>
              
                <p className="text-center text-sm text-slate-500 mb-6 flex items-center justify-center gap-1">
                <Lock size={14} /> You won&apos;t be charged yet
              </p>

              {/* Price Breakdown */}
              <div className="space-y-3 pb-4 border-b border-slate-200">
                <div className="flex justify-between text-slate-600">
                  <span className="underline decoration-slate-300">${property.pricePerNight} x {totalNights} nights x {rooms} rooms</span>
                  <span>${basePrice}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="underline decoration-slate-300">Service Fee</span>
                  <span>${serviceFee}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="underline decoration-slate-300">Taxes</span>
                  <span>${taxes}</span>
                </div>
              </div>
              
              <div className="flex justify-between font-extrabold text-lg pt-4">
                <span>Total</span>
                <span>${total}</span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
