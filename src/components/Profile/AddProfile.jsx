import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

const AddProfile = ({ onProfileAdded }) => {
  const [error, setError] = useState('');
  const { user, apiBearerToken } = useContext(AuthContext);    
  const [profileName, setProfileName] = useState('');
  const [profileTypeID, setProfileTypeID] = useState(0);
  const [profileTypes, setProfileTypes] = useState([]);

  useEffect(() => {
    fetchProfileTypes();
  }, []);


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const profile = await addProfile();
            onProfileAdded(profile)
        }
        catch (error) {
            setError(error.message);
        }
    };

    const addProfile = async () => {
        const response = await fetch('/api/profile/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiBearerToken}` },
            body: JSON.stringify({ UserID: user.id, ProfileTypeID: profileTypeID, ProfileName: profileName }),
        });

        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        const data = await response.json();
        return data;
    };  

  const fetchProfileTypes = async () => {
      const response = await fetch('/api/profile/types', {
        headers: {
          'Authorization': `Bearer ${apiBearerToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setProfileTypes(data);
      }
    };
      

  return (
    <div>
      <h1>Add Artist</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Artist Name:</label>
          <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
        </div>
        <div>
          <label>Type:</label>
          <select value={profileTypeID} onChange={(e) => setProfileTypeID(parseInt(e.target.value))}>
            <option value="">Select a type</option>
            {profileTypes.map((type) => (
              <option key={type.id} value={type.id}>{type.description}</option>
            ))}
          </select>
          </div>
        <button type="submit">Add Profile</button>
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}
      </form>
    </div>
  );
};

export default AddProfile;