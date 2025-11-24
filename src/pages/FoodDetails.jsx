import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";
import { db, auth } from "../../firebase.config.js";
import toast from "react-hot-toast";

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const docRef = doc(db, "foods", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFood(data);
          setIsOwner(auth.currentUser?.email === data.userEmail);

          // Fetch notes
          const notesQuery = query(
            collection(db, "notes"),
            where("foodId", "==", id),
            orderBy("createdAt", "desc")
          );
          const notesSnap = await getDocs(notesQuery);
          const notesList = notesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          setNotes(notesList);

          setLoading(false);

          // Countdown
          const updateCountdown = () => {
            const now = new Date();
            const exp = new Date(data.expiryDate);
            const diff = exp - now;
            if (diff <= 0) setCountdown("Expired");
            else {
              const days = Math.floor(diff / (1000*60*60*24));
              const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
              const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
              const seconds = Math.floor((diff % (1000*60)) / 1000);
              setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }
          };
          updateCountdown();
          const timer = setInterval(updateCountdown, 1000);
          return () => clearInterval(timer);
        }
      } catch (err) {
        toast.error("Failed to fetch food");
        console.log(err);
      }
    };
    fetchFood();
  }, [id]);

  const handleAddNote = async () => {
    if (!note) return toast.error("Note cannot be empty");
    try {
      await addDoc(collection(db, "notes"), {
        foodId: id,
        userEmail: auth.currentUser.email,
        text: note,
        createdAt: new Date()
      });
      setNotes([{ foodId: id, userEmail: auth.currentUser.email, text: note, createdAt: new Date() }, ...notes]);
      setNote("");
      toast.success("Note added");
    } catch (err) {
      toast.error("Failed to add note");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-green-50">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={food.image} alt={food.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2 text-green-900">{food.title}</h1>
          <p className="text-green-700 font-semibold mb-1">{food.category}</p>
          <p className="text-gray-600 mb-1">Quantity: {food.quantity}</p>
          <p className="text-gray-600 mb-3">Expires: {new Date(food.expiryDate).toLocaleDateString()}</p>
          <p className="text-gray-700 mb-3">{food.description}</p>
          <p className="font-semibold mb-4">Expiration Countdown: <span className="text-red-600">{countdown}</span></p>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Notes</h2>
            {notes.length === 0 && <p className="text-gray-500">No notes added yet.</p>}
            <div className="flex flex-col gap-2">
              {notes.map((n, idx) => (
                <div key={idx} className="p-3 bg-green-100 rounded-lg">
                  <p>{n.text}</p>
                  <p className="text-xs text-gray-500">By: {n.userEmail} on {n.createdAt.toDate ? n.createdAt.toDate().toLocaleString() : new Date(n.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <textarea
              placeholder="Add a note..."
              className="textarea textarea-bordered w-full"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={!isOwner}
            />
            <button
              className={`btn mt-2 w-full ${isOwner ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-400 cursor-not-allowed"}`}
              onClick={handleAddNote}
              disabled={!isOwner}
            >
              Add Note
            </button>
            {!isOwner && <p className="text-sm text-red-600 mt-1">You can only add notes to your own items.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
