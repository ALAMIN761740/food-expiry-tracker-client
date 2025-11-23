import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // Axios instance
import { toast } from "react-hot-toast";
import FoodCard from "../components/FoodCard";

export default function MyItems() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [myFoods, setMyFoods] = useState([]);

  useEffect(() => {
    const fetchMyFoods = async () => {
      try {
        const res = await api.get(`/foods/user/${user.email}`);
        setMyFoods(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load your items.");
      }
    };
    if (user) fetchMyFoods();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl">Please login to view your items.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-700/80 dark:bg-sky-900/80 p-4 md:p-8 lg:p-10">
      <h2 className="text-2xl md:text-3xl font-bold text-sky-700 dark:text-white text-center mb-8">
        My Food Items
      </h2>

      {myFoods.length === 0 ? (
        <p className="text-center text-gray-800 dark:text-gray-200">
          No items found. Add some food!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myFoods.map((food) => (
            <div
              key={food._id}
              className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden flex flex-col"
            >
              {/* Food Image */}
              <img
                src={food.imageUrl || "/src/assets/default-food.jpg"}
                alt={food.title}
                className="w-full h-48 object-cover"
              />

              {/* Food Details */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-sky-700 dark:text-white">
                  {food.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                  Category: {food.category}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
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

                {/* See Details Button */}
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
      )}
    </div>
  );
}
