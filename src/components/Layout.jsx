import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/posts">Blog</NavLink>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer className="container">2022</footer>
    </>
  );
};

export { Layout };
