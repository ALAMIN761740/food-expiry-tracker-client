import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-hot-toast";
import api from "../services/api";

export default function AddFood() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [foodData, setFoodData] = useState({
    title: "",
    category: "Dairy",
    quantity: 1,
    expiryDate: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFoodData({ ...foodData, image: files[0] });
    } else {
      setFoodData({ ...foodData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foodData.title || !foodData.expiryDate || !foodData.image) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", foodData.title);
      formData.append("category", foodData.category);
      formData.append("quantity", foodData.quantity);
      formData.append("expiryDate", foodData.expiryDate);
      formData.append("description", foodData.description);
      formData.append("addedDate", new Date().toISOString());
      formData.append("userEmail", user.email);
      formData.append("image", foodData.image);

      await api.post("/foods/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Food added successfully!");
      navigate("/my-items");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add food. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-sky-700/80 dark:bg-sky-900/80 flex justify-center items-start py-10 px-4 md:px-8 lg:px-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-md shadow-2xl rounded-2xl p-6 md:p-8 lg:p-10 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl space-y-5"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-sky-700 dark:text-white text-center">
          Add New Food
        </h2>

        <input
          type="text"
          name="title"
          value={foodData.title}
          onChange={handleChange}
          placeholder="Food Title"
          className="input input-bordered w-full bg-white/70 dark:bg-gray-800/70"
          required
        />

        <div className="flex flex-col md:flex-row gap-4">
          <select
            name="category"
            value={foodData.category}
            onChange={handleChange}
            className="select select-bordered w-full bg-white/70 dark:bg-gray-800/70"
          >
            <option>Dairy</option>
            <option>Meat</option>
            <option>Vegetables</option>
            <option>Snacks</option>
            <option>Fruits</option>
            <option>Other</option>
          </select>

          <input
            type="number"
            name="quantity"
            value={foodData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            min="1"
            className="input input-bordered w-full bg-white/70 dark:bg-gray-800/70"
            required
          />
        </div>

        <input
          type="date"
          name="expiryDate"
          value={foodData.expiryDate}
          onChange={handleChange}
          className="input input-bordered w-full bg-white/70 dark:bg-gray-800/70"
          required
        />

        <textarea
          name="description"
          value={foodData.description}
          onChange={handleChange}
          placeholder="Description"
          className="textarea textarea-bordered w-full bg-white/70 dark:bg-gray-800/70"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="file-input file-input-bordered w-full bg-white/70 dark:bg-gray-800/70"
          required
        />

        <button
          type="submit"
          className="btn w-full bg-sky-500 text-white hover:bg-sky-600 transition"
        >
          Add Food
        </button>
      </form>
    </div>
  );
}
