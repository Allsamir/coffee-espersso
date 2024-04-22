import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Coffe House</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
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
            <Link to={`/update-coffee`} className="font-semibold">
              Update Coffee
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
