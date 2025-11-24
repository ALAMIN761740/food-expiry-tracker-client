import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, AlertTriangle, CheckCircle } from "lucide-react";

// FoodCard Component
const FoodCard = ({ image, title, category, quantity, expiryDate, isNearExpiry, isExpired }) => (
  <div className="border border-green-200 rounded-xl p-4 bg-green-50 shadow-sm hover:shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer">
    <img src={image} alt={title} className="w-full h-40 md:h-48 object-cover rounded-md mb-2" />
    <h3 className="font-bold text-lg">{title}</h3>
    <p className="text-green-700">{category} • {quantity}</p>
    <p className={`mt-1 font-semibold ${isNearExpiry ? "text-yellow-600" : isExpired ? "text-red-600" : "text-green-800"}`}>
      {isNearExpiry && "Expires Soon: "}{isExpired && "Expired: "}{expiryDate}
    </p>
  </div>
);

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=600&fit=crop", title: "Track Your Food, Reduce Waste", description: "Never let food go to waste again with smart expiry tracking" },
    { image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=600&fit=crop", title: "Stay Organized", description: "Keep your kitchen inventory organized and up-to-date" },
    { image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&h=600&fit=crop", title: "Save Money", description: "Reduce grocery waste and save money by using food before it expires" },
  ];

  const nearExpiryFoods = [
    { id: "1", image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=400&h=300&fit=crop", title: "Fresh Milk", category: "Dairy", quantity: "1L", expiryDate: "2025-11-27", isNearExpiry: true },
    { id: "2", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&h=300&fit=crop", title: "Chicken Breast", category: "Meat", quantity: "500g", expiryDate: "2025-11-26", isNearExpiry: true },
    { id: "3", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop", title: "Fresh Tomatoes", category: "Vegetables", quantity: "6 pcs", expiryDate: "2025-11-28", isNearExpiry: true },
    { id: "4", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&fit=crop", title: "Yogurt", category: "Dairy", quantity: "200g", expiryDate: "2025-11-29", isNearExpiry: true },
    { id: "5", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop", title: "Fresh Salad Mix", category: "Vegetables", quantity: "250g", expiryDate: "2025-11-27", isNearExpiry: true },
    { id: "6", image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop", title: "Cheese Slices", category: "Dairy", quantity: "200g", expiryDate: "2025-11-28", isNearExpiry: true }
  ];

  const expiredFoods = [
    { id: "7", image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=400&h=300&fit=crop", title: "Expired Milk", category: "Dairy", quantity: "1L", expiryDate: "2025-11-20", isExpired: true },
    { id: "8", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop", title: "Old Bread", category: "Bakery", quantity: "1 loaf", expiryDate: "2025-11-18", isExpired: true }
  ];

  const sliderRef = useRef(null);
  const startX = useRef(0);

  const handleTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX.current - endX > 50) setCurrentSlide((prev) => (prev + 1) % slides.length);
    if (endX - startX.current > 50) setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="space-y-16 p-4 md:p-8 max-w-7xl mx-auto">

      {/* Slider */}
      <div
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg"
      >
        {slides.map((slide, idx) => (
          <div key={idx} className={`absolute inset-0 transition-opacity duration-700 ${idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/60 to-green-400/20 flex flex-col justify-center pl-4 md:pl-12 text-white">
              <h1 className="text-xl md:text-4xl font-bold">{slide.title}</h1>
              <p className="mt-2 md:mt-4 text-sm md:text-lg">{slide.description}</p>
            </div>
          </div>
        ))}
        <button onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-green-200 hover:bg-green-400 text-green-900 rounded-full p-2 transition">
          <ChevronLeft className="w-6 h-6"/>
        </button>
        <button onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-green-200 hover:bg-green-400 text-green-900 rounded-full p-2 transition">
          <ChevronRight className="w-6 h-6"/>
        </button>
      </div>

      {/* Nearly Expiry */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-8 h-8 text-yellow-600"/>
          <h2 className="text-2xl md:text-3xl font-bold text-green-800">Nearly Expiring Items</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearExpiryFoods.map(f => <FoodCard key={f.id} {...f} />)}
        </div>
      </section>

      {/* Expired Items */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
            <span className="font-bold text-white">!</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-red-700">Expired Items</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expiredFoods.map(f => <FoodCard key={f.id} {...f} />)}
        </div>
      </section>

      {/* Food Safety Tips */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">Food Safety Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {title: "Proper Storage", desc: "Keep fridge at 4°C & freezer at -18°C."},
            {title: "First In First Out", desc: "Use older items before newer ones."},
            {title: "Check Regularly", desc: "Inspect items weekly and remove expired food."}
          ].map((tip, i) => (
            <div key={i} className="bg-green-50 p-6 rounded-xl border border-green-200 hover:bg-green-200 hover:shadow-lg transition cursor-pointer">
              <CheckCircle className="w-6 h-6 text-green-800 mb-2"/>
              <h3 className="font-semibold text-green-800 mb-1">{tip.title}</h3>
              <p className="text-green-700">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-green-100 p-8 rounded-xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-4">Make a Difference</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-green-900">
          <div><div className="text-4xl font-bold">10,000+</div>Active Users</div>
          <div><div className="text-4xl font-bold">50,000+</div>Items Tracked</div>
          <div><div className="text-4xl font-bold">30%</div>Less Food Waste</div>
        </div>
      </section>
    </div>
  );
}
