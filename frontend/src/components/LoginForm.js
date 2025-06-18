import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginForm.css'; // Make sure this file exists

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setMessage('');

        try {
            const res = await fetch("https://password-76zy.onrender.com/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                setMessage("Login successful!");

                // Delay navigation to allow user to read the message
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1500); // 1.5 seconds delay
            } else {
                setError(data.error || "Invalid email or password");
            }
        } catch (err) {
            setError("Login failed. Please try again later.");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                {message && <div className="success">{message}</div>}
                {error && <div className="error">{error}</div>}

                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>

                <p className="small-text">
                    Forgot your password? <a href="/password-reset">Reset it</a>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;
