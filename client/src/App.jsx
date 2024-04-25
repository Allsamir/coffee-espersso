import { useLoaderData } from "react-router-dom";
import "./App.css";
import CoffeCard from "./components/CoffeCard";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Navbar from "./components/Navbar";

function App() {
  const coffeeData = useLoaderData();
  const [coffees, setCoffees] = useState([]);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/coffee/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.acknowledged) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Coffee has been deleted.",
                icon: "success",
              });
              const newCoffeeData = coffees.filter(
                (coffee) => coffee._id !== id,
              );
              setCoffees([...newCoffeeData]);
            }
          })
          .catch((err) => console.error(err));
      }
    });
  };
  useEffect(() => {
    setCoffees([...coffeeData]);
  }, [coffeeData]);
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-12">
          {coffees.map((coffee, index) => (
            <CoffeCard
              key={index}
              coffee={coffee}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
