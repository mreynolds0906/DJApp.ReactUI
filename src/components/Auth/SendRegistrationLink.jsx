import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SendRegistrationLink = ({ role, onRegistrationLinkSent }) => {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [selectedRole, setSelectedRole] = useState(role || '');
    const [linkSentToEmail, setLinkSentToEmail] = useState(null);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const success = await sendRegistrationLink();
            setSelectedRole('');
            setLinkSentToEmail(email);
            setEmail('');
            onRegistrationLinkSent(email);
        }
        catch (error) {
            setError('Error: ' + error.message);
        }
    };

    const sendRegistrationLink = async () => {
        const response = await fetch('/api/auth/registrationlink', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Email: email, Role: selectedRole, RegistrationURL: `${window.location.origin}/registration` }),
        });

        const data = await response.json();
        if (!data.success)
            throw new Error(data.message);

        return true;
    };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input type="email" placeholder="Enter an email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            {role ? (
                <div>                    
                </div>
            ) : (
                <div>
                    <label>Role:</label>
                    <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                        <option value="">Select a role</option>
                        <option value="Artist">Artist</option>
                        <option value="Agent">Agent</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
            )}
            <button type="submit">Send Registration Link</button>
      {linkSentToEmail ? (
        <p>Registration link sent to {linkSentToEmail}</p>
      ) : null}

        </form>
    );
};

export default SendRegistrationLink;
