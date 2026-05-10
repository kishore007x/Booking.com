"use client";

import React, { useState } from "react";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2");

  const handleSearch = () => {
    router.push("/stays");
  };
  
  return (
    <div className="w-full max-w-5xl mx-auto bg-white/95 backdrop-blur-xl rounded-[2.25rem] p-4 shadow-[0_20px_40px_-15px_rgba(15,23,42,0.12)] border border-slate-200 flex flex-col md:flex-row items-center gap-4 relative z-10">
      
      {/* Destination */}
      <div className="flex-1 w-full flex items-center gap-4 px-6 py-4 md:py-3 hover:bg-slate-50 rounded-[2rem] transition-all cursor-text group">
        <MapPin className="text-slate-400 group-hover:text-primary transition-colors" size={24} />
        <div className="flex flex-col flex-1">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Where</label>
          <input 
            type="text" 
            placeholder="Search destinations" 
            className="bg-transparent border-none outline-none text-slate-600 text-sm placeholder:text-slate-400 w-full truncate font-medium"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
      </div>

      <div className="hidden md:block w-[1px] h-10 bg-slate-200" />

      {/* Dates */}
      <div className="flex-1 w-full flex items-center gap-4 px-6 py-4 md:py-3 hover:bg-slate-50 rounded-[2rem] transition-all cursor-pointer group">
        <Calendar className="text-slate-400 group-hover:text-primary transition-colors" size={24} />
        <div className="flex flex-col w-full">
          <label className="text-[10px] font-extrabold text-slate-900 uppercase tracking-[0.2em] mb-1">Dates</label>
          <input 
            type="date" 
            className="bg-transparent border-none outline-none text-slate-600 text-sm w-full font-medium cursor-pointer"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="hidden md:block w-[1px] h-10 bg-slate-200" />

      {/* Guests */}
      <div className="flex-1 w-full flex items-center gap-4 px-6 py-4 md:py-3 hover:bg-slate-50 rounded-[2rem] transition-all cursor-pointer group">
        <Users className="text-slate-400 group-hover:text-primary transition-colors" size={24} />
        <div className="flex flex-col flex-1">
          <label className="text-[10px] font-extrabold text-slate-900 uppercase tracking-[0.2em] mb-1">Who</label>
          <div className="flex items-center gap-2">
            <input 
              type="number" 
              min="1"
              max="20"
              className="bg-transparent border-none outline-none text-slate-600 text-sm font-medium w-12"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
            <span className="text-sm text-slate-600 font-medium">guests</span>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <Button 
        size="lg" 
        onClick={handleSearch}
        className="w-full md:w-auto rounded-[2rem] px-10 py-6 md:py-8 h-auto text-lg gap-3 shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all ml-2"
      >
        <Search size={20} />
        <span>Search</span>
      </Button>
    </div>
  );
}
