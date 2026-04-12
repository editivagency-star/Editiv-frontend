import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/manageBookings.css";

import API from "../config/api";


export default function ManageBookings() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  // ================= FETCH BOOKINGS =================

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.get(`${API}/admin/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setBookings(res.data);

    } catch (err) {
      console.error("Fetch bookings error", err);
    }
  };

  // ================= DELETE =================

  const deleteBooking = async (id) => {

    if (!window.confirm("Delete this booking?")) return;

    const token = localStorage.getItem("adminToken");

    try {
      await axios.delete(`${API}/admin/booking/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setBookings(prev => prev.filter(b => b._id !== id));

    } catch (err) {
      alert("Delete failed");
    }
  };

  // ================= STATUS CYCLE =================

  const nextStatus = (current) => {
    if (current === "new") return "contacted";
    if (current === "contacted") return "closed";
    return "new";
  };

  const updateStatus = async (id, currentStatus) => {

    const token = localStorage.getItem("adminToken");
    const newStatus = nextStatus(currentStatus);

    try {
      const res = await axios.put(
        `${API}/admin/booking/${id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setBookings(prev =>
        prev.map(b =>
          b._id === id ? res.data : b
        )
      );

    } catch (err) {
      alert("Status update failed");
    }
  };

  // ================= UI =================

  return (
    <div className="admin-content">

      <h2>Bookings</h2>

      <div className="booking-table-wrapper">

        <table className="booking-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Submitted / Scheduled</th>
              <th>Message</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {bookings.map(b => (

              <tr key={b._id}>

                <td>{b.name}</td>
                <td>{b.email}</td>
                <td>{b.phone}</td>
                <td>
                  {b.datetime
                    ? new Date(b.datetime).toLocaleString()
                    : <span style={{ color: '#888', fontSize: '12px' }}>{new Date(b.createdAt).toLocaleString()}</span>
                  }
                </td>
                <td>{b.message}</td>

                <td>
                  <span
                    className={`status ${b.status}`}
                    onClick={() => updateStatus(b._id, b.status)}
                    style={{ cursor: "pointer" }}
                    title="Click to change status"
                  >
                    {b.status.toUpperCase()}
                  </span>
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteBooking(b._id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
