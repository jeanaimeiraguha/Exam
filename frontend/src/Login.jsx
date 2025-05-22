import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.onpopstate = () => {
      window.history.go(1);
    };
    return () => {
      window.onpopstate = null;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const url = `http://localhost:3000/${isRegister ? "register" : "login"}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        if (isRegister) {
          setMessage("Account created successfully. Please login.");
          setIsRegister(false);
        } else {
          // ✅ Redirect to home
          navigate("/");
        }
      }
    } catch (err) {
      setError("Network error. Try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {isRegister ? "Register" : "Login"}
        </button>

        {message && <div className="alert alert-success mt-3">{message}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </form>

      <div className="text-center mt-3">
        {isRegister ? (
          <>
            Already have an account?{" "}
            <button className="btn btn-link" onClick={() => setIsRegister(false)}>
              Login
            </button>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <button className="btn btn-link" onClick={() => setIsRegister(true)}>
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
