export interface Hotel {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  images: string[];
  amenities: string[];
  rating: number;
  reviewCount: number;
  description: string;
  latitude: number;
  longitude: number;
}

export interface RoomType {
  id: string;
  name: string;
  maxGuests: number;
  pricePerNight: number;
  amenities: string[];
  cancellationPolicy: string;
  available: boolean;
  remaining: number;
}

export interface SearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
}

export type BookingStatus = "hold" | "confirmed" | "cancelled" | "expired";

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  hotelImage: string;
  hotelCity: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  price: number;
  status: BookingStatus;
  razorpayPaymentId?: string;
  providerBookingId?: string;
  holdExpiresAt: string;
  createdAt: string;
  cancellationPolicy?: string;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
}
