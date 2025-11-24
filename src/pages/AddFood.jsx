import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase.config.js";

const AddFood = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [foodData, setFoodData] = useState({
    title: "",
    image: "",
    category: "",
    quantity: "",
    expiryDate: "",
    description: "",
  });

  const handleChange = (e) => {
    setFoodData({ ...foodData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foodData.title || !foodData.category || !foodData.expiryDate) {
      toast.error("Title, Category, and Expiry Date are required!");
      return;
    }

    try {
      await addDoc(collection(db, "foods"), {
        ...foodData,
        addedDate: serverTimestamp(),
        userEmail: auth.currentUser.email,
      });
      toast.success("Food added successfully!");
      navigate("/my-items");
    } catch (err) {
      toast.error("Failed to add food. Try again.");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-green-50">
      <h1 className="text-3xl font-bold text-green-900 mb-6">Add New Food</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Food Title"
          className="input input-bordered w-full"
          value={foodData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="input input-bordered w-full"
          value={foodData.image}
          onChange={handleChange}
        />
        <select
          name="category"
          className="select select-bordered w-full"
          value={foodData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Dairy">Dairy</option>
          <option value="Meat">Meat</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Snacks">Snacks</option>
        </select>
        <input
          type="text"
          name="quantity"
          placeholder="Quantity"
          className="input input-bordered w-full"
          value={foodData.quantity}
          onChange={handleChange}
        />
        <input
          type="date"
          name="expiryDate"
          className="input input-bordered w-full"
          value={foodData.expiryDate}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          value={foodData.description}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="btn bg-green-600 hover:bg-green-700 w-full text-white"
        >
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddFood;
