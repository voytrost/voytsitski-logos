import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.js";
import { AppRoutes } from "../Routes.js";

const SignUp = () => {
  const [formValue, setFormValue] = useState({ email: "", password: "" });

  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        formValue.email,
        formValue.password
      );
      setTimeout(() => {
        setSuccess((prevState) => !prevState);
        setFormValue({ email: "", password: "" });
        navigate(AppRoutes.LOGIN);
      }, 3000);
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
      <h3>Sign Up</h3>
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
              placeholder="Enter password:"
              value={formValue.password}
              onChange={(event) => handleChange(event, "password")}
            />
          </form>

          <button onClick={handleSignUp} className="btnReg">
            sign up
          </button>
        </>
      ) : (
        <h2>Success</h2>
      )}
    </div>
  );
};

export default SignUp;
