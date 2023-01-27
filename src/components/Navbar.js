import { Link } from "react-router-dom";
import "./nav.css";

export default function Navbar({ user, isAuth, setToken, logout }) {
  const handleClick = () => {
    localStorage.removeItem("user");
    setToken(null);
    logout();
  };

  return (
    <div className="container">
      <nav>
        <div className="title">
          <Link to="/">friend ferry</Link>
        </div>
        <ul>
          {isAuth && (
            <li>
              <p>Hi Jack!</p>
            </li>
          )}
          {isAuth ? (
            <li>
              <button onClick={handleClick}>Log out</button>
            </li>
          ) : (
            <div>
              <li>
                <button>
                  <Link to="login">Login</Link>
                </button>
              </li>
              <li>
                <button>
                  <Link to="signup">Signup</Link>
                </button>
              </li>
              <li>
                <button>
                  <Link to="About">About</Link>
                </button>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
}
