import { useNavigate } from "react-router-dom";

export default function FoodCard({ food, expired }) {
  const navigate = useNavigate();

  return (
    <div className="card bg-base-100 shadow-md p-4">
      <img
        src={food.image}
        alt={food.title}
        className="rounded-md h-48 w-full object-cover mb-2"
      />
      <h3 className="text-lg font-semibold">{food.title}</h3>
      <p>Category: {food.category}</p>
      <p>Quantity: {food.quantity}</p>
      <p>Expiry Date: {new Date(food.expiryDate).toLocaleDateString()}</p>
      {expired && <span className="badge badge-error mt-2">Expired</span>}
      <button
        className="btn btn-sm btn-primary mt-2"
        onClick={() => navigate(`/food-details/${food._id}`)}
      >
        See Details
      </button>
    </div>
  );
}
