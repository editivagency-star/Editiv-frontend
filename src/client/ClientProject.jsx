import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft, FiDownload, FiExternalLink } from "react-icons/fi";
import API from "../config/api";
import { useClientAuth } from "../context/ClientAuthContext";
import "../styles/clientProject.css";

const STATUS_CONFIG = {
  not_started: { label: "Not Started", color: "#6b7280", bg: "rgba(107,114,128,0.15)" },
  in_progress:  { label: "In Progress",  color: "#3b82f6", bg: "rgba(59,130,246,0.15)" },
  review:       { label: "In Review",    color: "#f59e0b", bg: "rgba(245,158,11,0.15)" },
  completed:    { label: "Completed",    color: "#43da15", bg: "rgba(67,218,21,0.15)"  },
};

function getInitials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function getDaysRemaining(deadline) {
  if (!deadline) return null;
  const diff = Math.round((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
  return diff;
}

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function TaskIcon({ status }) {
  if (status === "done") return <span className="cp-task-icon cp-task-done">✅</span>;
  if (status === "in_progress") return <span className="cp-task-icon cp-task-inprog">🔵</span>;
  return <span className="cp-task-icon cp-task-pending">⬜</span>;
}

export default function ClientProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clientToken } = useClientAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${API}/client/projects/${id}`, {
          headers: { Authorization: `Bearer ${clientToken}` },
        });
        setProject(res.data);
      } catch {
        setError("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, clientToken]);

  if (loading) {
    return (
      <div className="cproj-loading">
        <span className="cproj-spinner" />
        <p>Loading project…</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="cproj-error">
        <span>⚠ {error || "Project not found."}</span>
        <button className="cproj-back-btn" onClick={() => navigate("/client/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  const statusCfg = STATUS_CONFIG[project.status] || STATUS_CONFIG.not_started;
  const daysLeft = getDaysRemaining(project.deadline);
  const tasksTotal = (project.tasks || []).length;
  const tasksDone = (project.tasks || []).filter((t) => t.status === "done").length;
  const tasksPct = tasksTotal > 0 ? Math.round((tasksDone / tasksTotal) * 100) : 0;

  return (
    <div className="cproj-page">
      {/* Header */}
      <div className="cproj-header-bar">
        <button className="cproj-back" onClick={() => navigate("/client/dashboard")}>
          <FiArrowLeft /> Back
        </button>
        <div className="cproj-header-title-row">
          <h1 className="cproj-title">{project.title}</h1>
          <span
            className="cproj-status-badge"
            style={{ color: statusCfg.color, background: statusCfg.bg, border: `1px solid ${statusCfg.color}40` }}
          >
            {statusCfg.label}
          </span>
        </div>
        {project.description && (
          <p className="cproj-description">{project.description}</p>
        )}
      </div>

      {/* Progress Section */}
      <section className="cproj-card cproj-progress-card">
        <div className="cproj-pct-display">
          <span className="cproj-pct-number">{project.progressPercent ?? 0}%</span>
          <span className="cproj-pct-label">Overall Progress</span>
        </div>

        <div className="cproj-progress-track">
          <div
            className="cproj-progress-fill"
            style={{ width: `${project.progressPercent ?? 0}%` }}
          />
        </div>

        <div className="cproj-dates-row">
          <div className="cproj-date-item">
            <span className="cproj-date-label">Start Date</span>
            <span className="cproj-date-value">{formatDate(project.startDate)}</span>
          </div>
          <div className="cproj-date-sep">→</div>
          <div className="cproj-date-item">
            <span className="cproj-date-label">Deadline</span>
            <span className="cproj-date-value">{formatDate(project.deadline)}</span>
          </div>
          {daysLeft !== null && (
            <div
              className={`cproj-days-pill ${daysLeft < 0 ? "cproj-days-overdue" : daysLeft <= 7 ? "cproj-days-urgent" : ""}`}
            >
              {daysLeft < 0
                ? `${Math.abs(daysLeft)} days overdue`
                : daysLeft === 0
                ? "Due today"
                : `${daysLeft} days remaining`}
            </div>
          )}
        </div>
      </section>

      {/* Team Section */}
      {project.teamMembers && project.teamMembers.length > 0 && (
        <section className="cproj-card">
          <h2 className="cproj-card-title">Team working on this</h2>
          <div className="cproj-team-chips">
            {project.teamMembers.map((m, i) => (
              <div key={i} className="cproj-member-chip">
                <div className="cproj-avatar">{getInitials(m.name)}</div>
                <div className="cproj-member-info">
                  <span className="cproj-member-name">{m.name}</span>
                  {m.role && <span className="cproj-member-role">{m.role}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Task Breakdown */}
      {project.tasks && project.tasks.length > 0 && (
        <section className="cproj-card">
          <div className="cproj-tasks-header">
            <h2 className="cproj-card-title">Task Breakdown</h2>
            <div className="cproj-task-stats">
              <span className="cproj-task-pct">{tasksPct}% done</span>
              <span className="cproj-task-count">{tasksDone}/{tasksTotal} tasks</span>
            </div>
          </div>

          <div className="cproj-task-prog-track">
            <div className="cproj-task-prog-fill" style={{ width: `${tasksPct}%` }} />
          </div>

          <div className="cproj-task-list">
            {project.tasks.map((task, i) => (
              <div key={i} className={`cproj-task-item ${task.status === "done" ? "cproj-task-completed" : ""}`}>
                <TaskIcon status={task.status} />
                <div className="cproj-task-info">
                  <span className="cproj-task-title">{task.title}</span>
                  <div className="cproj-task-meta">
                    {task.assignedTo && <span className="cproj-task-assignee">👤 {task.assignedTo}</span>}
                    {task.dueDate && <span className="cproj-task-due">📅 {formatDate(task.dueDate)}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Admin Notes */}
      {project.clientNotes && (
        <section className="cproj-card cproj-notes-card">
          <div className="cproj-notes-icon">💬</div>
          <div>
            <h2 className="cproj-notes-label">Message from EditIV team</h2>
            <p className="cproj-notes-text">{project.clientNotes}</p>
          </div>
        </section>
      )}

      {/* Deliverables */}
      {project.deliverables && project.deliverables.length > 0 && (
        <section className="cproj-card">
          <h2 className="cproj-card-title">Deliverables</h2>
          <div className="cproj-deliverables-list">
            {project.deliverables.map((d, i) => (
              <div key={i} className="cproj-deliverable-item">
                <div className="cproj-deliverable-info">
                  <span className="cproj-deliverable-label">{d.label}</span>
                  {d.sharedAt && (
                    <span className="cproj-deliverable-date">Shared {formatDate(d.sharedAt)}</span>
                  )}
                </div>
                <a
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cproj-deliverable-btn"
                >
                  <FiDownload />
                  <span>Download / View</span>
                  <FiExternalLink />
                </a>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
