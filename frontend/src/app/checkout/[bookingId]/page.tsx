"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { Shield, Lock, Clock, ChevronRight } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";
import { formatPrice, formatDate, nightsBetween } from "@/lib/utils";
import { getHotelById } from "@/lib/mock-data";

function CheckoutContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const hotelId = searchParams.get("hotelId") || "";
  const roomType = searchParams.get("roomType") || "";
  const checkIn = searchParams.get("checkIn") || "2026-08-15";
  const checkOut = searchParams.get("checkOut") || "2026-08-18";
  const guests = Number(searchParams.get("guests")) || 2;
  const price = Number(searchParams.get("price")) || 0;

  const hotel = getHotelById(hotelId);
  const nights = nightsBetween(checkIn, checkOut);
  const tax = Math.round(price * 0.12);
  const total = price + tax;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handlePay = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      router.push(`/booking/${params.bookingId}/confirmation?hotelId=${hotelId}&roomType=${encodeURIComponent(roomType)}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&price=${price}&name=${encodeURIComponent(name)}`);
    }, 1500);
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Complete Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Guest Details */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
              <h2 className="font-semibold text-gray-900 mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">1</span>
                Guest Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Full Name</label>
                  <input type="text" placeholder="Enter your full name" value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Email</label>
                    <input type="email" placeholder="your@email.com" value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Phone</label>
                    <input type="tel" placeholder="+91 98765 43210" value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
              <h2 className="font-semibold text-gray-900 mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">2</span>
                Payment Method
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 border border-gray-200">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700 shrink-0">R</div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900">Razorpay</p>
                  <p className="text-xs text-gray-500">Pay via UPI, Card, Net Banking, Wallet</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 ml-auto shrink-0" />
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
                <Lock className="w-3 h-3" />
                Secured with 256-bit encryption
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-20">
              <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Booking Summary</h2>

                {hotel && (
                  <div className="flex gap-3 mb-4 pb-4 border-b border-gray-100">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                      <img src={hotel.images[0]} alt={hotel.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-gray-900 truncate">{hotel.name}</p>
                      <p className="text-xs text-gray-500">{hotel.city}</p>
                      <p className="text-xs text-gray-500 truncate">{roomType}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600"><span>Check-in</span><span>{formatDate(checkIn)}</span></div>
                  <div className="flex justify-between text-gray-600"><span>Check-out</span><span>{formatDate(checkOut)}</span></div>
                  <div className="flex justify-between text-gray-600"><span>Nights</span><span>{nights}</span></div>
                  <div className="flex justify-between text-gray-600"><span>Guests</span><span>{guests}</span></div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Room Price ({nights} nights)</span>
                    <span>{formatPrice(price)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes & Fees (12%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100 mt-2">
                    <span className="text-gray-900">Total</span>
                    <span className="text-indigo-600">{formatPrice(total)}</span>
                  </div>
                </div>

                <GlassButton fullWidth className="mt-6" onClick={handlePay} loading={submitting} disabled={!name || !email || !phone}>
                  <Shield className="w-4 h-4" />
                  Pay {formatPrice(total)} Securely
                </GlassButton>

                <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-400 justify-center">
                  <Clock className="w-3 h-3" />
                  Room held for 10:00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
