import { useState } from "react";
import { useNavigate } from "react-router-dom";

// const backendUrl = "https://friend-ferry.onrender.com/users/login";
const loginUrl = "https://friend-ferry.onrender.com/users/login";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    const response = await fetch(loginUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      // localStorage.setItem("token", data.token);
      setIsLoading(false);
      setUser(data);
      navigate("/");
    }
  };

  return (
    <div className="logme">
      <form className="login" onSubmit={handleSubmit}>
        <h1 className="logged">Log in</h1>
        <br />
        <label>Email: </label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label>Password: </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {/* <div className="logya"> */}
        {/* <button className="backlog" onClick={() => navigate(-1)}>
            Back
          </button> */}
        <div className="logya">
          <button className="logger" type="submit">
            Log in
          </button>
        </div>
        {/* </div> */}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
