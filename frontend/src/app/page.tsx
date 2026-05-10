import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "@/components/search/search-bar";
import { MapPin, Star, Shield, Clock, CreditCard, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-[#f8fafc] selection:bg-primary/20">
      {/* Hero Section */}
      <section className="relative w-full min-h-[95vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-200/40 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />

        <div className="container relative z-20 mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 flex flex-col space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm w-max">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">New premium stays added</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-[5rem] font-extrabold text-slate-900 tracking-[-0.04em] leading-[1.1]">
                Book your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                  dream stay
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-lg">
                Discover extraordinary homes, luxury villas, and boutique hotels worldwide. Direct bookings with transparent pricing.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/stays">
                  <button className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-5 rounded-[2rem] font-bold text-lg hover:scale-105 transition-transform w-full sm:w-auto shadow-xl shadow-slate-900/20">
                    Explore Now <ArrowRight size={20} />
                  </button>
                </Link>
                <Link href="/auth/login">
                  <button className="bg-white text-slate-900 px-8 py-5 rounded-[2rem] font-bold text-lg hover:bg-slate-50 transition-colors border border-slate-200 w-full sm:w-auto shadow-sm">
                    Become a Host
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Content - Bento Box Images */}
            <div className="lg:col-span-7 relative h-[600px] hidden md:block">
              {/* Main Large Image */}
              <div className="absolute right-0 top-0 w-3/4 h-[90%] rounded-[2.5rem] overflow-hidden shadow-2xl z-10 hover:z-30 transition-all hover:scale-[1.02] duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop"
                  alt="Luxury Modern Home"
                  fill
                  priority
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
              </div>
              
              {/* Secondary Bottom Left */}
              <div className="absolute left-0 bottom-0 w-2/5 h-3/5 rounded-[2.5rem] overflow-hidden shadow-2xl z-20 border-4 border-white dark:border-slate-950 hover:scale-[1.05] transition-all duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop"
                  alt="Cozy Interior"
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Tertiary Top Left Floating Card */}
              <div className="absolute left-10 top-10 w-64 bg-white/90 backdrop-blur-xl p-5 rounded-[2rem] shadow-xl border border-white/50 z-30 flex items-center gap-4 animate-bounce hover:animate-none">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                  <Star className="fill-orange-500" size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">4.98 Rating</p>
                  <p className="text-xs text-slate-500">Based on 10k+ reviews</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Floating Search Bar Section */}
      <section className="relative z-30 -mt-16 mb-20 px-4">
        <SearchBar />
      </section>

      {/* Modern Trending Bento Section */}
      <section className="py-24 bg-white rounded-[3rem] shadow-sm border border-slate-100 mx-4 md:mx-8 mb-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
                Trending Destinations
              </h2>
              <p className="text-slate-500 text-lg">
                Explore our most curated, breathtaking locations worldwide. Find your absolute dream vacation spot today.
              </p>
            </div>
            <Link href="/stays">
              <button className="flex items-center gap-2 text-slate-900 font-bold bg-slate-100 px-6 py-3 rounded-full hover:bg-primary hover:text-white transition-all">
                View all <ArrowRight size={16} />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
            {/* Large Feature */}
            <div className="md:col-span-2 group relative rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-[400px] md:h-full">
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent z-10 transition-opacity" />
              <Image
                src="https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1200&auto=format&fit=crop"
                alt="Santorini"
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6 z-20">
                <span className="bg-white/90 backdrop-blur text-slate-900 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full">Top Pick</span>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                <h3 className="text-4xl font-extrabold text-white mb-2">Santorini, Greece</h3>
                <p className="text-slate-200 font-medium flex items-center gap-2 text-lg">
                  <MapPin size={18} /> 340+ exclusive properties
                </p>
              </div>
            </div>

            {/* Side Features */}
            <div className="flex flex-col gap-6">
              <div className="flex-1 group relative rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-[300px] md:h-auto">
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent z-10" />
                <Image
                  src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop"
                  alt="Bali"
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                  <h3 className="text-2xl font-bold text-white mb-1">Bali, Indonesia</h3>
                  <p className="text-slate-200 text-sm font-medium">820+ properties</p>
                </div>
              </div>

              <div className="flex-1 group relative rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-[300px] md:h-auto">
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent z-10" />
                <Image
                  src="https://images.unsplash.com/photo-1531366936337-77cf5e08ce27?q=80&w=800&auto=format&fit=crop"
                  alt="Swiss Alps"
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                  <h3 className="text-2xl font-bold text-white mb-1">Swiss Alps</h3>
                  <p className="text-slate-200 text-sm font-medium">150+ properties</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Cards */}
      <section className="py-16 mb-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
              <div className="w-16 h-16 bg-primary/10 rounded-[1.5rem] flex items-center justify-center mb-8 text-primary group-hover:scale-110 transition-transform">
                <Shield size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Secure & Verified</h3>
              <p className="text-slate-500 leading-relaxed text-lg">
                Every property and host on our platform is verified. Payments are securely processed via Stripe.
              </p>
            </div>
            
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
              <div className="w-16 h-16 bg-purple-500/10 rounded-[1.5rem] flex items-center justify-center mb-8 text-purple-500 group-hover:scale-110 transition-transform">
                <CreditCard size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Transparent Pricing</h3>
              <p className="text-slate-500 leading-relaxed text-lg">
                No hidden fees or surprise charges. The price you see is the final price you pay.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-[1.5rem] flex items-center justify-center mb-8 text-emerald-500 group-hover:scale-110 transition-transform">
                <Clock size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">24/7 Global Support</h3>
              <p className="text-slate-500 leading-relaxed text-lg">
                Our global support team is available around the clock to help you with your booking needs.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
