import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [mode, setMode] = useState('login'); // 'login' ; 'forgotPassword' ; 'linkSent'
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

        const handleForgotPassword = () => {
            setMode('forgotPassword');
        };

        const handleResetPassword = async (e) => {
            try {
                e.preventDefault();
                const success = await sendPWResetLink(email);

                setMode('linkSent');
            }
            catch (error) {
                setError('Error: ' + error.message);
            }
        };

        switch (mode) {
            case 'login':
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
                            <a href="#" onClick={() => setMode('forgotPassword')}>
                                Forgot password?
                            </a>
                            {error && (
                                <div className="error-message">
                                    {error}
                                </div>
                            )}
                        </p>
                    </form>
                );
            case 'forgotPassword':
                return (
                    // Forgot password form
                    <form onSubmit={handleResetPassword}>
                        <div>
                            <label>Email:</label>
                            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <button type="submit">Reset Password</button>
                        <p>
                            <a href="#" onClick={() => setMode('login')}>
                                Back to login
                            </a>
                            {error && (
                                <div className="error-message">
                                    {error}
                                </div>
                            )}
                        </p>
                    </form>
                );
            case 'linkSent':
                return (
                    // Link sent message
                    <div>
                        <p>Check your email for a password reset link.</p>
                        <p>
                            <a href="#" onClick={() => setMode('login')}>
                                Back to login
                            </a>
                            {error && (
                                <div className="error-message">
                                    {error}
                                </div>
                            )}                    </p>
                    </div>
                );
            default:
                return <div>Invalid mode</div>;
        }
    };

    export default Login;
