import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const AdminUsers = () => {
    const { apiBearerToken } = useContext(AuthContext);
    const { user } = useContext(AuthContext);    
    const [adminUsers, setAdminUsers] = useState();

    useEffect(() => {
        populateAdminUserData();
    }, []);

    const contents = adminUsers === undefined
        ? <p><em>Loading...</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>User Name</th>
                </tr>
            </thead>
            <tbody>
                {adminUsers.map(adminUser =>
                    <tr key={adminUser.id}>
                        <td>{adminUser.userName}</td>
                    </tr>
                )}
            </tbody>
        </table>;


    return (
        <div>
            {contents}
        </div>
    );

    async function populateAdminUserData() {
        const response = await fetch(`/api/customer/${user.customerID}/users`, {
            headers: {
                'Authorization': `Bearer ${apiBearerToken}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            setAdminUsers(data);
        }
    }
};

export default AdminUsers;