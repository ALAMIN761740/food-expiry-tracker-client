import axios from "axios";

const BASE_URL = "http://localhost:5000"; 

export const getFoods = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/foods`);
    return res.data;
  } catch (error) {
    console.error("Error fetching foods:", error);
    return [];
  }
};
