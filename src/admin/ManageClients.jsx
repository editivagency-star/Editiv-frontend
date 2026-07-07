import { useEffect, useState } from "react";
import axios from "axios";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck } from "react-icons/fi";
import API from "../config/api";
import "../styles/manageClients.css";

const emptyForm = {
  name: "",
  companyName: "",
  email: "",
  phone: "",
  password: "",
};

export default function ManageClients() {
  const adminToken = localStorage.getItem("adminToken");
  const headers = { Authorization: `Bearer ${adminToken}` };

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal state
  const [modal, setModal] = useState(null); // null | 'create' | 'edit'
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // Delete state
  const [deleteId, setDeleteId] = useState(null);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/admin/clients`, { headers });
      setClients(res.data);
    } catch {
      setError("Failed to load clients.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchClients(); }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setFormError("");
    setEditId(null);
    setModal("create");
  };

  const openEdit = (client) => {
    setForm({
      name: client.name || "",
      companyName: client.companyName || "",
      email: client.email || "",
      phone: client.phone || "",
      password: "",
      isActive: client.isActive !== false,
    });
    setFormError("");
    setEditId(client._id);
    setModal("edit");
  };

  const closeModal = () => {
    setModal(null);
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError("");
    try {
      if (modal === "create") {
        await axios.post(`${API}/admin/clients`, form, { headers });
      } else {
        const payload = { ...form };
        if (!payload.password) delete payload.password;
        await axios.put(`${API}/admin/clients/${editId}`, payload, { headers });
      }
      closeModal();
      fetchClients();
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to save client.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/admin/clients/${id}`, { headers });
      setDeleteId(null);
      fetchClients();
    } catch {
      setError("Failed to delete client.");
    }
  };

  const toggleActive = async (client) => {
    try {
      await axios.put(
        `${API}/admin/clients/${client._id}`,
        { isActive: !client.isActive },
        { headers }
      );
      fetchClients();
    } catch {
      setError("Failed to update status.");
    }
  };

  return (
    <div className="mc-page">
      {/* Page header */}
      <div className="mc-page-header">
        <div>
          <h1 className="admin-page-title">Manage Clients</h1>
          <p className="admin-page-sub">Create, edit and manage client accounts and their portal access.</p>
        </div>
        <button className="mc-new-btn" id="new-client-btn" onClick={openCreate}>
          <FiPlus /> New Client
        </button>
      </div>

      {error && <div className="mc-error">{error}</div>}

      {/* Table */}
      <div className="mc-table-wrap">
        <table className="mc-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [1,2,3].map((i) => (
                <tr key={i} className="mc-skel-row">
                  {[1,2,3,4,5,6].map((j) => (
                    <td key={j}><div className="mc-skel" /></td>
                  ))}
                </tr>
              ))
            ) : clients.length === 0 ? (
              <tr>
                <td colSpan={6} className="mc-empty-cell">No clients found. Create your first one!</td>
              </tr>
            ) : (
              clients.map((c) => (
                <tr key={c._id}>
                  <td className="mc-name-cell">
                    <div className="mc-avatar">{(c.name || "?").charAt(0).toUpperCase()}</div>
                    <span>{c.name}</span>
                  </td>
                  <td>{c.companyName || "—"}</td>
                  <td className="mc-email-cell">{c.email}</td>
                  <td>{c.phone || "—"}</td>
                  <td>
                    <button
                      className={`mc-status-toggle ${c.isActive !== false ? "mc-active" : "mc-inactive"}`}
                      onClick={() => toggleActive(c)}
                      title="Toggle active status"
                    >
                      {c.isActive !== false ? <><FiCheck /> Active</> : "Inactive"}
                    </button>
                  </td>
                  <td>
                    <div className="mc-actions">
                      <button className="mc-action-btn mc-edit-btn" onClick={() => openEdit(c)} title="Edit">
                        <FiEdit2 />
                      </button>
                      <button
                        className="mc-action-btn mc-delete-btn"
                        onClick={() => setDeleteId(c._id)}
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Modal */}
      {modal && (
        <div className="mc-modal-overlay" onClick={closeModal}>
          <div className="mc-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mc-modal-header">
              <h2>{modal === "create" ? "New Client" : "Edit Client"}</h2>
              <button className="mc-modal-close" onClick={closeModal}><FiX /></button>
            </div>

            {formError && <div className="mc-form-error">{formError}</div>}

            <form className="mc-form" onSubmit={handleSubmit}>
              <div className="mc-form-row">
                <div className="mc-field-group">
                  <label>Full Name *</label>
                  <input
                    id="client-form-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="John Doe"
                  />
                </div>
                <div className="mc-field-group">
                  <label>Company Name</label>
                  <input
                    id="client-form-company"
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    placeholder="Acme Corp"
                  />
                </div>
              </div>

              <div className="mc-form-row">
                <div className="mc-field-group">
                  <label>Email *</label>
                  <input
                    id="client-form-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    placeholder="client@example.com"
                    disabled={modal === "edit"}
                  />
                </div>
                <div className="mc-field-group">
                  <label>Phone</label>
                  <input
                    id="client-form-phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 555 000 0000"
                  />
                </div>
              </div>

              <div className="mc-field-group">
                <label>{modal === "create" ? "Password *" : "New Password (leave blank to keep current)"}</label>
                <input
                  id="client-form-password"
                  type="text"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required={modal === "create"}
                  placeholder={modal === "create" ? "Set a password" : "Leave blank to keep current"}
                />
              </div>

              {modal === "edit" && (
                <div className="mc-field-group mc-toggle-group">
                  <label>Account Status</label>
                  <button
                    type="button"
                    className={`mc-toggle-btn ${form.isActive ? "mc-toggle-on" : "mc-toggle-off"}`}
                    onClick={() => setForm({ ...form, isActive: !form.isActive })}
                  >
                    <span className="mc-toggle-knob" />
                    <span className="mc-toggle-label">{form.isActive ? "Active" : "Inactive"}</span>
                  </button>
                </div>
              )}

              <div className="mc-form-actions">
                <button type="button" className="mc-cancel-btn" onClick={closeModal}>Cancel</button>
                <button type="submit" className="mc-submit-btn" disabled={saving} id="client-form-submit">
                  {saving ? <span className="mc-spinner" /> : modal === "create" ? "Create Client" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="mc-modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="mc-modal mc-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mc-confirm-icon">🗑️</div>
            <h3>Delete Client?</h3>
            <p>This action cannot be undone. All associated data may be affected.</p>
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
