import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddCoffee from "./components/AddCoffee.jsx";
import UpdateCoffee from "./components/UpdateCoffee.jsx";
import ErrorPage from "./components/ErrorElement.jsx";

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
    path: "/add-coffee",
    element: <AddCoffee />,
  },
  {
    path: "/update-coffee",
    element: <UpdateCoffee />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
