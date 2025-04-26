import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      // Save token to localStorage ✅
      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "40px 30px",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontWeight: "600", fontSize: "28px", color: "#333", marginBottom: "8px" }}>
          Login
        </h2>
        <p style={{ marginBottom: "25px", fontSize: "14px", color: "#666" }}>
          Access your account
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-column gap-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
              style={{
                height: "48px",
                borderRadius: "30px",
                padding: "10px 20px",
                backgroundColor: "#ffffff",
                border: "1px solid #ccc",
                outline: "none",
                fontSize: "15px",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
            />

            <input
              type="password"
              className="form-control"
              placeholder="Password"
              style={{
                height: "48px",
                borderRadius: "30px",
                padding: "10px 20px",
                backgroundColor: "#ffffff",
                border: "1px solid #ccc",
                outline: "none",
                fontSize: "15px",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
            />

            {/* Updated button width to 90% */}
            <button
              type="submit"
              className="btn fw-bold mt-3"
              style={{
                width: "90%",
                margin: "0 auto",
                borderRadius: "30px",
                padding: "12px",
                fontSize: "16px",
                backgroundColor: "#0d6efd",
                border: "none",
                color: "white",
              }}
            >
              🔒 Login
            </button>
          </div>
        </form>

        <div className="mt-4">
          <small style={{ fontSize: "14px", color: "#666" }}>
            Don't have an account?
          </small>
          <br />
          <button
            className="btn btn-link p-0 mt-1"
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              color: "#000",
              textDecoration: "none",
            }}
            onClick={() => navigate("/register")}
          >
            Create one
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
