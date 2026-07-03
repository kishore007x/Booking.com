"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle, Download, ChevronRight } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";
import { formatPrice, formatDate, nightsBetween } from "@/lib/utils";
import { getHotelById } from "@/lib/mock-data";

function ConfirmationContent() {
  const params = useParams();
  const searchParams = useSearchParams();

  const hotelId = searchParams.get("hotelId") || "";
  const roomType = searchParams.get("roomType") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guests = Number(searchParams.get("guests")) || 2;
  const price = Number(searchParams.get("price")) || 0;
  const name = searchParams.get("name") || "Guest";

  const hotel = getHotelById(hotelId);
  const confirmationId = `STY${String(Math.random()).slice(2, 10)}`;
  const nights = nightsBetween(checkIn, checkOut);

  return (
    <div className="pt-20 pb-16 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-lg mx-auto px-4 w-full">
        <div className="bg-white rounded-xl border border-gray-200 text-center p-6 sm:p-8 shadow-sm">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5 border border-green-200">
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-sm text-gray-500 mb-6">Thank you, {name}. Your booking has been confirmed.</p>

          <div className="bg-gray-50 rounded-xl p-4 sm:p-5 mb-6 text-left space-y-3 border border-gray-100">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <span className="text-xs text-gray-500">Confirmation #</span>
              <span className="text-sm font-mono font-semibold text-indigo-600">{confirmationId}</span>
            </div>

            {hotel && (
              <div className="flex gap-3 pb-3 border-b border-gray-200">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden shrink-0">
                  <img src={hotel.images[0]} alt={hotel.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-gray-900 truncate">{hotel.name}</p>
                  <p className="text-xs text-gray-500 truncate">{hotel.city}</p>
                </div>
              </div>
            )}

            <div className="text-sm space-y-1.5">
              <div className="flex justify-between"><span className="text-gray-500">Room</span><span className="text-gray-900">{roomType}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Check-in</span><span className="text-gray-900">{formatDate(checkIn)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Check-out</span><span className="text-gray-900">{formatDate(checkOut)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Guests</span><span className="text-gray-900">{guests}</span></div>
              <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                <span className="font-semibold text-gray-900">Amount Paid</span>
                <span className="font-bold text-indigo-600">{formatPrice(price + Math.round(price * 0.12))}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <GlassButton variant="outline" className="flex-1" onClick={() => window.print()}>
              <Download className="w-4 h-4" /> Voucher
            </GlassButton>
            <Link href="/dashboard" className="flex-1">
              <GlassButton fullWidth>
                View Bookings <ChevronRight className="w-4 h-4" />
              </GlassButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
