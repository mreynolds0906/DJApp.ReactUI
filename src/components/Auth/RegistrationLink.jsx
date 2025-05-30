import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const RegistrationLink = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [linkSent, setLinkSent] = useState(false);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const success = await sendRegistrationLink(email);

            setLinkSent(true);
        }
        catch (error) {
            setError('Error: ' + error.message);
        }
    };

    const sendRegistrationLink = async (email) => {
        const response = await fetch('/api/auth/registrationlink', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Email: email, RegistrationURL: `${window.location.origin}/registration` }),
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
                    <button type="submit">Send Registration Link</button>
                    <p>
                        <Link className="nav-link" to="/login">Login</Link>
                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}
                    </p>
                </form>
            );
        case true:
            return (
                // Link sent message
                <div>
                    <p>Check your email for a link to register.</p>
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

export default RegistrationLink;
