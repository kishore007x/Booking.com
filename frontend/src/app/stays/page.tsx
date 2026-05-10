import Image from "next/image";
import React from "react";
import { SearchBar } from "@/components/search/search-bar";
import { Star, MapPin, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const properties = [
  {
    id: 1,
    title: "Luxury Villa with Private Pool",
    location: "Santorini, Greece",
    price: 450,
    rating: 4.96,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1000&auto=format&fit=crop",
    amenities: ["Private Pool", "Ocean View", "Free Wifi"]
  },
  {
    id: 2,
    title: "Modern Loft in City Center",
    location: "Paris, France",
    price: 180,
    rating: 4.85,
    reviews: 84,
    image: "https://images.unsplash.com/photo-1502672260266-1c1e5250ce07?q=80&w=1000&auto=format&fit=crop",
    amenities: ["City View", "Kitchen", "Workspace"]
  },
  {
    id: 3,
    title: "Serene Jungle Treehouse",
    location: "Ubud, Bali",
    price: 120,
    rating: 4.99,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000&auto=format&fit=crop",
    amenities: ["Jungle View", "Breakfast", "Air Conditioning"]
  },
  {
    id: 4,
    title: "Ski Chalet near Slopes",
    location: "Zermatt, Switzerland",
    price: 550,
    rating: 4.92,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1000&auto=format&fit=crop",
    amenities: ["Ski-in/Ski-out", "Hot Tub", "Fireplace"]
  },
  {
    id: 5,
    title: "Beachfront Minimalist Home",
    location: "Malibu, California",
    price: 890,
    rating: 4.88,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1000&auto=format&fit=crop",
    amenities: ["Beach Access", "Patio", "Free Parking"]
  },
  {
    id: 6,
    title: "Historic Castle Room",
    location: "Edinburgh, Scotland",
    price: 240,
    rating: 4.75,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?q=80&w=1000&auto=format&fit=crop",
    amenities: ["Historic", "Breakfast", "Tour Guide"]
  }
];

export default function StaysPage() {
  return (
    <div className="min-h-screen pt-24 bg-background pb-20">
      <div className="bg-slate-50 py-10 px-4 mb-8 border-y border-slate-200">
        <div className="container mx-auto max-w-6xl">
          <SearchBar />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-72 shrink-0 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Filter size={20} /> Filters
            </h2>
            <button className="text-sm text-primary font-medium hover:underline">Reset</button>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Price Range</h3>
            <div className="flex items-center gap-4">
              <input type="text" placeholder="Min" className="w-full bg-slate-100 border-none rounded-lg px-4 py-2 text-sm" />
              <span className="text-slate-400">-</span>
              <input type="text" placeholder="Max" className="w-full bg-slate-100 border-none rounded-lg px-4 py-2 text-sm" />
            </div>
            <input type="range" className="w-full accent-primary" />
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Property Type</h3>
            {['Hotels', 'Apartments', 'Resorts', 'Villas', 'Cabins'].map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group">
                <div className="w-5 h-5 rounded border border-slate-300 group-hover:border-primary flex items-center justify-center transition-colors">
                  <div className="w-3 h-3 bg-primary rounded-sm opacity-0" />
                </div>
                <span className="text-slate-600 text-sm">{type}</span>
              </label>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Amenities</h3>
            {['Wifi', 'Kitchen', 'Pool', 'Free Parking', 'Air Conditioning'].map((amenity) => (
              <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                <div className="w-5 h-5 rounded border border-slate-300 group-hover:border-primary flex items-center justify-center transition-colors">
                  <div className="w-3 h-3 bg-primary rounded-sm opacity-0" />
                </div>
                <span className="text-slate-600 text-sm">{amenity}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Listings Main */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold tracking-tight">300+ places to stay</h1>
            <Button variant="outline" className="gap-2">
              Sort by: Recommended <ChevronDown size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 border border-slate-200">
                    <Star size={14} className="fill-yellow-500 text-yellow-500" />
                    {property.rating}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center text-slate-500 text-sm mb-2 gap-1">
                    <MapPin size={14} />
                    {property.location}
                  </div>
                  <h3 className="text-lg font-bold mb-3 line-clamp-1 group-hover:text-primary transition-colors">{property.title}</h3>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {property.amenities.map(am => (
                      <span key={am} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium">
                        {am}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <span className="text-2xl font-extrabold">${property.price}</span>
                      <span className="text-slate-500 text-sm font-medium"> / night</span>
                    </div>
                    <Link href={`/stays/${property.id}`}>
                      <Button>Book Now</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button variant="outline" size="lg" className="w-full max-w-sm">
              Load More Properties
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
