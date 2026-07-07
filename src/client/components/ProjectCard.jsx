import { useNavigate } from "react-router-dom";

const STATUS_CONFIG = {
  not_started: { label: "Not Started", color: "#6b7280", bg: "rgba(107,114,128,0.15)" },
  in_progress:  { label: "In Progress",  color: "#3b82f6", bg: "rgba(59,130,246,0.15)" },
  review:       { label: "In Review",    color: "#f59e0b", bg: "rgba(245,158,11,0.15)" },
  completed:    { label: "Completed",    color: "#43da15", bg: "rgba(67,218,21,0.15)"  },
};

function getDaysInfo(deadline) {
  if (!deadline) return null;
  const now = new Date();
  const end = new Date(deadline);
  const diff = Math.round((end - now) / (1000 * 60 * 60 * 24));
  return diff;
}

export default function ProjectCard({ project }) {
  const navigate = useNavigate();
  const {
    _id,
    title,
    status,
    progressPercent = 0,
    deadline,
    teamMembers = [],
  } = project;

  const statusCfg = STATUS_CONFIG[status] || STATUS_CONFIG.not_started;
  const days = getDaysInfo(deadline);
  const isOverdue = days !== null && days < 0;

  return (
    <article
      className="pc-card"
      onClick={() => navigate(`/client/project/${_id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/client/project/${_id}`)}
      aria-label={`View project: ${title}`}
    >
      {/* Status badge */}
      <div className="pc-top">
        <span
          className="pc-status-badge"
          style={{ color: statusCfg.color, background: statusCfg.bg, border: `1px solid ${statusCfg.color}40` }}
        >
          {statusCfg.label}
        </span>
        {days !== null && (
          <span className={`pc-days-chip ${isOverdue ? "pc-days-overdue" : ""}`}>
            {isOverdue ? `${Math.abs(days)}d overdue` : days === 0 ? "Due today" : `${days}d left`}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="pc-title">{title}</h3>

      {/* Progress */}
      <div className="pc-progress-section">
        <div className="pc-progress-header">
          <span className="pc-progress-label">Progress</span>
          <span className="pc-progress-pct">{progressPercent}%</span>
        </div>
        <div className="pc-progress-track">
          <div
            className="pc-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="pc-footer">
        <span className="pc-members">
          👥 {teamMembers.length} {teamMembers.length === 1 ? "member" : "members"} working
        </span>
        <span className="pc-view-arrow">→</span>
      </div>
    </article>
  );
}
