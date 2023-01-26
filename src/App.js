import { useState, useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";

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
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    token && verifyToken();
  }, [token]);

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [user]);

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route
          path="/"
          element={user ? <Home user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={
            !user ? (
              <Login setUser={setUser} setToken={setToken} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/signup"
          element={!user ? <Signup setUser={setUser} /> : <Navigate to="/" />}
        />
        <Route
          path="auth"
          element={!user ? <Navigate to="/signup" /> : <Outlet />}
        >
          <Route path="calendar" />
          <Route path="calendar" />
          <Route path="calendar" />
          <Route path="calendar" />
        </Route>
      </Routes>

      <Home />
    </div>
  );
}

export default App;
