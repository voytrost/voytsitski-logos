import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllUsers } from "../redux/usersSlice";

import { db, storage } from "../firebase.js";

import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router-dom";

import {
  collection,
  addDoc,
  deleteDoc,
  setDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const Users = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    fname: "",
    position: "",
    image: null,
    imageName: null,
  });

  const [editFormValues, setEditFormValues] = useState({
    fname: "",
    position: "",
    image: null,
    imageName: null,
  });

  const [editID, setEditID] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const collectionRef = collection(db, "users");

  const handleSubmit = (e) => {
    e.preventDefault();
    addInfo();
    setFormValues({ fname: "", position: "" });
  };

  const addInfo = async () => {
    try {
      const docRef = await addDoc(collectionRef, formValues);
      console.log(docRef);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser = async (userId) => {
    const docRef = doc(db, "users", userId);
    try {
      await deleteDoc(docRef);
    } catch (e) {
      console.log(e);
    }
  };

  const editUser = async (user) => {
    const docRef = doc(db, "users", user.id);
    try {
      await setDoc(docRef, {
        fname: user.fname,
        position: user.position,
        image: user.image,
        imageName: user.imageName,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getInfo = () => {
    onSnapshot(collectionRef, (snapshot) =>
      dispatch(
        getAllUsers({
          arr: snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        })
      )
    );
  };

  useEffect(() => {
    getInfo();
  }, []);

  const handleEdit = (user) => {
    if (user.id === editID) {
      editUser(editFormValues);
      setEditID("");
    } else {
      setEditID(user.id);
      setEditFormValues(user);
    }
  };

  const handleDeleteImage = (item) => {
    const imageRef = ref(storage, `/images/${item.imageName}`);
    deleteObject(imageRef)
      .then(() => {
        editUser({ ...item, imageName: null, image: null });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpload = (e) => {
    setIsDisabled((prevState) => !prevState);
    const storageRef = ref(storage, `/images/${e.target.files[0].name}`);
    const uploadData = uploadBytesResumable(storageRef, e.target.files[0]);
    uploadData.on(
      "state_changed",
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadData.snapshot.ref).then((url) => {
          setEditFormValues({
            ...editFormValues,
            image: url,
            imageName: e.target.files[0].name,
          });
          setIsDisabled((prevState) => !prevState);
        });
      }
    );
  };

  return (
    <>
      <button
        onClick={() => signout(() => navigate("/", { replace: true }))}
        className="btnReg"
        style={{ display: "inline" }}
      >
        Log Out
      </button>
      <h3>Type a user (CV):</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">User name:</label>
        <input
          type="text"
          placeholder="Enter user name"
          name="fname"
          value={formValues.fname}
          onChange={(e) =>
            setFormValues({ ...formValues, fname: e.target.value })
          }
        />
        <label htmlFor="">Position: </label>
        <input
          type="text"
          placeholder="Enter user position"
          name="position"
          value={formValues.position}
          onChange={(e) =>
            setFormValues({ ...formValues, position: e.target.value })
          }
        />
        <input type="submit" value="Submit" />
      </form>

      {users?.length > 0 &&
        users?.map((item) => (
          <div key={item.id} style={{ marginBottom: "30px" }}>
            {editID !== item.id ? (
              <>
                <h3 style={{ marginBottom: "20px" }}>
                  {item.fname} {""}
                  {item.position}
                </h3>

                {item?.image && (
                  <>
                    <img style={{ width: "200px" }} src={item.image} alt="" />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(item)}
                    >
                      Delete Image
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                <br />
                <input type="file" onChange={handleUpload} />
                <input
                  type="text"
                  value={editFormValues.fname}
                  onChange={(e) =>
                    setEditFormValues({
                      ...editFormValues,
                      fname: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  value={editFormValues.position}
                  onChange={(e) =>
                    setEditFormValues({
                      ...editFormValues,
                      position: e.target.value,
                    })
                  }
                />
              </>
            )}
            <button type="button" onClick={() => deleteUser(item.id)}>
              Delete user
            </button>
            <button
              type="button"
              disabled={editID === item.id && isDisabled}
              onClick={() => handleEdit(item)}
            >
              {editID !== item.id ? "Edit user" : "Save user"}
            </button>
          </div>
        ))}
    </>
  );
};

export default Users;
