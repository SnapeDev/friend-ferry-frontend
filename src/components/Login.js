import { useState } from "react";

export default function Login({ setUser, setToken, setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }

    // localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token);
    setIsLoading(false);
    // setUser(data);
    setToken(data.token);
    setIsAuth(true);
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

        <button className="logger" type="submit">
          Log in
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
