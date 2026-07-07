import { useEffect, useState } from "react";
import axios from "axios";
import API from "../config/api";
import { useClientAuth } from "../context/ClientAuthContext";
import ProjectCard from "./components/ProjectCard";
import "../styles/clientDashboard.css";

export default function ClientDashboard() {
  const { clientToken, clientUser } = useClientAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API}/client/projects`, {
          headers: { Authorization: `Bearer ${clientToken}` },
        });
        setProjects(res.data);
      } catch {
        setError("Failed to load projects. Please refresh.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [clientToken]);

  const clientName = clientUser?.name || clientUser?.companyName || "Client";
  const total = projects.length;
  const active = projects.filter((p) => p.status === "in_progress").length;
  const completed = projects.filter((p) => p.status === "completed").length;

  return (
    <div className="cd-page">
      {/* Welcome */}
      <div className="cd-welcome">
        <div>
          <h1 className="cd-welcome-heading">
            Welcome back, <span className="cd-company-name">{clientName}</span> 👋
          </h1>
          <p className="cd-welcome-sub">Here's an overview of all your ongoing and completed projects.</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="cd-stats-row">
        <div className="cd-stat-card">
          <span className="cd-stat-value">{loading ? "—" : total}</span>
          <span className="cd-stat-label">Total Projects</span>
        </div>
        <div className="cd-stat-card cd-stat-active">
          <span className="cd-stat-value">{loading ? "—" : active}</span>
          <span className="cd-stat-label">Active</span>
        </div>
        <div className="cd-stat-card cd-stat-done">
          <span className="cd-stat-value">{loading ? "—" : completed}</span>
          <span className="cd-stat-label">Completed</span>
        </div>
      </div>

      {/* Error */}
      {error && <div className="cd-error">{error}</div>}

      {/* Section header */}
      <div className="cd-section-header">
        <h2 className="cd-section-title">Your Projects</h2>
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div className="cd-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="cd-skeleton">
              <div className="cd-skel-badge" />
              <div className="cd-skel-title" />
              <div className="cd-skel-bar" />
              <div className="cd-skel-footer" />
            </div>
          ))}
        </div>
      )}

      {/* Projects grid */}
      {!loading && projects.length > 0 && (
        <div className="cd-grid">
          {projects.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && projects.length === 0 && !error && (
        <div className="cd-empty">
          <div className="cd-empty-icon">📂</div>
          <h3 className="cd-empty-title">No projects yet</h3>
          <p className="cd-empty-sub">Your projects will appear here once your team gets started.</p>
        </div>
      )}
    </div>
  );
}
