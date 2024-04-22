import PropTypes from "prop-types";

const CoffeCard = ({ coffee, handleDelete }) => {
  return (
    <div className="card bg-base-100 shadow-xl image-full">
      <figure>
        <img src={coffee.photoURL} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{coffee.coffeeName}</h2>
        <p>{coffee.details}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-outline text-white">View</button>
          <button className="btn btn-outline text-white">Edit</button>
          <button
            className="btn btn-outline text-white"
            onClick={() => {
              handleDelete(coffee._id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

CoffeCard.propTypes = {
  coffee: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default CoffeCard;
