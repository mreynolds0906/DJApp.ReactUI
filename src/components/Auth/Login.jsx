import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login, sendPWResetLink } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const success = await login(email, password);
            if (success) {
                navigate('/dashboard');
            } else {
                setError('Invalid username or password');
            }
        }
        catch (error) {
            setError('Error logging in: ' + error.message);
        }
    };


    const handleRegistrationLink = async (e) => {
        try {
            e.preventDefault();
            const success = await sendRegistrationLink(email);

            setMode('registrationLinkSent');
        }
        catch (error) {
            setError('Error: ' + error.message);
        }
    };

    return (
        // Login form
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
            <p>
                <Link className="nav-link" to="/forgot-password">Forgot Password</Link>
                <Link className="nav-link" to="/registration-link">Register</Link>
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
            </p>
        </form>
    );
};

export default Login;
