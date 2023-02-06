import { Link } from "react-router-dom";
import "./nav.css";

export default function Navbar({ user, setUser }) {
  const handleClick = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="container">
      <nav>
        <div className="title">
          <Link to="/">friend ferry</Link>
        </div>
        <ul>
          {/* {user === null && (
    <li>
      <p>Hi Jack!</p>
    </li>
  )} */}
          {user !== null ? (
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
