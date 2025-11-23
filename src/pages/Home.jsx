import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../services/api"; 
import FoodCard from "../components/FoodCard";
import { MdTimer } from "react-icons/md";

export default function Home() {
  const [nearlyExpiry, setNearlyExpiry] = useState([]);
  const [expired, setExpired] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/foods");
        const now = new Date();

        const nearly = res.data
          .filter(food => {
            const expiry = new Date(food.expiryDate);
            const diffDays = (expiry - now) / (1000 * 60 * 60 * 24);
            return diffDays >= 0 && diffDays <= 5;
          })
          .slice(0, 6);

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
    <motion.div
      className="p-6 md:p-10 space-y-16 min-h-screen bg-sky-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >

      {/* Banner */}
      <motion.div className="carousel w-full rounded-2xl shadow-2xl overflow-hidden">
        {["slide1.jpg", "slide2.jpg", "slide3.jpg"].map((img, i) => (
          <div key={i} className="carousel-item relative w-full">
            <img src={`/src/assets/${img}`} className="w-full" />
            <div className="absolute bottom-10 left-10 text-white text-3xl font-bold drop-shadow-lg">
              {i === 0 ? "Track Your Food Easily" : i === 1 ? "Never Miss Expiry Dates" : "Reduce Food Waste"}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Nearly Expiry */}
      <section className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-2xl shadow-md backdrop-blur-md">
        <h2 className="text-3xl font-bold mb-6 text-sky-700 flex items-center gap-2">
          <MdTimer className="text-3xl" /> Nearly Expiry Items
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nearlyExpiry.map(food => <FoodCard key={food._id} food={food} />)}
        </div>
      </section>

      {/* Expired */}
      <section className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-2xl shadow-md backdrop-blur-md">
        <h2 className="text-3xl font-bold mb-6 text-red-600 flex items-center gap-2">
          <MdTimer className="text-3xl" /> Expired Items
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expired.map(food => <FoodCard key={food._id} food={food} expired />)}
        </div>
      </section>

      {/* Extra Sections */}
      <section className="bg-green-100/50 dark:bg-green-900/30 p-8 rounded-2xl shadow-md backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-3">Tips to Reduce Food Waste</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Plan meals weekly</li>
          <li>Store food properly</li>
          <li>Use leftovers creatively</li>
        </ul>
      </section>

      <section className="bg-sky-100/50 dark:bg-sky-900/30 p-8 rounded-2xl shadow-md backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-3">Did You Know?</h2>
        <p className="text-gray-700">
          Nearly 1/3 of food produced globally is wasted. Tracking your fridge items helps reduce this significantly.
        </p>
      </section>
    </motion.div>
  );
}
