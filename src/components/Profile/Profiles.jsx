import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AddProfile from './AddProfile';

const Profiles = () => {
    const { apiBearerToken } = useContext(AuthContext);
    const { user } = useContext(AuthContext);    
    const [profiles, setProfiles] = useState();

    useEffect(() => {
        populateProfileData();
    }, []);

  const handleProfileAdded = (profile) => {
    setProfiles([...profiles, profile]);
  };

    const profileContents = profiles === undefined
        ? <p><em>Loading...</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Artist Name</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
                {profiles.map(profile =>
                    <tr key={profile.id}>
                        <td>{profile.profileName}</td>
                        <td>{profile.profileTypeDescription}</td>
                    </tr>
                )}
            </tbody>
        </table>;


    return (
        <div>
            {profileContents}
            <AddProfile onProfileAdded={handleProfileAdded} />
        </div>
    );

    async function populateProfileData() {
        const response = await fetch(`/api/user/${user.id}/profiles`, {
            headers: {
                'Authorization': `Bearer ${apiBearerToken}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            setProfiles(data);
        }
    }
};

export default Profiles;