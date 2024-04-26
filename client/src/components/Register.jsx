import { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../auth/AuthProvider";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
const Register = () => {
  const { register, handleSubmit } = useForm();
  const form = useRef(null);
  const { createUser } = useContext(AuthContext);
  const onSubmit = (data) => {
    const { email, password } = data;
    createUser(email, password)
      .then((userCredential) => {
        // Signed up
        const creationTimeOfUser = userCredential.user.metadata.creationTime;
        const gmtDate = new Date(creationTimeOfUser);
        // Convert GMT time to local time
        const creationTime = gmtDate.toLocaleString();
        const userStoreInDB = { email, creationTime };
        fetch("https://server-espersso.vercel.app/user", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userStoreInDB),
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.acknowledged) {
              form.current.reset();
            }
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse w-full">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h1 className="text-3xl text-center mt-8">Register Now!</h1>
            <form
              ref={form}
              className="card-body"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  name="email"
                  {...register("email")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  name="password"
                  {...register("password")}
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
              <p className="text-center text-base pt-4">
                Already registerd?{" "}
                <Link to={`/login`} className="text-blue-600">
                  Login Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
