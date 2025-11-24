import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function MyItems() {
  const { user } = useAuth();
  const [myFoods, setMyFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyFoods = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/foods/user/${user.email}`);
        setMyFoods(res.data);
      } catch {
        toast.error("Failed to fetch your items");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchMyFoods();
  }, [user]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-ring loading-xl"></span>
    </div>
  );

  return (
    <div className="min-h-screen bg-sky-100 p-4 md:p-10">
      <h2 className="text-2xl md:text-3xl font-bold text-sky-700 mb-6 text-center">My Items</h2>
      {myFoods.length === 0 ? (
        <p className="text-center text-gray-700">No items added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-white/30 backdrop-blur-md shadow-2xl rounded-2xl">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Expiry</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myFoods.map((food) => (
                <tr key={food._id}>
                  <td><img src={food.image || "/src/assets/default-food.jpg"} className="h-16 w-16 object-cover rounded" /></td>
                  <td>{food.title}</td>
                  <td>{food.category}</td>
                  <td>{food.quantity}</td>
                  <td className={new Date(food.expiryDate) < new Date() ? "text-red-600" : "text-green-600"}>
                    {new Date(food.expiryDate) < new Date() ? "Expired" : "Valid"}
                  </td>
                  <td className="flex gap-2">
                    <button className="btn btn-sm bg-yellow-400 text-white hover:bg-yellow-500">Update</button>
                    <button className="btn btn-sm bg-red-500 text-white hover:bg-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
