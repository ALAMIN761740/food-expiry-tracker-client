import React from "react";

export default function Fridge() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Fridge</h1>
      <p>All your food items will be displayed here.</p>
      {/* এখানে তুমি server থেকে fetch করে cards দেখাবে */}
    </div>
  );
}
