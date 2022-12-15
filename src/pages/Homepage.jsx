import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Homepage = () => {
  const users = useSelector((state) => state.users.users);

  return (
    <div>
      <h2>List of users:</h2>

      {users?.length > 0 &&
        users?.map((item) => (
          <div key={item.id}>
            <h3>{item.fname}</h3>
          </div>
        ))}

      <Link to="/users" style={{ margin: "1rem 0", display: "inline-block" }}>
        Add new user
      </Link>
    </div>
  );
};

export { Homepage };
