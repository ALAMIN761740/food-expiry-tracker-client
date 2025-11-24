import React from "react";

const FoodCard = ({ image, title, category, quantity, expiryDate, isNearExpiry, isExpired }) => (
  <div className="border border-green-200 rounded-xl p-4 bg-green-50 shadow-sm hover:shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer">
    <img src={image} alt={title} className="w-full h-40 md:h-48 object-cover rounded-md mb-2" />
    <h3 className="font-bold text-lg">{title}</h3>
    <p className="text-green-700">{category} • {quantity}</p>
    <p className={`mt-1 font-semibold ${isNearExpiry ? "text-yellow-600" : isExpired ? "text-red-600" : "text-green-800"}`}>
      {isNearExpiry && "Expires Soon: "}{isExpired && "Expired: "}{expiryDate}
    </p>
  </div>
);

export default FoodCard;
