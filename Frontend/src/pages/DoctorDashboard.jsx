import { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/';
        }
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/api/appointments', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const updateStatus = async (id) => {
        if (!newStatus) return;

        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://127.0.0.1:8000/api/appointments/${id}/status`, {
                status: newStatus
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setEditingId(null);
            setNewStatus('');
            fetchAppointments();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <div className="dashboard">
            <h1>Doctor Dashboard</h1>
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
            <table className="appointments-table">
                <thead>
                    <tr>
                        <th>Patient</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Update Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appt) => (
                        <tr key={appt.id}>
                            <td>{appt.patient?.name || 'Unknown'}</td>
                            <td>{appt.date}</td>
                            <td>{appt.time}</td>
                            <td>{appt.status}</td>
                            <td>
                                {editingId === appt.id ? (
                                    <>
                                        <select
                                            value={newStatus}
                                            onChange={(e) => setNewStatus(e.target.value)}
                                        >
                                            <option value="">Select</option>
                                            <option value="approved">Approved</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                        <button onClick={() => updateStatus(appt.id)}>Save</button>
                                    </>
                                ) : (
                                    <button onClick={() => setEditingId(appt.id)}>Update</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DoctorDashboard;
