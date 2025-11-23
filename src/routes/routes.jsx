import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Fridge from "../pages/Fridge";
import AddFood from "../pages/AddFood";
import MyItems from "../pages/MyItems";
import FoodDetails from "../pages/FoodDetails";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";

const allRoutes = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/fridge",
    element: <Fridge />
  },
  {
    path: "/add-food",
    element: <PrivateRoute><AddFood /></PrivateRoute>
  },
  {
    path: "/my-items",
    element: <PrivateRoute><MyItems /></PrivateRoute>
  },
  {
    path: "/food-details/:id",
    element: <FoodDetails />
  },
  {
    path: "*",
    element: <NotFound />
  }
];

export default allRoutes;
