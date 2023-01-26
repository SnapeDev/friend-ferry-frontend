import { Link } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const handleClick = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="container">
      <div className="title">
        <Link to="/">My Cool App</Link>
      </div>
      <nav>
        {user && <p>Hi Jack!</p>}
        {user ? (
          <button onClick={handleClick}>Log out</button>
        ) : (
          <div>
            <Link to="login">Login</Link>
            <Link to="signup">Signup</Link>
          </div>
        )}
      </nav>
    </div>
  );
}
