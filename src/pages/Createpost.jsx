import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 } from "uuid";

import { useDispatch } from "react-redux";
import { addPost } from "../redux/postSlice";

const Createpost = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const addPostHandler = (event) => {
    event.preventDefault();

    const post = { id: v4(), text: text, auth: user.user.email };
    dispatch(addPost(post));
    setText("");
    navigate("/posts");
  };

  return (
    <div>
      <h3>Create a post</h3>
      <form>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button type="submit" onClick={addPostHandler}>
          post
        </button>
      </form>
      <button onClick={() => signout(() => navigate("/", { replace: true }))}>
        Log Out
      </button>
    </div>
  );
};

export { Createpost };
