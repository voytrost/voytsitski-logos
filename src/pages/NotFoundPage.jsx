import { Link } from "react-router-dom";
import React from "react";

const NotFoundPage = () => {
  return (
    <div>
      This page doesn't exist. Go to
      <Link to="/">
        <b> Homepage</b>
      </Link>
    </div>
  );
};

export default NotFoundPage;
