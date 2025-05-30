import React, { useContext } from 'react';
import { AuthContext} from '../../context/AuthContext';

const Profile = () => {
    const { user } = useContext(AuthContext);
    return (
        <div>
            <h2>Profile</h2>
            <p>Name: {user.userName}</p>
            <p>ID: {user.id}</p>
        </div>
    );
};

export default Profile;