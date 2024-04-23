import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

const CoffeeDetails = () => {
  const coffee = useLoaderData();
  console.log(coffee);
  useEffect(() => {
    document.title = `Coffee Espersso | ${coffee.coffeeName}`;
  }, [coffee.coffeeName]);
  return <div>CoffeeDetails</div>;
};

export default CoffeeDetails;
