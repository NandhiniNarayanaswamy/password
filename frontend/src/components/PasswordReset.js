import { useState } from "react";

const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setMessage('');

        try {
            const res = await fetch("https://password-76zy.onrender.com/api/users/password-reset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            if (res.ok) {
                const data = await res.json();
                setMessage(data.message || "Password reset link has been sent to your email.");
                setEmail("");
            } else {
                const errorData = await res.json();
                setError(errorData.message || "Failed to send reset link. Please try again.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="bg-primary-subtle p-4 rounded">
            <form onSubmit={handleSubmit}>
                <h2 className="mb-4 text-primary text-center">Forgot Password</h2>

                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-warning w-100">Send Reset Link</button>
            </form>
        </div>
    );
};

export default PasswordReset;
