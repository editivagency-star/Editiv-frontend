import { useEffect, useState } from "react";
import axios from "axios";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiEye,
  FiPrinter,
  FiChevronDown,
  FiChevronUp,
  FiArrowLeft,
  FiFileText,
} from "react-icons/fi";
import API from "../config/api";
import "../styles/manageInvoices.css";

const defaultSender = {
  senderName: "Editiv Agency",
  senderAddress: "Ramnagar 05, Agartala (W) Tripura - 799002",
  senderContact: "+91 70854 19358",
  senderEmail: "editivagency@gmail.com",
};

const defaultNotes = `50% of the total service fee must be paid before the work starts.
One dedicated social media manager will handle and manage your social media accounts.
Regular monitoring and optimization of Meta (Facebook & Instagram) ad campaigns will be done.
The advertising budget is included in the quotation and must be paid in advance along with the initial payment.`;

const emptyItem = { qty: 1, description: "", duration: "1 month", price: 0, subtotal: 0 };

export default function ManageInvoices() {
  const adminToken = localStorage.getItem("adminToken");
  const headers = { Authorization: `Bearer ${adminToken}` };

  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Navigation / View State
  const [view, setView] = useState("list"); // 'list' | 'create' | 'edit' | 'preview'
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Form State
  const [form, setForm] = useState({
    invoiceNumber: "",
    type: "quote",
    date: "",
    client: "", // ID
    clientName: "",
    clientAddress: "",
    clientEmail: "",
    clientPhone: "",
    ...defaultSender,
    items: [ { ...emptyItem } ],
    subtotal: 0,
    tax: 0,
    grandTotal: 0,
    notes: defaultNotes,
  });

  const [showSenderConfig, setShowSenderConfig] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [deleteId, setDeleteId] = useState(null);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/admin/invoices`, { headers });
      setInvoices(res.data);
    } catch {
      setError("Failed to load invoices.");
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await axios.get(`${API}/admin/clients`, { headers });
      setClients(res.data);
    } catch {
      console.error("Failed to load clients list.");
    }
  };

  useEffect(() => {
    fetchInvoices();
    fetchClients();
  }, []);

  // Helper: Generate random 10 digit number
  const generateRandomNo = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  // Helper: format ISO date to input date YYYY-MM-DD
  const formatDateForInput = (d) => {
    if (!d) return "";
    const dateObj = new Date(d);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Helper: format display date
  const formatDisplayDate = (d) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleOpenCreate = () => {
    setForm({
      invoiceNumber: generateRandomNo(),
      type: "quote",
      date: formatDateForInput(new Date()),
      client: "",
      clientName: "",
      clientAddress: "",
      clientEmail: "",
      clientPhone: "",
      ...defaultSender,
      items: [ { ...emptyItem } ],
      subtotal: 0,
      tax: 0,
      grandTotal: 0,
      notes: defaultNotes,
    });
    setFormError("");
    setShowSenderConfig(false);
    setView("create");
  };

  const handleOpenEdit = (inv) => {
    setForm({
      _id: inv._id,
      invoiceNumber: inv.invoiceNumber,
      type: inv.type,
      date: formatDateForInput(inv.date),
      client: inv.client?._id || inv.client || "",
      clientName: inv.clientName,
      clientAddress: inv.clientAddress || "",
      clientEmail: inv.clientEmail || "",
      clientPhone: inv.clientPhone || "",
      senderName: inv.senderName || defaultSender.senderName,
      senderAddress: inv.senderAddress || defaultSender.senderAddress,
      senderContact: inv.senderContact || defaultSender.senderContact,
      senderEmail: inv.senderEmail || defaultSender.senderEmail,
      items: inv.items.map(it => ({ ...it })),
      subtotal: inv.subtotal,
      tax: inv.tax,
      grandTotal: inv.grandTotal,
      notes: inv.notes || defaultNotes,
    });
    setFormError("");
    setShowSenderConfig(false);
    setView("edit");
  };

  const handleOpenPreview = (inv) => {
    setSelectedInvoice(inv);
    setView("preview");
  };

  // Form Field Updates & Calculations
  const updateFormFields = (updates) => {
    setForm((prev) => {
      const merged = { ...prev, ...updates };

      // Re-calculate subtotals
      let subtotal = 0;
      merged.items = merged.items.map((item) => {
        const itemSubtotal = (Number(item.qty) || 0) * (Number(item.price) || 0);
        subtotal += itemSubtotal;
        return { ...item, subtotal: itemSubtotal };
      });

      merged.subtotal = subtotal;
      merged.grandTotal = subtotal + (Number(merged.tax) || 0);

      return merged;
    });
  };

  const handleClientSelect = (clientId) => {
    if (clientId === "") {
      updateFormFields({
        client: "",
        clientName: "",
        clientAddress: "",
        clientEmail: "",
        clientPhone: "",
      });
      return;
    }

    const selected = clients.find((c) => c._id === clientId);
    if (selected) {
      const companyPart = selected.companyName ? ` (${selected.companyName})` : "";
      updateFormFields({
        client: clientId,
        clientName: selected.name + companyPart,
        clientAddress: selected.companyName || "",
        clientEmail: selected.email || "",
        clientPhone: selected.phone || "",
      });
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...form.items];
    updatedItems[index][field] = value;
    updateFormFields({ items: updatedItems });
  };

  const handleAddItem = () => {
    updateFormFields({ items: [...form.items, { ...emptyItem }] });
  };

  const handleRemoveItem = (index) => {
    if (form.items.length === 1) return;
    const updatedItems = form.items.filter((_, i) => i !== index);
    updateFormFields({ items: updatedItems });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError("");

    // Minimal validation
    if (!form.invoiceNumber) {
      setFormError("Invoice/Quote number is required.");
      setSaving(false);
      return;
    }
    if (!form.clientName) {
      setFormError("Client Name is required.");
      setSaving(false);
      return;
    }
    if (!form.items.length || form.items.some(it => !it.description || Number(it.qty) <= 0)) {
      setFormError("All items must have a description and quantity greater than 0.");
      setSaving(false);
      return;
    }

    try {
      if (view === "create") {
        await axios.post(`${API}/admin/invoices`, form, { headers });
      } else {
        await axios.put(`${API}/admin/invoices/${form._id}`, form, { headers });
      }
      setView("list");
      fetchInvoices();
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to save invoice/quotation.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/admin/invoices/${id}`, { headers });
      setDeleteId(null);
      fetchInvoices();
    } catch {
      setError("Failed to delete invoice/quotation.");
    }
  };

  // Filter & Search Invoices
  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" ? true : inv.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="mi-page">
      {/* ── LIST VIEW ── */}
      {view === "list" && (
        <>
          <div className="mi-page-header">
            <div>
              <h1 className="admin-page-title">Invoices & Quotations</h1>
              <p className="admin-page-sub">Generate, view, and save quotes or invoices for your clients.</p>
            </div>
            <button className="mi-new-btn" onClick={handleOpenCreate}>
              <FiPlus /> New Bill / Quote
            </button>
          </div>

          {error && <div className="mc-error" style={{ marginBottom: "20px" }}>{error}</div>}

          <div className="mi-filters">
            <div className="mi-search-bar">
              <input
                type="text"
                placeholder="Search by bill number or client name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="mi-filter-tabs">
              <button
                className={`mi-filter-btn ${filterType === "all" ? "active" : ""}`}
                onClick={() => setFilterType("all")}
              >
                All
              </button>
              <button
                className={`mi-filter-btn ${filterType === "quote" ? "active" : ""}`}
                onClick={() => setFilterType("quote")}
              >
                Quotations
              </button>
              <button
                className={`mi-filter-btn ${filterType === "invoice" ? "active" : ""}`}
                onClick={() => setFilterType("invoice")}
              >
                Invoices
              </button>
            </div>
          </div>

          <div className="mi-table-wrap">
            <table className="mi-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Number</th>
                  <th>Client</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [1, 2, 3].map((i) => (
                    <tr key={i} className="mc-skel-row">
                      {[1, 2, 3, 4, 5, 6].map((j) => (
                        <td key={j}><div className="mc-skel" /></td>
                      ))}
                    </tr>
                  ))
                ) : filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="mi-empty">No invoices or quotations found.</td>
                  </tr>
                ) : (
                  filteredInvoices.map((inv) => (
                    <tr key={inv._id}>
                      <td>
                        <span className={`mi-badge ${inv.type}`}>
                          {inv.type}
                        </span>
                      </td>
                      <td>{formatDisplayDate(inv.date)}</td>
                      <td style={{ fontWeight: 600 }}>{inv.invoiceNumber}</td>
                      <td>{inv.clientName}</td>
                      <td style={{ fontWeight: 700 }}>₹ {(inv.grandTotal || 0).toLocaleString()}</td>
                      <td>
                        <div className="mi-actions">
                          <button
                            className="mi-action-btn"
                            onClick={() => handleOpenPreview(inv)}
                            title="Preview / Print"
                          >
                            <FiEye />
                          </button>
                          <button
                            className="mi-action-btn"
                            onClick={() => handleOpenEdit(inv)}
                            title="Edit"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            className="mi-action-btn delete-btn"
                            onClick={() => setDeleteId(inv._id)}
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
        </>
      )}

      {/* ── CREATE / EDIT FORM VIEW ── */}
      {(view === "create" || view === "edit") && (
        <div>
          <div className="mi-page-header">
            <button className="mi-btn-secondary" onClick={() => setView("list")} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FiArrowLeft /> Back to List
            </button>
            <h2 className="admin-page-title" style={{ margin: 0 }}>
              {view === "create" ? "Generate New Bill" : `Edit Bill #${form.invoiceNumber}`}
            </h2>
          </div>

          {formError && <div className="mc-form-error" style={{ marginBottom: "20px" }}>{formError}</div>}

          <form className="mi-form-card" onSubmit={handleSave}>
            {/* Sender Section */}
            <div className="mi-form-section">
              <button
                type="button"
                className="mi-sender-toggle"
                onClick={() => setShowSenderConfig(!showSenderConfig)}
              >
                Sender Information (Editiv Defaults) {showSenderConfig ? <FiChevronUp /> : <FiChevronDown />}
              </button>

              {showSenderConfig && (
                <div className="mi-grid-2">
                  <div className="mi-field-group">
                    <label>Sender Name</label>
                    <input
                      type="text"
                      value={form.senderName}
                      onChange={(e) => updateFormFields({ senderName: e.target.value })}
                    />
                  </div>
                  <div className="mi-field-group">
                    <label>Sender Contact No</label>
                    <input
                      type="text"
                      value={form.senderContact}
                      onChange={(e) => updateFormFields({ senderContact: e.target.value })}
                    />
                  </div>
                  <div className="mi-field-group">
                    <label>Sender Email</label>
                    <input
                      type="email"
                      value={form.senderEmail}
                      onChange={(e) => updateFormFields({ senderEmail: e.target.value })}
                    />
                  </div>
                  <div className="mi-field-group">
                    <label>Sender Address</label>
                    <input
                      type="text"
                      value={form.senderAddress}
                      onChange={(e) => updateFormFields({ senderAddress: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bill Details */}
            <div className="mi-form-section">
              <div className="mi-form-section-title">Bill Specifications</div>
              <div className="mi-grid-3">
                <div className="mi-field-group">
                  <label>Document Type *</label>
                  <select
                    value={form.type}
                    onChange={(e) => updateFormFields({ type: e.target.value })}
                  >
                    <option value="quote">Quotation</option>
                    <option value="invoice">Invoice</option>
                  </select>
                </div>
                <div className="mi-field-group">
                  <label>Document Number *</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      value={form.invoiceNumber}
                      onChange={(e) => updateFormFields({ invoiceNumber: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      className="mi-btn-secondary"
                      onClick={() => updateFormFields({ invoiceNumber: generateRandomNo() })}
                      title="Regenerate random number"
                      style={{ padding: "10px" }}
                    >
                      🎲
                    </button>
                  </div>
                </div>
                <div className="mi-field-group">
                  <label>Date *</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => updateFormFields({ date: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Client Info */}
            <div className="mi-form-section">
              <div className="mi-form-section-title">Recipient (Client)</div>
              <div className="mi-grid-2">
                <div className="mi-field-group">
                  <label>Select Registered Client (Autofill)</label>
                  <select
                    value={form.client}
                    onChange={(e) => handleClientSelect(e.target.value)}
                  >
                    <option value="">-- Custom Manual Client --</option>
                    {clients.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name} {c.companyName ? `(${c.companyName})` : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mi-field-group">
                  <label>Client Name *</label>
                  <input
                    type="text"
                    placeholder="Receiver Name"
                    value={form.clientName}
                    onChange={(e) => updateFormFields({ clientName: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="mi-field-group">
                <label>Client Address</label>
                <textarea
                  placeholder="Receiver Address..."
                  rows="2"
                  value={form.clientAddress}
                  onChange={(e) => updateFormFields({ clientAddress: e.target.value })}
                />
              </div>
              <div className="mi-grid-2">
                <div className="mi-field-group">
                  <label>Client Email</label>
                  <input
                    type="email"
                    placeholder="client@example.com"
                    value={form.clientEmail}
                    onChange={(e) => updateFormFields({ clientEmail: e.target.value })}
                  />
                </div>
                <div className="mi-field-group">
                  <label>Client Phone</label>
                  <input
                    type="text"
                    placeholder="Phone number"
                    value={form.clientPhone}
                    onChange={(e) => updateFormFields({ clientPhone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="mi-form-section">
              <div className="mi-form-section-title">Line Items</div>
              <table className="mi-items-table">
                <thead>
                  <tr>
                    <th style={{ width: "80px" }}>Qty</th>
                    <th>Description</th>
                    <th style={{ width: "150px" }}>Duration</th>
                    <th style={{ width: "150px" }}>Unit Price (₹)</th>
                    <th style={{ width: "150px" }}>Subtotal</th>
                    <th style={{ width: "60px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {form.items.map((item, index) => (
                    <tr key={index} className="mi-item-row">
                      <td>
                        <input
                          type="number"
                          value={item.qty}
                          min="1"
                          onChange={(e) => handleItemChange(index, "qty", parseInt(e.target.value) || 1)}
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          placeholder="e.g. Social Media Management"
                          value={item.description}
                          onChange={(e) => handleItemChange(index, "description", e.target.value)}
                          required
                        />
                      </td>
                      <td>
                        <select
                          value={item.duration}
                          onChange={(e) => handleItemChange(index, "duration", e.target.value)}
                        >
                          <option value="15 Days">15 Days</option>
                          <option value="1 month">1 month</option>
                          <option value="2 months">2 months</option>
                          <option value="3 months">3 months</option>
                          <option value="4 months">4 months</option>
                          <option value="5 months">5 months</option>
                          <option value="6 months">6 months</option>
                          <option value="7 months">7 months</option>
                          <option value="8 months">8 months</option>
                          <option value="9 months">9 months</option>
                          <option value="10 months">10 months</option>
                          <option value="11 months">11 months</option>
                          <option value="12 months">12 months</option>
                          <option value="1 week">1 week</option>
                          <option value="2 weeks">2 weeks</option>
                          <option value="3 weeks">3 weeks</option>
                          <option value="One-time">One-time</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.price === 0 ? "" : item.price}
                          placeholder="0"
                          min="0"
                          onChange={(e) => handleItemChange(index, "price", parseFloat(e.target.value) || 0)}
                          required
                        />
                      </td>
                      <td style={{ paddingLeft: "10px", fontWeight: "600" }}>
                        ₹ {(item.subtotal || 0).toLocaleString()}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="mi-action-btn delete-btn"
                          onClick={() => handleRemoveItem(index)}
                          disabled={form.items.length === 1}
                        >
                          <FiX />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button type="button" className="mi-add-item-btn" onClick={handleAddItem}>
                <FiPlus /> Add Item Line
              </button>
            </div>

            {/* Calculations & Notes */}
            <div className="mi-grid-2" style={{ alignItems: "start", marginTop: "24px" }}>
              <div className="mi-field-group">
                <label>Terms & Conditions / Notes</label>
                <textarea
                  rows="6"
                  value={form.notes}
                  onChange={(e) => updateFormFields({ notes: e.target.value })}
                />
              </div>

              <div className="mi-totals-box">
                <div className="mi-total-row">
                  <span>Subtotal:</span>
                  <strong>₹ {form.subtotal.toLocaleString()}</strong>
                </div>
                <div className="mi-total-row" style={{ alignItems: "center" }}>
                  <span>Tax / Additions (₹):</span>
                  <input
                    type="number"
                    className="mi-tax-input"
                    value={form.tax === 0 ? "" : form.tax}
                    placeholder="0"
                    min="0"
                    onChange={(e) => updateFormFields({ tax: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="mi-total-row">
                  <span>Grand Total:</span>
                  <strong>₹ {form.grandTotal.toLocaleString()}</strong>
                </div>
              </div>
            </div>

            <div className="mi-form-actions">
              <button type="button" className="mi-btn-secondary" onClick={() => setView("list")}>
                Cancel
              </button>
              <button type="submit" className="mi-new-btn" disabled={saving}>
                {saving ? "Saving..." : "Save Document"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── PREVIEW & PRINT SCREEN ── */}
      {view === "preview" && selectedInvoice && (
        <div>
          <div className="mi-preview-header-bar">
            <button className="mi-btn-secondary" onClick={() => setView("list")} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FiArrowLeft /> Back to List
            </button>
            <div className="mi-preview-actions">
              <button
                className="mi-btn-secondary"
                onClick={() => handleOpenEdit(selectedInvoice)}
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <FiEdit2 /> Edit
              </button>
              <button
                className="mi-new-btn"
                onClick={() => window.print()}
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <FiPrinter /> Print / Save PDF
              </button>
            </div>
          </div>

          <div className="mi-preview-outer-wrap">
            {/* THIS INNER CONTAINER REFLECTS THE ACTUAL PDF DOCUMENT LAYOUT */}
            <div className="invoice-print-container">
              <div className="ipc-inner">
                {/* Header row with Title and Logo */}
                <div className="ipc-header-row">
                  <div className="ipc-header-title">
                    <h1>
                      SOCIAL MEDIA
                      <span className="ipc-title-green">MARKETING</span>
                      <span className="ipc-title-dark">{selectedInvoice.type === "invoice" ? "INVOICE" : "PRICE QUOTE"}</span>
                    </h1>
                  </div>
                  <div className="ipc-header-meta">
                    <img src="/editiv light bg logo.png" alt="EDITIV" className="ipc-logo" />
                    <div className="ipc-meta-item">
                      <strong>{selectedInvoice.type === "invoice" ? "INVOICE NO." : "QUOTE NO."} :</strong> {selectedInvoice.invoiceNumber}
                    </div>
                    <div className="ipc-meta-item">
                      <strong>DATE :</strong> {formatDisplayDate(selectedInvoice.date)}
                    </div>
                  </div>
                </div>

                <hr className="ipc-divider" />

                {/* Receiver Section */}
                <div className="ipc-receiver-wrap">
                  <div className="ipc-section-bar">Receiver</div>
                  <div className="ipc-address-block">
                    <strong>Company :</strong> {selectedInvoice.clientName}<br />
                    <strong>Address :</strong> <span style={{ whiteSpace: "pre-line" }}>{selectedInvoice.clientAddress || "—"}</span><br />
                    {selectedInvoice.clientEmail && <><strong>Email :</strong> {selectedInvoice.clientEmail}<br /></>}
                    {selectedInvoice.clientPhone && <><strong>Phone :</strong> {selectedInvoice.clientPhone}<br /></>}
                  </div>
                </div>

                {/* Items Table */}
                <table className="ipc-table">
                  <thead>
                    <tr>
                      <th style={{ width: "10%" }}>Qty</th>
                      <th style={{ width: "50%" }}>Description</th>
                      <th style={{ width: "20%" }}>Duration</th>
                      <th style={{ width: "20%" }}>Pricing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.qty < 10 ? `0${item.qty}` : item.qty}</td>
                        <td>{item.description}</td>
                        <td>{item.duration || "—"}</td>
                        <td>{item.subtotal === 0 ? "" : `₹ ${item.subtotal.toLocaleString()}`}</td>
                      </tr>
                    ))}
                    {/* Add blank padding rows if table is short (optional, to match reference design height) */}
                    {selectedInvoice.items.length < 3 && 
                      Array.from({ length: 3 - selectedInvoice.items.length }).map((_, i) => (
                        <tr key={`blank-${i}`} style={{ height: "20px" }}>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>

                {/* Calculations Row */}
                <div className="ipc-calc-block">
                  <div className="ipc-calc-row">
                    <span>Subtotal</span>
                    <strong>₹ {(selectedInvoice.subtotal || 0).toLocaleString()}</strong>
                  </div>
                  <div className="ipc-calc-row">
                    <span>Tax</span>
                    <strong>₹ {(selectedInvoice.tax || 0).toLocaleString()}</strong>
                  </div>
                  <div className="ipc-calc-row grand-total">
                    <span>Grand Total</span>
                    <strong>₹ {(selectedInvoice.grandTotal || 0).toLocaleString()}</strong>
                  </div>
                </div>

                {/* Note / Terms section */}
                {selectedInvoice.notes && (
                  <div className="ipc-notes-box">
                    <div className="ipc-notes-title">NOTE **</div>
                    <ul className="ipc-notes-list">
                      {selectedInvoice.notes.split("\n").filter(line => line.trim() !== "").map((line, idx) => (
                        <li key={idx}>{line}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Sender Section */}
                <div className="ipc-sender-wrap">
                  <div className="ipc-section-bar">Sender</div>
                  <div className="ipc-address-block" style={{ marginBottom: 0 }}>
                    <strong>Company :</strong> {selectedInvoice.senderName || defaultSender.senderName}<br />
                    <strong>Address :</strong> {selectedInvoice.senderAddress || defaultSender.senderAddress}<br />
                    <strong>Contact No. :</strong> {selectedInvoice.senderContact || defaultSender.senderContact}<br />
                    <strong>Mail :</strong> {selectedInvoice.senderEmail || defaultSender.senderEmail}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deleteId && (
        <div className="mc-modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="mc-modal mc-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mc-confirm-icon">🗑️</div>
            <h3>Delete Document?</h3>
            <p>Are you sure you want to delete this invoice/quotation? This action cannot be undone.</p>
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
