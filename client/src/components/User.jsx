import { useLoaderData } from "react-router-dom";

const User = () => {
  const userData = useLoaderData();
  console.log(userData);
  return <div>User</div>;
};

export default User;
