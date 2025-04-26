import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import AddTask from "./pages/addtask";

function App() {
  return (
    <Routes>
      {/* 🚀 Redirect root "/" to "/login" */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* 🚀 Main Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-task" element={<AddTask />} />
    </Routes>
  );
}

export default App;
