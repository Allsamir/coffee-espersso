import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const CoffeeDetails = () => {
  const coffee = useLoaderData();
  const navigate = useNavigate();
  console.log(coffee);
  useEffect(() => {
    document.title = `Coffee Espersso | ${coffee.coffeeName}`;
  }, [coffee.coffeeName]);
  return (
    <div className="lg:w-1/2 md:w-4/5 w-full px-4 mx-auto my-12">
      <div className="card bg-base-100 shadow-xl image-full">
        <figure>
          <img src={coffee.photoURL} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            <span>Name :</span>
            {coffee.coffeeName}
          </h2>
          <p>{coffee.details}</p>
          <div className="card-actions justify-end">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline text-white"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeDetails;
