import { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ date: '', time: '', doctor_id: '' });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://127.0.0.1:8000/api/appointments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://127.0.0.1:8000/api/appointments', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({ date: '', time: '', doctor_id: '' });
      fetchAppointments();
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Patient Dashboard</h1>
      <button
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          window.location.href = '/';
        }}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          backgroundColor: '#ff4d4d',
          color: 'white',
          border: 'none',
          padding: '0.6rem 1rem',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Logout
      </button>
      <form className="appointment-form" onSubmit={handleCreate}>
        <h3>Create Appointment</h3>
        <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
        <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
        <input type="number" placeholder="Doctor ID" value={form.doctor_id} onChange={(e) => setForm({ ...form, doctor_id: e.target.value })} required />
        <button type="submit">Create</button>
      </form>

      <h3>Your Appointments</h3>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt.id}>
              <td>{appt.doctor?.name || 'Unassigned'}</td>
              <td>{appt.date}</td>
              <td>{appt.time}</td>
              <td>{appt.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientDashboard;
