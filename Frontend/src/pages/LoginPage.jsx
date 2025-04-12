import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import './LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!recaptchaToken) {
            setError("Please complete the reCAPTCHA.");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email: form.email,
                password: form.password,
                recaptcha_token: recaptchaToken
            });

            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('role', user.role);

            if (user.role === 'admin') {
                navigate('/admin');
            } else if (user.role === 'doctor') {
                navigate('/doctor');
            } else {
                navigate('/patient');
            }
        } catch (err) {
            console.error(err);
            setError('Login failed: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <ReCAPTCHA
                    sitekey="6LdiFRYrAAAAAEqXKTnpHWgwMeh4IAvtaFfjiY04"
                    onChange={(token) => setRecaptchaToken(token)}
                />

                <button type="submit">Login</button>

                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                <p style={{ textAlign: 'center', marginTop: '10px' }}>
                    Don’t have an account? <a href="/register">Register here</a>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
