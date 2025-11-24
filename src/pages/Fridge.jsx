import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config.js";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import toast from "react-hot-toast";

const Fridge = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "foods"));
        const foodList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFoods(foodList);
        setFilteredFoods(foodList);
        setLoading(false);
      } catch (err) {
        toast.error("Failed to fetch foods");
        console.log(err);
      }
    };
    fetchFoods();
  }, []);

  useEffect(() => {
    let filtered = foods;

    if (search) {
      filtered = filtered.filter(food =>
        food.title.toLowerCase().includes(search.toLowerCase()) ||
        food.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(food => food.category === category);
    }

    setFilteredFoods(filtered);
  }, [search, category, foods]);

  const isExpired = (expiryDate) => {
    const today = new Date();
    return new Date(expiryDate) < today;
  };

  const isNearExpiry = (expiryDate) => {
    const today = new Date();
    const exp = new Date(expiryDate);
    const diffDays = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 5;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-green-50">
      <h1 className="text-3xl font-bold text-green-900 mb-6">My Fridge</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search food items..."
          className="input input-bordered w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered w-full md:w-1/4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Dairy">Dairy</option>
          <option value="Meat">Meat</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Snacks">Snacks</option>
          <option value="Bakery">Bakery</option>
        </select>
      </div>

      <div className="flex gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex-1 text-center">
          <span className="block text-2xl font-bold text-green-700">
            <CountUp end={foods.filter(f => isNearExpiry(f.expiryDate)).length} duration={1} />
          </span>
          <span>Nearly Expiry</span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex-1 text-center">
          <span className="block text-2xl font-bold text-red-600">
            <CountUp end={foods.filter(f => isExpired(f.expiryDate)).length} duration={1} />
          </span>
          <span>Expired</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map((food) => (
          <div
            key={food.id}
            className={`card bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer`}
            onClick={() => navigate(`/food-details/${food.id}`)}
          >
            <div className="relative">
              <img src={food.image} alt={food.title} className="w-full h-48 object-cover" />
              {isExpired(food.expiryDate) && (
                <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-lg text-sm font-bold">
                  Expired
                </span>
              )}
              {isNearExpiry(food.expiryDate) && !isExpired(food.expiryDate) && (
                <span className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded-lg text-sm font-bold">
                  {Math.ceil((new Date(food.expiryDate) - new Date()) / (1000*60*60*24))} days left
                </span>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold">{food.title}</h2>
              <p className="text-green-700 font-semibold">{food.category}</p>
              <p className="text-gray-600">{food.quantity}</p>
              <button className="btn btn-sm mt-2 w-full bg-green-600 hover:bg-green-700 text-white">
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fridge;
