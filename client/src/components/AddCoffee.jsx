import { useRef } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
const AddCoffee = () => {
  const { register, handleSubmit } = useForm();
  const form = useRef(null);
  const onSubmit = (data) => {
    console.log(data);
    fetch("http://localhost:3000/add-coffee", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          Swal.fire({
            title: "Successfully Added!",
            text: "Coffee has been added",
            icon: "success",
          });
          form.current.reset();
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <Navbar />
      <div className="w-4/5 mx-auto">
        <h2 className="text-4xl mt-12 text-center">Add Coffee</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          ref={form}
        >
          {/* register your input into the hook by invoking the "register" function */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Coffee Name</span>
            </label>
            <input
              type="text"
              placeholder="Coffee Name"
              className="input input-bordered"
              required
              {...register("coffeeName")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Available Quantity</span>
            </label>
            <input
              type="text"
              placeholder="Available Quantity"
              className="input input-bordered"
              required
              {...register("availableQuantity")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Supplier Name</span>
            </label>
            <input
              type="text"
              placeholder="Supplier Name"
              className="input input-bordered"
              required
              {...register("supplierName")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Test</span>
            </label>
            <input
              type="text"
              placeholder="Test"
              className="input input-bordered"
              required
              {...register("test")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <input
              type="text"
              placeholder="Category"
              className="input input-bordered"
              required
              {...register("category")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Details</span>
            </label>
            <input
              type="text"
              placeholder="Details"
              className="input input-bordered"
              required
              {...register("details")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              placeholder="Photo URL"
              className="input input-bordered"
              required
              {...register("photoURL")}
            />
          </div>
          <div className="form-control mt-6">
            <input
              type="submit"
              className="btn btn-outline text-white"
              value={"Add Coffee"}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCoffee;
