import { useState } from "react";

export default function Signup({ setUser }) {
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

    const response = await fetch(
      "https://friend-ferry.onrender.com/users/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, lastName, age, email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      setUser(data);
    }
  };

  return (
    <div className="signs">
      <form className="signup" onSubmit={handleSubmit}>
        <h1 className="join">Sign up </h1>
        <br />
        <label>Name: </label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <label>Last Name: </label>
        <input
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
        <br />
        <label>Age: </label>
        <input
          type="number"
          onChange={(e) => setAge(e.target.value)}
          value={age}
        />
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
        <div className="signya">
          <button className="up">Sign up</button>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
