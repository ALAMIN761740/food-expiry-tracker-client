import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, AlertTriangle, CheckCircle } from "lucide-react";
import { getFoods } from "../services/api";

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
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const sliderRef = useRef(null);
  const startX = useRef(0);

  const slides = [
    { image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=600&fit=crop", title: "Track Your Food, Reduce Waste", description: "Never let food go to waste again with smart expiry tracking" },
    { image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=600&fit=crop", title: "Stay Organized", description: "Keep your kitchen inventory organized and up-to-date" },
    { image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&h=600&fit=crop", title: "Save Money", description: "Reduce grocery waste and save money by using food before it expires" },
  ];

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      const data = await getFoods();
      setFoods(data);
      setLoading(false);
    };
    fetchFoods();
  }, []);

  const nearExpiryFoods = foods.filter(f => {
    const expiry = new Date(f.expiryDate);
    const today = new Date();
    const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 5;
  });

  const expiredFoods = foods.filter(f => {
    const expiry = new Date(f.expiryDate);
    const today = new Date();
    return expiry < today;
  });

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

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <span className="loading loading-ring loading-xl"></span>
    </div>
  );

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
      </div>

      {/* Nearly Expiry */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-8 h-8 text-yellow-600"/>
          <h2 className="text-2xl md:text-3xl font-bold text-green-800">Nearly Expiring Items</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearExpiryFoods.map(f => <FoodCard key={f._id} {...f} isNearExpiry />)}
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
          {expiredFoods.map(f => <FoodCard key={f._id} {...f} isExpired />)}
        </div>
      </section>

      {/* Food Safety Tips */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">Food Safety Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{title:"Proper Storage",desc:"Keep fridge at 4°C & freezer at -18°C."},{title:"First In First Out",desc:"Use older items before newer ones."},{title:"Check Regularly",desc:"Inspect items weekly and remove expired food."}]
            .map((tip,i)=>(
              <div key={i} className="bg-green-50 p-6 rounded-xl border border-green-200 hover:bg-green-200 hover:shadow-lg transition cursor-pointer">
                <CheckCircle className="w-6 h-6 text-green-800 mb-2"/>
                <h3 className="font-semibold text-green-800 mb-1">{tip.title}</h3>
                <p className="text-green-700">{tip.desc}</p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
