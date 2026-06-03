import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://job-tracker-api-bupk.onrender.com/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);

      alert("Login successful");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        margin: "100px auto",
        gap: "10px",
      }}
    >
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Login
      </button>

      <p>
        Don't have an account?{" "}
        <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;