import React from "react";

export default function AddFood() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Food</h1>
      <form className="space-y-4">
        <input type="text" placeholder="Food Title" className="input input-bordered w-full" />
        <input type="text" placeholder="Category" className="input input-bordered w-full" />
        <input type="number" placeholder="Quantity" className="input input-bordered w-full" />
        <input type="date" placeholder="Expiry Date" className="input input-bordered w-full" />
        <textarea placeholder="Description" className="textarea textarea-bordered w-full"></textarea>
        <button className="btn btn-primary">Add Food</button>
      </form>
    </div>
  );
}
