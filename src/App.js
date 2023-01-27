import { useState, useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ImageSlider from "./components/ImageSlider";
import { SliderData } from "./components/SliderData";

const verifyToken = () => {
  /* 
  this function should send the token state to your backend
  to a route that will:
  1. verify with the token (with jwt.verify())
  2. send the user back if the TOKEN is valid
  3. set a state with the content of the user
  4. set a state to reflect the user is logged in or our with true/false
  const [isAuth, setIsAuth] = useState(false)
  */
};

function App() {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    token && verifyToken();
    token && setIsAuth(true);
  }, [token]);

  // useEffect(() => {
  //   if (!token) {
  //     setUser(JSON.parse(localStorage.getItem("user")));
  //   }
  // }, [user]);

  const logout = () => {
    setIsAuth(false);
  };

  return (
    <div className="App">
      <Navbar user={user} isAuth={isAuth} setToken={setToken} logout={logout} />

      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route
          path="/login"
          element={
            !isAuth ? (
              <Login setIsAuth={setIsAuth} setToken={setToken} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuth ? <Signup setIsAuth={setIsAuth} /> : <Navigate to="/" />
          }
        />
        <Route
          path="auth"
          element={!isAuth ? <Navigate to="/signup" /> : <Outlet />}
        >
          <Route path="calendar" />
          <Route path="calendar" />
          <Route path="calendar" />
          <Route path="calendar" />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
