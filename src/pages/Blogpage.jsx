import React from "react";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const Blogpage = () => {
  // const user = JSON.parse(localStorage.getItem("user"));

  const posts = useSelector((state) => state.posts.posts);
  return (
    <div>
      <h3>Our news:</h3>
      {posts?.length > 0 &&
        posts?.map((item) => (
          <div key={item.id}>
            <h4>{item.text}</h4>
            <h6>{item.auth}</h6>
          </div>
        ))}

      <Link
        to="/posts/new"
        style={{ margin: "1rem 0", display: "inline-block" }}
      >
        Add new post
      </Link>
    </div>
  );
};

export { Blogpage };
