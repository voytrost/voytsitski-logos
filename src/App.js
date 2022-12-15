import { Routes, Route } from "react-router-dom";
import { AppRoutes } from "./Routes";
import "./App.css";
import Users from "./components/Users";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import NotFoundPage from "./pages/NotFoundPage";

import { Layout } from "./components/Layout";
import { Homepage } from "./pages/Homepage";

import { AuthProvider } from "./hoc/AuthProvider";
import { LoginPage } from "./pages/Loginpage";
import { Blogpage } from "./pages/Blogpage";
import { Singlepage } from "./pages/Singlepage";
import { Createpost } from "./pages/Createpost";

import { RequireAuth } from "./hoc/RequireAuth";

function App() {
  const admin = JSON.parse(localStorage.getItem("user"));

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route
            path={AppRoutes.USERS}
            element={
              <RequireAuth>
                <Users />
              </RequireAuth>
            }
          />
          <Route path={AppRoutes.LOGIN} element={<Login />} />
          <Route path={AppRoutes.SIGN_UP} element={<SignUp />} />
          <Route path="*" element={<NotFoundPage />} />

          <Route path="loginpro" element={<LoginPage />} />
          <Route path="posts" element={<Blogpage />} />
          <Route path="posts/:id" element={<Singlepage />} />
          <Route
            path="posts/new"
            element={
              <RequireAuth>
                <Createpost />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
