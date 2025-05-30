import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [linkSent, setLinkSent] = useState(false);

    const handleSubmit = async (e) => {
        setError('');
        try {
            e.preventDefault();
            const success = await sendPWResetLink(email);

            setLinkSent(true);
        }
        catch (error) {
            setError('Error: ' + error.message);
        }
    };

    const sendPWResetLink = async (email) => {
        const response = await fetch('/api/auth/passwordresetlink', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Email: email, PasswordResetLinkURL: `${window.location.origin}/reset-password` }),
        });

        const data = await response.json();
        if (!data.success)
            throw new Error(data.message);

        return true;
    };

    switch (linkSent) {
        case false:
            return (
                // Forgot password form
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <button type="submit">Reset Password</button>
                    <p>
                        <Link className="nav-link" to="/login">Login</Link>
                    </p>
                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}
                </form>
            );
        case true:
            return (
                // Link sent message
                <div>
                    <p>Check your email for a password reset link.</p>
                    <p>
                        <Link className="nav-link" to="/login">Login</Link>
                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}                    </p>
                </div>
            );
    }
};

export default ForgotPassword;
