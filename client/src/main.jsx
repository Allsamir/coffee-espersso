import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddCoffee from "./components/AddCoffee.jsx";
import UpdateCoffee from "./components/UpdateCoffee.jsx";
import ErrorPage from "./components/ErrorElement.jsx";
import CoffeeDetails from "./components/CoffeeDetails.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import AuthProvider from "./auth/AuthProvider.jsx";
import User from "./components/User.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => {
      try {
        const coffees = await fetch("http://localhost:3000/");
        const result = coffees.json();
        return result;
      } catch (err) {
        console.error(err);
      }
    },
    errorElement: <ErrorPage />,
  },
  {
    path: "/:coffeeID",
    element: <CoffeeDetails />,
    loader: async ({ params }) => {
      try {
        const coffee = await fetch(
          `http://localhost:3000/coffee/${params.coffeeID}`,
        );
        const result = coffee.json();
        return result;
      } catch (err) {
        console.error(err);
      }
    },
  },
  {
    path: "/add-coffee",
    element: <AddCoffee />,
  },
  {
    path: "/update-coffee/:coffeeID",
    element: <UpdateCoffee />,
    loader: async ({ params }) => {
      try {
        const coffees = await fetch(
          `http://localhost:3000/update-coffee/${params.coffeeID}`,
        );
        const result = coffees.json();
        return result;
      } catch (err) {
        console.error(err);
      }
    },
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/users",
    element: <User />,
    loader: () => fetch("http://localhost:3000/users"),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
