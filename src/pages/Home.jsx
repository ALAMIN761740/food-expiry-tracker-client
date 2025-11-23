import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../services/api"; // Axios instance
import FoodCard from "../components/FoodCard";

export default function Home() {
  const [nearlyExpiry, setNearlyExpiry] = useState([]);
  const [expired, setExpired] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/foods"); // fetch from backend
        const now = new Date();

        const nearly = res.data.filter(food => {
          const expiry = new Date(food.expiryDate);
          const diffDays = (expiry - now) / (1000*60*60*24);
          return diffDays >= 0 && diffDays <= 5;
        }).slice(0,6);

        const expiredItems = res.data.filter(food => new Date(food.expiryDate) < now);

        setNearlyExpiry(nearly);
        setExpired(expiredItems);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <motion.div className="p-6 space-y-12" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:1 }}>
      {/* Banner Section */}
      <motion.div className="carousel w-full rounded-lg shadow-lg" initial={{ y:-50 }} animate={{ y:0 }} transition={{ duration:0.8 }}>
        <div className="carousel-item relative w-full">
          <img src="/src/assets/slide1.jpg" className="w-full"/>
          <div className="absolute bottom-10 left-10 text-white text-3xl font-bold">Track Your Food Easily</div>
        </div>
        <div className="carousel-item relative w-full">
          <img src="/src/assets/slide2.jpg" className="w-full"/>
          <div className="absolute bottom-10 left-10 text-white text-3xl font-bold">Never Miss Expiry Dates</div>
        </div>
        <div className="carousel-item relative w-full">
          <img src="/src/assets/slide3.jpg" className="w-full"/>
          <div className="absolute bottom-10 left-10 text-white text-3xl font-bold">Reduce Food Waste</div>
        </div>
      </motion.div>

      {/* Nearly Expiry */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Nearly Expiry Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearlyExpiry.map(food => <FoodCard key={food._id} food={food}/>)}
        </div>
      </section>

      {/* Expired */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-red-600">Expired Foods</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expired.map(food => <FoodCard key={food._id} food={food} expired />)}
        </div>
      </section>

      {/* Extra Section 1 */}
      <section className="bg-green-100 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Tips to Reduce Food Waste</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Plan meals weekly</li>
          <li>Store food properly</li>
          <li>Use leftovers creatively</li>
        </ul>
      </section>

      {/* Extra Section 2 */}
      <section className="bg-blue-100 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Did You Know?</h2>
        <p className="text-gray-700">Nearly 1/3 of food produced globally is wasted. Tracking your fridge items helps reduce this significantly.</p>
      </section>
    </motion.div>
  );
}
