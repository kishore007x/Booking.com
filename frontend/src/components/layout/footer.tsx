import { Building2, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                <span className="text-gradient">Stay</span>
                <span className="text-gray-800">Ease</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Premium hotel booking platform for unforgettable stays across India.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Home</a></li>
              <li><a href="/search" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Search Hotels</a></li>
              <li><a href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">My Bookings</a></li>
              <li><a href="/admin" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Admin</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Cancellation Policy</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <Mail className="w-4 h-4 text-indigo-500 shrink-0" /> support@stayease.in
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <Phone className="w-4 h-4 text-indigo-500 shrink-0" /> +91 1800-123-4567
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4 text-indigo-500 shrink-0" /> Mumbai, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} StayEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
