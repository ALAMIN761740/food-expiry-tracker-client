import React from "react";
import { useParams } from "react-router-dom";

export default function FoodDetails() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Food Details</h1>
      <p>Food ID: {id}</p>
      {/* এখানে তোমার detail fetch & display logic লিখবে */}
    </div>
  );
}
