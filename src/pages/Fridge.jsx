import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import { AlertTriangle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Fridge() {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await api.get("/foods");
        setFoods(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFoods();
  }, []);

  return (
    <motion.div
      className="max-w-7xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h1 className="text-3xl font-bold mb-6">Your Fridge Items</h1>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => {
          const isExpired = new Date(food.expiryDate) < new Date();

          return (
            <motion.div
              key={food._id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg
               border border-blue-100 dark:border-gray-700 transition p-4 flex flex-col"
              whileHover={{ scale: 1.03 }}
            >
              {/* Food Image */}
              <img
                src={food.image}
                alt={food.title}
                className="h-40 w-full object-cover rounded-lg"
              />

              {/* Title + Category */}
              <div className="mt-4">
                <h2 className="text-xl font-semibold">{food.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Category: {food.category}
                </p>
              </div>

              {/* Quantity */}
              <p className="mt-2 text-gray-700 dark:text-gray-300 font-medium">
                Quantity: {food.quantity}
              </p>

              {/* Expired Badge */}
              {isExpired && (
                <span className="mt-2 inline-flex items-center gap-1 text-red-600 text-sm font-semibold bg-red-100 dark:bg-red-900 px-3 py-1 rounded-full w-fit">
                  <AlertTriangle size={16} /> Expired
                </span>
              )}

              {/* Expiry Date */}
              <p className="mt-1 flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm">
                <Clock size={14} /> Expiry: {food.expiryDate}
              </p>

              {/* See Details Button */}
              <button
                onClick={() => navigate(`/foods/${food._id}`)}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg 
                transition text-sm font-semibold"
              >
                See Details
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
