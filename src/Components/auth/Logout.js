import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Logout() {
    const { logout } = useAuth();

    const history = useHistory();

    async function handleLogout() {
        try {
            logout();
            history.push('/login');
        } catch {
            console.error("Couldn't logout!")
        }
    }

    return (
        <span onClick={handleLogout} className="text-white">Logout</span>
    )
}
