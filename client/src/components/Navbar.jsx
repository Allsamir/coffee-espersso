import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { useContext } from "react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Coffe House</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 items-center">
          <li className="font-bold">{user?.email}</li>
          <li>
            <NavLink to={`/`} className="font-semibold">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={`/add-coffee`} className="font-semibold">
              Add Coffee
            </NavLink>
          </li>
          <li>
            <NavLink to={`/users`} className="font-semibold">
              Users
            </NavLink>
          </li>
          <li>
            {user ? (
              <button
                className="btn btn-outline text-white ml-4"
                onClick={() => {
                  logOut()
                    .then(() => {
                      console.log("Successfully Logout");
                      navigate("/login");
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }}
              >
                Logout
              </button>
            ) : (
              <Link to={`/login`} className="font-semibold">
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
