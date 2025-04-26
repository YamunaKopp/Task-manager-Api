import { useNavigate } from "react-router-dom";

function Navbar({ filter, setFilter }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      style={{
        width: "95%",
        backgroundColor: "#0d6efd",
        padding: "10px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* App Name */}
      <div
        onClick={() => navigate("/dashboard")}
        style={{
          fontWeight: "bold",
          fontSize: "22px",
          color: "#ffffff",
          cursor: "pointer",
        }}
      >
        📋 Task Manager
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "15px" }}>
        <button
          onClick={() => setFilter("all")} // ✅ Correctly calling setFilter
          className={`btn ${filter === "all" ? "btn-light" : "btn-outline-light"} btn-sm`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("pending")} // ✅ Correctly calling setFilter
          className={`btn ${filter === "pending" ? "btn-light" : "btn-outline-light"} btn-sm`}
        >
          Pending
        </button>

        <button
          onClick={() => setFilter("completed")} // ✅ Correctly calling setFilter
          className={`btn ${filter === "completed" ? "btn-light" : "btn-outline-light"} btn-sm`}
        >
          Completed
        </button>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="btn btn-danger btn-sm"
        style={{
          borderRadius: "20px",
          padding: "6px 20px",
          fontWeight: "600",
        }}
      >
        🚪 Logout
      </button>
    </nav>
  );
}

export default Navbar;
