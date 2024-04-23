import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { useContext } from "react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Coffe House</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 items-center">
          <li className="font-bold">{user?.email}</li>
          <li>
            <Link to={`/`} className="font-semibold">
              Home
            </Link>
          </li>
          <li>
            <Link to={`/add-coffee`} className="font-semibold">
              Add Coffee
            </Link>
          </li>
          <li>
            {user ? (
              <button
                className="btn btn-outline text-white"
                onClick={() => {
                  logOut()
                    .then(() => {
                      console.log("Successfully Logout");
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
