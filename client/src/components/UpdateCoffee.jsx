import { useLoaderData } from "react-router-dom";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import { useRef } from "react";
import { useForm } from "react-hook-form";

const UpdateCoffee = () => {
  const coffee = useLoaderData();
  const { register, handleSubmit } = useForm();
  const form = useRef(null);
  const onSubmit = (data) => {
    fetch(`http://localhost:3000/update-coffee/${coffee._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          Swal.fire({
            title: "Successfully Coffee Updated",
            text: "Coffee has been updated",
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
      <div
        style={{ backgroundImage: `url(${coffee.photoURL})` }}
        className="bg-center bg-no-repeat bg-cover py-12"
      >
        <div
          className="w-4/5 mx-auto py-8 rounded-2xl"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        >
          <h2 className="text-4xl mt-12 text-center">
            Update Coffee: {coffee.coffeeName}
          </h2>
          <p className="py-4 text-xl text-center">
            Please Edit your information to Update
          </p>
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
                placeholder={coffee.coffeeName}
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
                placeholder={coffee.availableQuantity}
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
                placeholder={coffee.supplierName}
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
                placeholder={coffee.test}
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
                placeholder={coffee.category}
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
                placeholder={coffee.details}
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
                placeholder={coffee.photoURL}
                className="input input-bordered"
                required
                {...register("photoURL")}
              />
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                className="btn btn-outline text-white"
                value={`Update Coffee`}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateCoffee;
