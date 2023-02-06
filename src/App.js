import { useState, useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Model from "./components/Model";
import BookModel from "./components/BookModel";
import Payment from "./components/Payment";
import Complete from "./components/Complete";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [user]);

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route
          path="/login"
          element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup setUser={setUser} /> : <Navigate to="/" />}
        />
        <Route
          path="auth"
          element={!user ? <Navigate to="/signup" /> : <Outlet />}
        />
        <Route path="/model/:id" element={<Model />} />
        <Route
          path="/model/:id/book-model"
          element={<BookModel user={user} />}
        />
        <Route path="/payment" element={<Payment />}>
          <Route path="complete" element={<Complete />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
