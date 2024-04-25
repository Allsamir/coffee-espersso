import { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../auth/AuthProvider";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const form = useRef(null);
  const { logIn } = useContext(AuthContext);

  const onSubmit = (data) => {
    const { email, password } = data;
    logIn(email, password)
      .then((userCredential) => {
        // Signed up
        const email = userCredential.user.email;
        const lastSignInTime = userCredential.user.metadata.lastSignInTime;
        // Convert GMT time to local time
        const gmtDate = new Date(lastSignInTime);
        const lastSignIn = gmtDate.toLocaleString();
        const user = { email, lastSignIn };
        console.log(user);
        fetch(`http://localhost:3000/users`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.acknowledged) form.current.reset();
          })
          .catch((err) => console.error(err));
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
            <h1 className="text-3xl text-center mt-12">Login Now!!</h1>
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
                <button className="btn btn-primary">Login</button>
              </div>
              <p className="text-center text-base pt-4">
                Haven&apos;t register?{" "}
                <Link to={`/register`} className="text-blue-600">
                  Register Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
