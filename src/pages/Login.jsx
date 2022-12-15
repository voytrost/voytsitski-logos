import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase.js";
import { AppRoutes } from "../Routes.js";

import { useAuth } from "../hook/useAuth";

const Login = () => {
  const location = useLocation();
  const { signin } = useAuth();
  const fromPage = location.state?.from?.pathname || "/";

  const [formValue, setFormValue] = useState({ email: "", password: "" });

  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        formValue.email,
        formValue.password
      );

      signin(user, () => navigate(fromPage, { replace: true }));

      localStorage.setItem("user", JSON.stringify(user));

      // setTimeout(() => {
      //   setSuccess((prevState) => !prevState);

      //   setFormValue({ email: "", password: "" });
      //   navigate(AppRoutes.SIGN_UP);
      // }, 3000);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const handleChange = (event, key) => {
    setFormValue({ ...formValue, [key]: event.target.value });
  };

  return (
    <div>
      <h3>Login</h3>
      {!success ? (
        <>
          <form>
            <label htmlFor="">email:</label>
            <input
              type="email"
              value={formValue.email}
              placeholder="Enter email:"
              onChange={(event) => handleChange(event, "email")}
            />
            <label htmlFor="">password:</label>
            <input
              type="password"
              value={formValue.password}
              placeholder="Enter password:"
              onChange={(event) => handleChange(event, "password")}
            />
          </form>
          <button onClick={handleSignIn} className="btnReg">
            Login
          </button>
        </>
      ) : (
        <h2>Success</h2>
      )}
    </div>
  );
};

export default Login;
