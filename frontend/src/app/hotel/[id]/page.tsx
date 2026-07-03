"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { MapPin, Star, Users, Check, X as XIcon, ChevronLeft, ChevronRight, Shield, Calendar } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";
import { getHotelById, getRoomsForHotel } from "@/lib/mock-data";
import { formatPrice, formatDate, nightsBetween } from "@/lib/utils";

function HotelDetail() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const hotel = getHotelById(params.id as string);
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guests = Number(searchParams.get("guests")) || 2;

  if (!hotel) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-xl border border-gray-200 text-center p-12 max-w-md">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Hotel not found</h2>
          <p className="text-gray-500 text-sm mb-4">The hotel you&apos;re looking for doesn&apos;t exist.</p>
          <GlassButton onClick={() => router.push("/search")}>Back to Search</GlassButton>
        </div>
      </div>
    );
  }

  const rooms = getRoomsForHotel(hotel.id);
  const nights = nightsBetween(checkIn || "2026-08-15", checkOut || "2026-08-18");

  return (
    <div className="pt-16 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 pt-4">
          <button onClick={() => router.push("/search")} className="hover:text-gray-900 transition-colors">Search</button>
          <span>/</span>
          <span className="text-gray-900">{hotel.name}</span>
        </div>

        {/* Image Gallery */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="relative h-64 sm:h-96">
            <img src={hotel.images[selectedImage]} alt={hotel.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

            <button onClick={() => setSelectedImage((prev) => (prev === 0 ? hotel.images.length - 1 : prev - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-700 hover:bg-white shadow-md transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => setSelectedImage((prev) => (prev === hotel.images.length - 1 ? 0 : prev + 1))}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-700 hover:bg-white shadow-md transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {hotel.images.map((_, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === selectedImage ? "bg-white w-6 shadow-md" : "bg-white/50"}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hotel Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{hotel.name}</h1>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4 shrink-0" />
                    {hotel.city}, {hotel.state}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-lg shrink-0 self-start">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-sm text-gray-900">{hotel.rating}</span>
                  <span className="text-gray-500 text-xs">({hotel.reviewCount})</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{hotel.description}</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {hotel.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-indigo-500 shrink-0" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Location</h2>
              <p className="text-sm text-gray-600 mb-3">{hotel.address}</p>
              <div className="h-48 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm border border-gray-200">
                Map loaded here
              </div>
            </div>
          </div>

          {/* Booking Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h2 className="font-semibold text-gray-900 mb-4">Available Rooms</h2>
                {checkIn && checkOut && (
                  <div className="bg-gray-50 rounded-xl px-4 py-3 mb-4 text-sm border border-gray-100">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(checkIn)} - {formatDate(checkOut)}
                    </div>
                    <span className="text-gray-500">{nights} night{nights > 1 ? "s" : ""}, {guests} guest{guests > 1 ? "s" : ""}</span>
                  </div>
                )}
                <div className="space-y-3">
                  {rooms.map((room) => {
                    const totalPrice = room.pricePerNight * nights;
                    const isSelected = selectedRoom === room.id;
                    return (
                      <div key={room.id}
                        onClick={() => room.available && setSelectedRoom(room.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? "border-indigo-500 bg-indigo-50"
                            : room.available
                            ? "border-gray-200 hover:border-gray-300 bg-white"
                            : "border-gray-100 opacity-50 cursor-not-allowed bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-sm text-gray-900">{room.name}</h3>
                          {room.available ? (
                            <span className="text-xs text-green-600 flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                              Available
                            </span>
                          ) : (
                            <span className="text-xs text-red-500 flex items-center gap-1">
                              <XIcon className="w-3 h-3" /> Sold Out
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                          <Users className="w-3 h-3" /> Up to {room.maxGuests} guests
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {room.amenities.slice(0, 3).map((a) => (
                            <span key={a} className="px-1.5 py-0.5 rounded bg-gray-100 text-xs text-gray-500">{a}</span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <span className="text-xs text-gray-400">{room.cancellationPolicy}</span>
                          <div className="text-right">
                            <span className="text-lg font-bold text-indigo-600">{formatPrice(totalPrice)}</span>
                            <span className="text-xs text-gray-400 block">{formatPrice(room.pricePerNight)} / night</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {selectedRoom && (
                <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-semibold text-gray-900">Secure your booking</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-4">
                    We&apos;ll hold this room for 10 minutes while you complete payment.
                  </p>
                  <GlassButton fullWidth onClick={() => {
                    const total = rooms.find((r) => r.id === selectedRoom)!.pricePerNight * nights;
                    router.push(`/checkout/bkg-mock-${Date.now()}?hotelId=${hotel.id}&roomType=${encodeURIComponent(rooms.find((r) => r.id === selectedRoom)!.name)}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&price=${total}`);
                  }}>
                    Book Now - {formatPrice(rooms.find((r) => r.id === selectedRoom)!.pricePerNight * nights)}
                  </GlassButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HotelPage() {
  return (
    <Suspense fallback={
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    }>
      <HotelDetail />
    </Suspense>
  );
}
