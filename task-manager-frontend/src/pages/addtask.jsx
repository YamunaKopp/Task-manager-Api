import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 2000); // Redirect after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formattedDate = dueDate;


      await API.post("/tasks", {
        title,
        description,
        dueDate: formattedDate,
      });

      setSuccess(true);
      setLoading(false);
    } catch (err) {
      console.error("❌ Failed to add task:", err);
      setError("Failed to add task. Please try again.");
      setLoading(false);
    }
  };

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
          maxWidth: "450px",
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
          ➕ Add New Task
        </h2>

        <p style={{ marginBottom: "25px", fontSize: "14px", color: "#666" }}>
          Create and manage your tasks
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        {success && (
          <div
            className="alert alert-success"
            style={{
              fontSize: "14px",
              padding: "10px",
              marginBottom: "20px",
              backgroundColor: "#d1e7dd",
              border: "1px solid #badbcc",
              borderRadius: "8px",
              color: "#0f5132",
            }}
          >
            🎉 Task Added Successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input
              type="text"
              className="form-control"
              style={{
                height: "48px",
                borderRadius: "30px",
                padding: "10px 20px",
                backgroundColor: "#ffffff",
                border: "1px solid #ccc",
                outline: "none",
                fontSize: "15px",
              }}
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoComplete="off"
            />

            <textarea
              className="form-control"
              rows="3"
              style={{
                borderRadius: "20px",
                padding: "15px 20px",
                backgroundColor: "#ffffff",
                border: "1px solid #ccc",
                outline: "none",
                fontSize: "15px",
              }}
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <input
              type="datetime-local"
              className="form-control"
              style={{
                height: "48px",
                borderRadius: "30px",
                padding: "10px 20px",
                backgroundColor: "#ffffff",
                border: "1px solid #ccc",
                outline: "none",
                fontSize: "15px",
              }}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />

            <button
              type="submit"
              className="btn fw-bold"
              style={{
                width: "100%",
                borderRadius: "30px",
                padding: "12px",
                fontSize: "16px",
                backgroundColor: "#0d6efd",
                border: "none",
                color: "white",
              }}
              disabled={loading}
            >
              {loading ? "Submitting..." : "➕ Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
