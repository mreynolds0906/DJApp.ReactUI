import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [registrationToken, setRegistrationToken] = useState('');
    const [registered, setRegistered] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            setRegistrationToken(token);
        } else {
            setError('Invalid token');
        }
    }, []);


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const success = await register(email, password, firstName, lastName, registrationToken);
            if (success)
                setRegistered(true);
            else
                setError('Registration failed');
        }
        catch (error) {
            setError(error.message);
        }
    };

    const register = async (email, password, firstName, lastName, registrationToken) => {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Username: email, Password: password, FirstName: firstName, LastName: lastName, RegistrationToken: registrationToken }),
        });

        const data = await response.json();
        if (!data.success)
            throw new Error(data.errors);

        return true;
    };

    switch (registered) {
        case false:
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
                    <div>
                        <label>First Name:</label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <button type="submit">Register</button>
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}
                </form>
            );
            case true:
                return (
                    <div>
                        <p>Registration successful!</p>
                        <Link to="/login">Login</Link>
                    </div>
                );
    }
}

export default Registration;
