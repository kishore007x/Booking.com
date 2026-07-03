"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useState, useMemo } from "react";
import { Search, MapPin, Star, SlidersHorizontal, X } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { mockHotels, getRoomsForHotel } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

function SearchContent() {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination") || "";
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filteredHotels = useMemo(() => {
    return mockHotels.filter((hotel) => {
      const matchesDestination = !destination ||
        hotel.city.toLowerCase().includes(destination.toLowerCase()) ||
        hotel.name.toLowerCase().includes(destination.toLowerCase()) ||
        hotel.state.toLowerCase().includes(destination.toLowerCase());
      const rooms = getRoomsForHotel(hotel.id);
      const minPrice = rooms.length > 0 ? Math.min(...rooms.map((r) => r.pricePerNight)) : 0;
      return minPrice >= priceRange[0] && minPrice <= priceRange[1] && hotel.rating >= minRating && matchesDestination;
    });
  }, [destination, priceRange, minRating]);

  const allAmenities = useMemo(() => {
    const set = new Set<string>();
    mockHotels.forEach((h) => h.amenities.forEach((a) => set.add(a)));
    return Array.from(set);
  }, []);

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pt-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {destination ? <>Hotels in <span className="text-indigo-600">{destination}</span></> : "All Hotels"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">{filteredHotels.length} properties found</p>
          </div>
          <GlassButton variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 self-start">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </GlassButton>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters */}
          {showFilters && (
            <div className="w-full lg:w-64 shrink-0">
              <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-5 sticky top-24">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-gray-900">Filters</h3>
                  <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-2 font-medium">Min Rating</label>
                  <div className="flex flex-wrap gap-2">
                    {[0, 3, 4, 4.5].map((r) => (
                      <button
                        key={r}
                        onClick={() => setMinRating(r)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          minRating === r
                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
                        }`}
                      >
                        {r === 0 ? "Any" : `${r}+`}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-2 font-medium">
                    Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </label>
                  <div className="space-y-2">
                    <input type="range" min={0} max={100000} step={1000} value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full accent-indigo-600" />
                    <input type="range" min={0} max={100000} step={1000} value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full accent-indigo-600" />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-2 font-medium">Amenities</label>
                  <div className="flex flex-wrap gap-1.5">
                    {allAmenities.slice(0, 8).map((a) => (
                      <span key={a} className="px-2 py-0.5 rounded-md bg-gray-100 text-xs text-gray-600">{a}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1 space-y-4">
            {filteredHotels.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 text-center py-16 px-4">
                <Search className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">No hotels found</h3>
                <p className="text-sm text-gray-500">Try adjusting your filters or search destination.</p>
              </div>
            ) : (
              filteredHotels.map((hotel) => {
                const rooms = getRoomsForHotel(hotel.id);
                const minPrice = rooms.length > 0 ? Math.min(...rooms.map((r) => r.pricePerNight)) : 0;
                return (
                  <Link key={hotel.id} href={`/hotel/${hotel.id}?checkIn=${searchParams.get("checkIn") || ""}&checkOut=${searchParams.get("checkOut") || ""}&guests=${searchParams.get("guests") || "2"}`}>
                    <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-4 transition-all hover:shadow-md">
                      <div className="sm:w-56 h-44 sm:h-40 rounded-xl overflow-hidden shrink-0">
                        <img src={hotel.images[0]} alt={hotel.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-start justify-between mb-1 gap-2">
                            <h3 className="font-semibold text-base text-gray-900 truncate">{hotel.name}</h3>
                            <div className="flex items-center gap-1 text-xs shrink-0">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span className="font-medium text-gray-700">{hotel.rating}</span>
                              <span className="text-gray-400 hidden sm:inline">({hotel.reviewCount})</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span className="truncate">{hotel.city}, {hotel.state}</span>
                          </div>
                          <p className="text-xs text-gray-400 line-clamp-2 mb-3">{hotel.description}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {hotel.amenities.slice(0, 4).map((a) => (
                              <span key={a} className="px-2 py-0.5 rounded-md bg-gray-100 text-xs text-gray-500">{a}</span>
                            ))}
                            {hotel.amenities.length > 4 && (
                              <span className="px-2 py-0.5 rounded-md bg-gray-100 text-xs text-gray-500">+{hotel.amenities.length - 4}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                          <span className="text-xs text-gray-400">Starting from</span>
                          <span className="text-lg font-bold text-indigo-600">{formatPrice(minPrice)} <span className="text-xs font-normal text-gray-400">/ night</span></span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
