import { useState } from "react";

export default function Signup({ setUser, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:8080/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, lastName, age, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }

    if (response.ok) {
      // localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      setIsLoading(false);
      setUser(data);
      setToken(data.token);
    }
  };

  return (
    <div className="signme">
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign up</h3>
        <label>Name </label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label>last name </label>
        <input
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
        <label>age </label>
        <input
          type="number"
          onChange={(e) => setAge(e.target.value)}
          value={age}
        />
        <label>email: </label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label>password: </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button>Sign up</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
