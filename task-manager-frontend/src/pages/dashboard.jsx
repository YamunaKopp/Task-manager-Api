import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar"; // ✅ Import Navbar

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await API.get("/tasks");
      setTasks(response.data);
      checkDueSoon(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const checkDueSoon = (tasks) => {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

    const upcomingTasks = tasks.filter((task) => {
      if (!task.dueDate) return false;
      const dueDate = new Date(task.dueDate);
      return dueDate > now && dueDate <= oneHourLater;
    });

    if (upcomingTasks.length > 0) {
      upcomingTasks.forEach((task) => {
        toast.success(`🔔 Reminder: "${task.title}" due at ${new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, {
          duration: 5000,
          position: "bottom-right",
        });
      });
    }
  };

  const markAsCompleted = async (taskId) => {
    try {
      await API.put(`/tasks/${taskId}`, { completed: true });
      toast.success("✅ Task marked as completed!");

      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, completed: true } : task
        )
      );
    } catch (error) {
      console.error("Failed to mark task completed:", error);
      toast.error("❌ Failed to mark as completed");
    }
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task? 🗑️")) return;

    try {
      await API.delete(`/tasks/${taskId}`);
      toast.success("🗑️ Task deleted successfully!");

      setTasks(prevTasks =>
        prevTasks.filter(task => task.id !== taskId)
      );
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("❌ Failed to delete task");
    }
  };

  // 🚀 Corrected Filtering Logic
  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "pending") return task.completed === false;
    if (filter === "completed") return task.completed === true;
    return true;
  });

  // 🚀 Pagination Logic
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <Navbar filter={filter} setFilter={setFilter} />

      <div
        style={{
          minHeight: "calc(100vh - 70px)",
          backgroundColor: "#f0f2f5",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ fontWeight: "600", color: "#333" }}>📋 Task Dashboard</h2>
            <button
              className="btn btn-primary"
              style={{
                borderRadius: "30px",
                padding: "10px 20px",
                fontWeight: "600",
                fontSize: "16px",
                backgroundColor: "#0d6efd",
                border: "none",
              }}
              onClick={() => navigate("/add-task")}
            >
              ➕ Add Task
            </button>
          </div>

          {currentTasks.length === 0 ? (
            <p className="text-center text-muted">No tasks available for this filter.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                className="table"
                style={{
                  width: "100%",
                  backgroundColor: "#fff",
                  borderCollapse: "collapse",
                  textAlign: "center",
                  fontSize: "15px",
                  marginTop: "20px",
                }}
              >
                <thead style={{ backgroundColor: "#f8f9fa" }}>
                  <tr>
                    <th style={{ padding: "15px" }}>Title</th>
                    <th style={{ padding: "15px" }}>Description</th>
                    <th style={{ padding: "15px" }}>Due Date</th>
                    <th style={{ padding: "15px" }}>Status</th>
                    <th style={{ padding: "15px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTasks.map((task) => {
                    const now = new Date();
                    const dueDate = task.dueDate ? new Date(task.dueDate) : null;
                    const isOverdue = dueDate && dueDate < now && !task.completed;

                    return (
                      <tr
                        key={task.id}
                        style={{
                          borderBottom: "1px solid #eee",
                          transition: "background-color 0.3s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      >
                        <td style={{ padding: "15px" }}>{task.title}</td>
                        <td style={{ padding: "15px" }}>{task.description}</td>
                        <td style={{ padding: "15px" }}>
                          {task.dueDate
                            ? new Date(task.dueDate).toLocaleString()
                            : "Not Set"}
                        </td>
                        <td style={{ padding: "15px" }}>
                          {task.completed ? (
                            <span className="badge bg-success">✅ Completed</span>
                          ) : isOverdue ? (
                            <span className="badge bg-danger">⏰ Overdue</span>
                          ) : (
                            <span className="badge bg-warning text-dark">🕒 Pending</span>
                          )}
                        </td>
                        <td style={{ padding: "15px", display: "flex", justifyContent: "center", gap: "10px" }}>
                          {!task.completed && (
                            <button
                              className="btn btn-outline-success btn-sm"
                              style={{ borderRadius: "20px", fontSize: "13px" }}
                              onClick={() => markAsCompleted(task.id)}
                            >
                              ✅ Complete
                            </button>
                          )}
                          <button
                            className="btn btn-outline-danger btn-sm"
                            style={{ borderRadius: "20px", fontSize: "13px" }}
                            onClick={() => deleteTask(task.id)}
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          {filteredTasks.length > tasksPerPage && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                ⬅️ Previous
              </button>

              <span style={{ fontWeight: "600" }}>
                Page {currentPage} of {totalPages}
              </span>

              <button
                className="btn btn-outline-primary btn-sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next ➡️
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default Dashboard;
