"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CreditCard, ShieldCheck, ArrowLeft, Calendar, Users, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Redirect to dashboard after showing success state
      setTimeout(() => {
        router.push("/dashboard");
      }, 2500);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 px-4">
        <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl border border-slate-200 text-center max-w-md w-full animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-green-500" />
          </div>
          <h1 className="text-3xl font-extrabold mb-4">Payment Successful!</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Your booking for Santorini Villa is confirmed. We are redirecting you to your dashboard...
          </p>
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-semibold transition-colors mb-8">
          <ArrowLeft size={20} /> Back to property
        </button>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10">Secure Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column - Payment Details */}
          <div className="flex-1 space-y-8">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CreditCard className="text-primary" /> Payment Method
              </h2>
              
              <form onSubmit={handlePayment} className="space-y-6">
                {/* Stripe/Razorpay Mock Options */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 border-2 border-primary bg-primary/5 rounded-xl p-4 flex items-center justify-center font-bold cursor-pointer transition-colors">
                    Credit Card
                  </div>
                  <div className="flex-1 border-2 border-transparent bg-slate-100 rounded-xl p-4 flex items-center justify-center font-bold text-slate-500 cursor-pointer hover:bg-slate-200 transition-colors">
                    PayPal
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Card Number</label>
                    <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Expiry Date</label>
                      <input required type="text" placeholder="MM/YY" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">CVC</label>
                      <input required type="text" placeholder="123" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Name on Card</label>
                    <input required type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isProcessing}
                  className="w-full rounded-[1.5rem] py-6 text-lg font-bold shadow-xl shadow-primary/25 mt-4"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : "Confirm & Pay $1,552"}
                </Button>
              </form>
            </div>

            <p className="text-sm text-slate-500 flex items-center justify-center gap-2 font-medium">
              <ShieldCheck size={18} className="text-green-500" /> Payments are secure and encrypted
            </p>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-[400px]">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 sticky top-28">
              <h2 className="text-xl font-bold mb-6">Booking Summary</h2>
              
              <div className="flex gap-4 pb-6 border-b border-slate-200 mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=300&auto=format&fit=crop"
                  alt="Property"
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-xl object-cover shadow-sm"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="font-bold text-sm line-clamp-2 mb-1">Luxury Villa with Private Pool & Ocean View</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin size={12} /> Santorini, Greece</p>
                </div>
              </div>

              <div className="space-y-4 pb-6 border-b border-slate-200 mb-6">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <Calendar className="text-slate-400" size={18} />
                  <div>
                    <p className="text-slate-900">Oct 12 - Oct 15, 2026</p>
                    <p className="text-xs text-slate-500">3 nights</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <Users className="text-slate-400" size={18} />
                  <div>
                    <p className="text-slate-900">2 Guests</p>
                    <p className="text-xs text-slate-500">1 Room</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pb-6 border-b border-slate-200 mb-6 text-sm font-medium text-slate-600">
                <div className="flex justify-between">
                  <span>$450 x 3 nights</span>
                  <span>$1,350</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>$135</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>$67</span>
                </div>
              </div>

              <div className="flex justify-between items-center font-extrabold text-xl text-slate-900">
                <span>Total (USD)</span>
                <span>$1,552</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
