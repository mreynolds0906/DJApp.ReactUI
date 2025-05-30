import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SendRegistrationLink from './SendRegistrationLink';


const RegistrationLink = () => {
    const [email, setEmail] = useState('');
    const [linkSent, setLinkSent] = useState(false);

      const handleRegistrationLinkSent = (email) => {
        setEmail(email);
        setLinkSent(true);
  };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const success = await sendRegistrationLink();

            setLinkSent(true);
        }
        catch (error) {
            setError('Error: ' + error.message);
        }
    };

    switch (linkSent) {
        case false:
            return (
                <SendRegistrationLink role={'Artist'} onRegistrationLinkSent={handleRegistrationLinkSent} />
            );
        case true:
            return (
                // Link sent message
                <div>
                    <p>An email registration link has been sent to {email}</p>
                    <p>
                        <Link className="nav-link" to="/login">Login</Link>
                    </p>
                </div>
            );
    }
};

export default RegistrationLink;
