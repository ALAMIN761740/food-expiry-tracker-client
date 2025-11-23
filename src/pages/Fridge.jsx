import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Fridge() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await api.get("/foods");
        setFoods(res.data);
      } catch (err) {
        toast.error("Failed to fetch foods");
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-10 bg-sky-100 dark:bg-gray-900/80">
      <h2 className="text-2xl md:text-3xl font-bold text-sky-700 dark:text-white mb-6 text-center">
        All Foods in Fridge
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foods.map((food) => (
          <div
            key={food._id}
            className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-md shadow-2xl rounded-2xl flex flex-col overflow-hidden"
          >
            <img
              src={food.imageUrl || "/src/assets/default-food.jpg"}
              alt={food.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-sky-700 dark:text-white">
                {food.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mt-1">
                Category: {food.category}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Quantity: {food.quantity}
              </p>
              <p
                className={`mt-2 font-semibold text-sm ${
                  new Date(food.expiryDate) < new Date()
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {new Date(food.expiryDate) < new Date()
                  ? "Expired"
                  : "Valid"}
              </p>

              <button
                onClick={() => navigate(`/food/${food._id}`)}
                className="mt-auto btn btn-sm bg-sky-500 text-white hover:bg-sky-600 rounded-xl w-full"
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
