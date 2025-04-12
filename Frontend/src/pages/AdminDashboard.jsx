import { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    date: '',
    time: '',
    doctor_id: '',
    patient_id: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/';
    }
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [apptRes, docRes, patRes] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/all-appointments', config),
        axios.get('http://127.0.0.1:8000/api/doctors', config),
        axios.get('http://127.0.0.1:8000/api/patients', config)
      ]);

      setAppointments(apptRes.data);
      setDoctors(docRes.data);
      setPatients(patRes.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://127.0.0.1:8000/api/appointments', form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setForm({ date: '', time: '', doctor_id: '', patient_id: '' });
      fetchAll();
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
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
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          required
        />
        <select
          value={form.doctor_id}
          onChange={(e) => setForm({ ...form, doctor_id: e.target.value })}
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map(doc => (
            <option key={doc.id} value={doc.id}>{doc.name}</option>
          ))}
        </select>
        <select
          value={form.patient_id}
          onChange={(e) => setForm({ ...form, patient_id: e.target.value })}
          required
        >
          <option value="">Select Patient</option>
          {patients.map(pat => (
            <option key={pat.id} value={pat.id}>{pat.name}</option>
          ))}
        </select>
        <button type="submit">Create</button>
      </form>

      <h3>All Appointments</h3>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt.id}>
              <td>{appt.patient?.name || 'N/A'}</td>
              <td>{appt.doctor?.name || 'N/A'}</td>
              <td>{appt.date}</td>
              <td>{appt.time}</td>
              <td>{appt.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Doctors</h3>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doc => (
            <tr key={doc.id}>
              <td>{doc.name}</td>
              <td>{doc.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Patients</h3>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(pat => (
            <tr key={pat.id}>
              <td>{pat.name}</td>
              <td>{pat.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
