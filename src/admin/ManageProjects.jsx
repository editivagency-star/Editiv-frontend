import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  FiPlus, FiEdit2, FiTrash2, FiX, FiUpload, FiChevronDown,
} from "react-icons/fi";
import API from "../config/api";
import "../styles/manageProjects.css";

const STATUS_OPTIONS = [
  { value: "not_started", label: "Not Started" },
  { value: "in_progress",  label: "In Progress" },
  { value: "review",       label: "In Review"   },
  { value: "completed",    label: "Completed"   },
];

const TASK_STATUS_OPTIONS = [
  { value: "pending",     label: "Pending"     },
  { value: "in_progress", label: "In Progress" },
  { value: "done",        label: "Done"        },
];

const STATUS_CONFIG = {
  not_started: { label: "Not Started", color: "#6b7280" },
  in_progress:  { label: "In Progress",  color: "#3b82f6" },
  review:       { label: "In Review",    color: "#f59e0b" },
  completed:    { label: "Completed",    color: "#43da15" },
};

const emptyProject = {
  title: "",
  description: "",
  clientId: "",
  status: "not_started",
  progressPercent: 0,
  startDate: "",
  deadline: "",
  teamMembers: [],
  tasks: [],
  clientNotes: "",
};

const emptyMember = { name: "", role: "" };
const emptyTask   = { title: "", assignedTo: "", dueDate: "", status: "pending" };

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function ManageProjects() {
  const adminToken = localStorage.getItem("adminToken");
  const headers = { Authorization: `Bearer ${adminToken}` };

  const [projects, setProjects] = useState([]);
  const [clients,  setClients]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");

  // Modal states
  const [modal,    setModal]    = useState(null); // null | 'create' | 'edit'
  const [form,     setForm]     = useState(emptyProject);
  const [editId,   setEditId]   = useState(null);
  const [saving,   setSaving]   = useState(false);
  const [formErr,  setFormErr]  = useState("");

  // Delete
  const [deleteId, setDeleteId] = useState(null);

  // Deliverable upload
  const [delivLabel, setDelivLabel] = useState("");
  const [delivFile,  setDelivFile]  = useState(null);
  const [uploading,  setUploading]  = useState(false);
  const [uploadErr,  setUploadErr]  = useState("");
  const fileRef = useRef();

  const tasksTotal = (form.tasks || []).length;
  const tasksDone = (form.tasks || []).filter((t) => t.status === "done").length;
  const tasksPct = tasksTotal > 0 ? Math.round((tasksDone / tasksTotal) * 100) : 0;
  const assignedToOptions = (form.teamMembers || [])
    .map((m) => m.name ? m.name.trim() : "")
    .filter((name) => name !== "");

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [projRes, clientRes] = await Promise.all([
        axios.get(`${API}/admin/projects`, { headers }),
        axios.get(`${API}/admin/clients`,  { headers }),
      ]);
      setProjects(projRes.data);
      setClients(clientRes.data);
    } catch {
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  /* ---- helpers ---- */
  const addMember = () => setForm((f) => ({ ...f, teamMembers: [...f.teamMembers, { ...emptyMember }] }));
  const removeMember = (i) => setForm((f) => ({ ...f, teamMembers: f.teamMembers.filter((_, idx) => idx !== i) }));
  const updateMember = (i, key, val) =>
    setForm((f) => ({
      ...f,
      teamMembers: f.teamMembers.map((m, idx) => (idx === i ? { ...m, [key]: val } : m)),
    }));

  const addTask = () => setForm((f) => ({ ...f, tasks: [...f.tasks, { ...emptyTask }] }));
  const removeTask = (i) => setForm((f) => ({ ...f, tasks: f.tasks.filter((_, idx) => idx !== i) }));
  const updateTask = (i, key, val) =>
    setForm((f) => ({
      ...f,
      tasks: f.tasks.map((t, idx) => (idx === i ? { ...t, [key]: val } : t)),
    }));

  /* ---- open modals ---- */
  const openCreate = () => {
    setForm(emptyProject);
    setFormErr("");
    setEditId(null);
    setDelivLabel(""); setDelivFile(null); setUploadErr("");
    setModal("create");
  };

  const openEdit = (project) => {
    setForm({
      title:          project.title || "",
      description:    project.description || "",
      clientId:       project.client?._id || project.clientId || "",
      status:         project.status || "not_started",
      progressPercent: project.progressPercent ?? 0,
      startDate:      project.startDate ? project.startDate.slice(0, 10) : "",
      deadline:       project.deadline  ? project.deadline.slice(0, 10)  : "",
      teamMembers:    project.teamMembers || [],
      tasks:          (project.tasks || []).map((t) => ({
        ...t,
        dueDate: t.dueDate ? t.dueDate.slice(0, 10) : "",
      })),
      clientNotes:    project.clientNotes || "",
      deliverables:   project.deliverables || [],
    });
    setFormErr("");
    setEditId(project._id);
    setDelivLabel(""); setDelivFile(null); setUploadErr("");
    setModal("edit");
  };

  const closeModal = () => { setModal(null); setFormErr(""); };

  /* ---- submit ---- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormErr("");
    try {
      const payload = { 
        ...form,
        client: form.clientId,
      };
      if (!payload.startDate) delete payload.startDate;
      if (!payload.deadline)  delete payload.deadline;

      if (modal === "create") {
        await axios.post(`${API}/admin/projects`, payload, { headers });
      } else {
        await axios.put(`${API}/admin/projects/${editId}`, payload, { headers });
      }
      closeModal();
      fetchAll();
    } catch (err) {
      setFormErr(err.response?.data?.message || "Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  /* ---- delete ---- */
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/admin/projects/${id}`, { headers });
      setDeleteId(null);
      fetchAll();
    } catch {
      setError("Failed to delete project.");
    }
  };

  /* ---- upload deliverable ---- */
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!delivFile || !delivLabel) { setUploadErr("Label and file are required."); return; }
    setUploading(true);
    setUploadErr("");
    try {
      const fd = new FormData();
      fd.append("label", delivLabel);
      fd.append("file", delivFile);
      await axios.post(`${API}/admin/projects/${editId}/deliverable`, fd, {
        headers: { ...headers, "Content-Type": "multipart/form-data" },
      });
      setDelivLabel(""); setDelivFile(null);
      if (fileRef.current) fileRef.current.value = "";
      // Re-fetch to get updated deliverables
      const res = await axios.get(`${API}/admin/projects/${editId}`, { headers });
      setForm((f) => ({ ...f, deliverables: res.data.deliverables || [] }));
      fetchAll();
    } catch (err) {
      setUploadErr(err.response?.data?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const getClientName = (project) => {
    if (project.client) return project.client.companyName || project.client.name;
    const cl = clients.find((c) => c._id === project.clientId);
    return cl ? (cl.companyName || cl.name) : "—";
  };

  return (
    <div className="mp-page">
      {/* Page header */}
      <div className="mp-page-header">
        <div>
          <h1 className="admin-page-title">Manage Projects</h1>
          <p className="admin-page-sub">Create and manage client projects, tasks, and deliverables.</p>
        </div>
        <button className="mp-new-btn" id="new-project-btn" onClick={openCreate}>
          <FiPlus /> New Project
        </button>
      </div>

      {error && <div className="mp-error">{error}</div>}

      {/* Projects table/card list */}
      <div className="mp-table-wrap">
        <table className="mp-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Client</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [1,2,3].map((i) => (
                <tr key={i} className="mp-skel-row">
                  {[1,2,3,4,5,6].map((j) => <td key={j}><div className="mp-skel" /></td>)}
                </tr>
              ))
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={6} className="mp-empty-cell">No projects yet. Create your first one!</td>
              </tr>
            ) : (
              projects.map((p) => {
                const cfg = STATUS_CONFIG[p.status] || STATUS_CONFIG.not_started;
                return (
                  <tr key={p._id}>
                    <td className="mp-title-cell">{p.title}</td>
                    <td>{getClientName(p)}</td>
                    <td>
                      <span className="mp-status-badge" style={{ color: cfg.color, background: `${cfg.color}22`, border: `1px solid ${cfg.color}44` }}>
                        {cfg.label}
                      </span>
                    </td>
                    <td>
                      <div className="mp-prog-wrap">
                        <div className="mp-prog-track">
                          <div className="mp-prog-fill" style={{ width: `${p.progressPercent ?? 0}%`, background: cfg.color }} />
                        </div>
                        <span className="mp-prog-pct">{p.progressPercent ?? 0}%</span>
                      </div>
                    </td>
                    <td className="mp-date-cell">{formatDate(p.deadline)}</td>
                    <td>
                      <div className="mc-actions">
                        <button className="mc-action-btn mc-edit-btn" onClick={() => openEdit(p)} title="Edit"><FiEdit2 /></button>
                        <button className="mc-action-btn mc-delete-btn" onClick={() => setDeleteId(p._id)} title="Delete"><FiTrash2 /></button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Modal */}
      {modal && (
        <div className="mc-modal-overlay" onClick={closeModal}>
          <div className="mp-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mc-modal-header">
              <h2>{modal === "create" ? "New Project" : "Edit Project"}</h2>
              <button className="mc-modal-close" onClick={closeModal}><FiX /></button>
            </div>

            {formErr && <div className="mc-form-error">{formErr}</div>}

            <form className="mp-form" onSubmit={handleSubmit}>
              {/* Basic info */}
              <div className="mp-section-label">Basic Info</div>

              <div className="mc-field-group">
                <label>Project Title *</label>
                <input
                  id="proj-title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  placeholder="e.g. Brand Identity Redesign"
                />
              </div>

              <div className="mc-field-group">
                <label>Description</label>
                <textarea
                  id="proj-desc"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  placeholder="Project overview…"
                  className="mp-textarea"
                />
              </div>

              <div className="mc-form-row">
                <div className="mc-field-group">
                  <label>Client *</label>
                  <select
                    id="proj-client"
                    value={form.clientId}
                    onChange={(e) => setForm({ ...form, clientId: e.target.value })}
                    required
                  >
                    <option value="">— Select Client —</option>
                    {clients.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.companyName || c.name} ({c.email})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mc-field-group">
                  <label>Status</label>
                  <select
                    id="proj-status"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mc-form-row">
                <div className="mc-field-group">
                  <label>Start Date</label>
                  <input
                    id="proj-start"
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  />
                </div>
                <div className="mc-field-group">
                  <label>Deadline</label>
                  <input
                    id="proj-deadline"
                    type="date"
                    value={form.deadline}
                    onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  />
                </div>
              </div>

              <div className="mc-field-group">
                <label>Progress % (0–100)</label>
                <div className="mp-progress-input-wrap">
                  <input
                    id="proj-progress"
                    type="number"
                    min={0}
                    max={100}
                    value={form.progressPercent}
                    onChange={(e) => setForm({ ...form, progressPercent: Number(e.target.value) })}
                  />
                  <div className="mp-prog-preview">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={form.progressPercent}
                      onChange={(e) => setForm({ ...form, progressPercent: Number(e.target.value) })}
                      className="mp-slider"
                      style={{
                        background: `linear-gradient(to right, #43da15 0%, #43da15 ${form.progressPercent}%, var(--slider-track-bg, rgba(255,255,255,0.1)) ${form.progressPercent}%, var(--slider-track-bg, rgba(255,255,255,0.1)) 100%)`
                      }}
                    />
                    <span className="mp-prog-pct">{form.progressPercent}%</span>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div className="mp-section-label">
                Team Members
                <button type="button" className="mp-add-row-btn" onClick={addMember}><FiPlus /> Add</button>
              </div>

              {form.teamMembers.map((m, i) => (
                <div key={i} className="mp-dynamic-row">
                  <input
                    placeholder="Name"
                    value={m.name}
                    onChange={(e) => updateMember(i, "name", e.target.value)}
                  />
                  <input
                    placeholder="Role (e.g. Editor)"
                    value={m.role}
                    onChange={(e) => updateMember(i, "role", e.target.value)}
                  />
                  <button type="button" className="mp-remove-row-btn" onClick={() => removeMember(i)}><FiX /></button>
                </div>
              ))}

              {/* Tasks */}
              <div className="mp-section-label">
                Tasks
                {tasksTotal > 0 && (
                  <span className="mp-task-stat-badge">{tasksPct}% done ({tasksDone}/{tasksTotal})</span>
                )}
                <button type="button" className="mp-add-row-btn" onClick={addTask}><FiPlus /> Add</button>
              </div>

              {tasksTotal > 0 && (
                <div className="mp-modal-task-prog-track">
                  <div className="mp-modal-task-prog-fill" style={{ width: `${tasksPct}%` }} />
                </div>
              )}

              {form.tasks.map((t, i) => (
                <div key={i} className="mp-task-row">
                  <input
                    placeholder="Task title"
                    value={t.title}
                    onChange={(e) => updateTask(i, "title", e.target.value)}
                    className="mp-task-title-input"
                  />
                  <select
                    value={t.assignedTo || ""}
                    onChange={(e) => updateTask(i, "assignedTo", e.target.value)}
                  >
                    <option value="">— Assignee —</option>
                    {assignedToOptions.map((name, idx) => (
                      <option key={idx} value={name}>{name}</option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={t.dueDate}
                    onChange={(e) => updateTask(i, "dueDate", e.target.value)}
                  />
                  <select
                    value={t.status}
                    onChange={(e) => updateTask(i, "status", e.target.value)}
                  >
                    {TASK_STATUS_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                  <button type="button" className="mp-remove-row-btn" onClick={() => removeTask(i)}><FiX /></button>
                </div>
              ))}

              {/* Client Notes */}
              <div className="mp-section-label">Client Notes</div>
              <div className="mc-field-group">
                <label>Message to Client (optional)</label>
                <textarea
                  id="proj-notes"
                  value={form.clientNotes}
                  onChange={(e) => setForm({ ...form, clientNotes: e.target.value })}
                  rows={3}
                  placeholder="Any notes for the client…"
                  className="mp-textarea"
                />
              </div>

              <div className="mc-form-actions">
                <button type="button" className="mc-cancel-btn" onClick={closeModal}>Cancel</button>
                <button type="submit" className="mc-submit-btn" disabled={saving} id="proj-form-submit">
                  {saving ? <span className="mc-spinner" /> : modal === "create" ? "Create Project" : "Save Changes"}
                </button>
              </div>
            </form>

            {/* Deliverable upload (edit only) */}
            {modal === "edit" && (
              <div className="mp-deliverable-section">
                <div className="mp-section-label">Upload Deliverable</div>

                {uploadErr && <div className="mc-form-error">{uploadErr}</div>}

                {/* Existing deliverables */}
                {form.deliverables && form.deliverables.length > 0 && (
                  <div className="mp-existing-deliverables">
                    {form.deliverables.map((d, i) => (
                      <div key={i} className="mp-deliv-item">
                        <span className="mp-deliv-label">{d.label}</span>
                        <a href={d.url} target="_blank" rel="noopener noreferrer" className="mp-deliv-link">
                          View ↗
                        </a>
                      </div>
                    ))}
                  </div>
                )}

                <form className="mp-upload-form" onSubmit={handleUpload}>
                  <div className="mc-field-group">
                    <label>Deliverable Label</label>
                    <input
                      id="deliv-label"
                      value={delivLabel}
                      onChange={(e) => setDelivLabel(e.target.value)}
                      placeholder="e.g. Final Video v2"
                    />
                  </div>
                  <div className="mc-field-group">
                    <label>File</label>
                    <label className="mp-file-label" htmlFor="deliv-file">
                      <FiUpload />
                      <span>{delivFile ? delivFile.name : "Choose file…"}</span>
                      <input
                        id="deliv-file"
                        type="file"
                        ref={fileRef}
                        onChange={(e) => setDelivFile(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                  <button type="submit" className="mp-upload-btn" disabled={uploading}>
                    {uploading ? <span className="mc-spinner" /> : <><FiUpload /> Upload</>}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="mc-modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="mc-modal mc-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mc-confirm-icon">🗑️</div>
            <h3>Delete Project?</h3>
            <p>This will permanently remove this project and all its data.</p>
            <div className="mc-form-actions">
              <button className="mc-cancel-btn" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="mc-delete-confirm-btn" onClick={() => handleDelete(deleteId)}>
                <FiTrash2 /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
