import React from "react";
const Dashboard = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Dashboard</h1>
      <p>
        Welcome to your admin dashboard. Here you can manage your portfolio
        website.
      </p>
      <nav style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <Link to="/admin/projects">Manage Projects</Link>
        <Link to="/admin/messages">View Messages</Link>
        <Link to="/admin/skills">Edit Skills</Link>
      </nav>
      {/* Add dashboard widgets or navigation here */}
    </div>
  );
};

export default Dashboard;
src / admin / Dashboard.jsx;
