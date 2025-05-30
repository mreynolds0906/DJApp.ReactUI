import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [error, setError] = useState('');
    const [mode, setMode] = useState('reset'); // 'reset' ; 'done'

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            setResetToken(token);
        } else {
            setError('Invalid reset token');
        }
    }, []);


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const success = await resetPassword(email, password, resetToken);
            if (success)
                setMode('done');
            else
                setError('Invalid username or password');
        }
        catch (error) {
            setError(error.message);
        }
    };

    const resetPassword = async (email, password, resetToken) => {
        const response = await fetch('/api/auth/passwordreset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Email: email, NewPassword: password, ResetToken: resetToken }),
        });

        const data = await response.json();
        if (!data.success)
            throw new Error(data.errors);

        return true;
    };


    switch (mode) {
        case 'reset':
            return (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">Reset Password</button>
                    <p>
                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}
                    </p>
                </form>
            );
        case 'done':
            return (
                <div>
                    <p>Your password has been reset.</p>
                    <Link className="nav-link" to="/login">Login</Link>
                </div>
            );
    }
}

export default ResetPassword;
