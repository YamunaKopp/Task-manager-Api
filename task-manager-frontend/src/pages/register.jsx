import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Registration failed. Please try again.");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
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
        <h2
          style={{
            fontWeight: "600",
            fontSize: "28px",
            color: "#333",
            marginBottom: "8px",
          }}
        >
          Create Account
        </h2>

        <p
          style={{
            marginBottom: "25px",
            fontSize: "14px",
            color: "#666",
          }}
        >
          Join us today!
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-column gap-3">
            <input
              type="text"
              style={{
                height: "48px",
                width: "90%",
                fontSize: "15px",
                borderRadius: "30px",
                padding: "10px 20px",
                backgroundColor: "#ffffff",
                border: "1px solid #ccc",
                outline: "none",
                boxShadow: "none",
              }}
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="off"
            />

            <input
              type="email"
              style={{
                height: "48px",
                width: "90%",
                fontSize: "15px",
                borderRadius: "30px",
                padding: "10px 20px",
                backgroundColor: "#ffffff",
                border: "1px solid #ccc",
                outline: "none",
                boxShadow: "none",
              }}
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
            />

            <input
              type="password"
              style={{
                height: "48px",
                width: "90%",
                fontSize: "15px",
                borderRadius: "30px",
                padding: "10px 20px",
                backgroundColor: "#ffffff",
                border: "1px solid #ccc",
                outline: "none",
                boxShadow: "none",
              }}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
            />

            <input
              type="password"
              style={{
                height: "48px",
                width: "90%",
                fontSize: "15px",
                borderRadius: "30px",
                padding: "10px 20px",
                backgroundColor: "#ffffff",
                border: "1px solid #ccc",
                outline: "none",
                boxShadow: "none",
              }}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            className="btn fw-bold mt-4"
            style={{
              width: "100%",
              borderRadius: "30px",
              padding: "12px",
              fontSize: "16px",
              backgroundColor: "#28a745",
              border: "none",
              color: "white",
            }}
          >
            ➕ Create Account
          </button>
        </form>

        <div className="mt-4">
          <small style={{ fontSize: "14px", color: "#666" }}>
            Already have an account?
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
            onClick={() => navigate("/login")}
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
