import { useLoaderData } from "react-router-dom";
import "./App.css";
import CoffeCard from "./components/CoffeCard";

function App() {
  const coffeeData = useLoaderData();
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-12">
        {coffeeData.map((coffee, index) => (
          <CoffeCard key={index} coffee={coffee} />
        ))}
      </div>
    </div>
  );
}

export default App;
