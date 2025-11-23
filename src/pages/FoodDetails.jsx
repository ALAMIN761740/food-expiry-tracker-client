import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-hot-toast";

export default function FoodDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [food, setFood] = useState(null);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await api.get(`/foods/${id}`);
        setFood(res.data);
        setNotes(res.data.notes || []);
      } catch {
        toast.error("Failed to load food details");
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, [id]);

  const handleAddNote = async () => {
    if (!note) return;
    try {
      const res = await api.post(`/foods/${id}/note`, {
        note,
        userEmail: user.email,
        postedDate: new Date().toISOString(),
      });
      setNotes([...notes, res.data]);
      setNote("");
      toast.success("Note added!");
    } catch {
      toast.error("Failed to add note");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!food) return <p className="text-center mt-10">Food not found</p>;

  const expiryCountdown = Math.max(
    0,
    new Date(food.expiryDate) - new Date()
  );

  const isOwner = food.userEmail === user.email;

  return (
    <div className="min-h-screen bg-sky-100 dark:bg-gray-900/80 p-4 md:p-10">
      <div className="max-w-3xl mx-auto bg-white/30 dark:bg-gray-900/30 backdrop-blur-md shadow-2xl rounded-2xl p-6 space-y-4">
        <img
          src={food.imageUrl || "/src/assets/default-food.jpg"}
          alt={food.title}
          className="w-full h-64 object-cover rounded-xl"
        />
        <h2 className="text-2xl font-bold text-sky-700 dark:text-white">{food.title}</h2>
        <p className="text-gray-700 dark:text-gray-300">Category: {food.category}</p>
        <p className="text-gray-700 dark:text-gray-300">Quantity: {food.quantity}</p>
        <p className="text-gray-700 dark:text-gray-300">Expires in: {Math.ceil(expiryCountdown / (1000*60*60*24))} days</p>
        <p className="text-gray-700 dark:text-gray-300">{food.description}</p>

        <div className="mt-4 space-y-2">
          <h3 className="text-lg font-semibold text-sky-700 dark:text-white">Notes:</h3>
          {notes.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-300">No notes yet</p>
          ) : (
            notes.map((n, i) => (
              <div key={i} className="p-2 bg-white/50 dark:bg-gray-800/50 rounded-md">
                <p>{n.note}</p>
                <span className="text-xs text-gray-500">{new Date(n.postedDate).toLocaleString()}</span>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="textarea textarea-bordered w-full bg-white/70 dark:bg-gray-800/70"
            placeholder="Add a note..."
            disabled={!isOwner}
          />
          <button
            onClick={handleAddNote}
            className="btn bg-sky-500 text-white hover:bg-sky-600"
            disabled={!isOwner}
          >
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
}
