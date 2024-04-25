import { useLoaderData } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";

const User = () => {
  const userData = useLoaderData();
  const [users, setUsers] = useState(userData);
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          const remainUsers = users.filter((user) => user._id !== id);
          setUsers(remainUsers);
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <Navbar />
      <div className="overflow-x-auto lg:w-1/2 md:w-4/5 w-full mx-auto">
        <h2 className="text-center mt-12 text-4xl">Users from DB</h2>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th className="text-xl">Email</th>
              <th className="text-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => {
              return (
                <tr className="bg-base-200" key={index}>
                  <th>{index + 1}</th>
                  <th>{user.email}</th>
                  <th>
                    <button
                      className="btn btn-outline text-white"
                      onClick={() => handleDelete(user._id)}
                    >
                      X
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default User;
