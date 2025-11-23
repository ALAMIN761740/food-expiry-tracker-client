import React from "react";

export default function MyItems() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Items</h1>
      <p>All food items added by you will appear here in a table or card layout.</p>
      {/* এখানে তুমি user-specific fetch & display logic লিখবে */}
    </div>
  );
}
