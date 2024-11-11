import { useState, useEffect } from 'react';
import authApi from '../api/authApi';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await authApi.verifyToken();
                    if (response.status === 'OK') {
                        setUser(response.data);
                        setIsAuthenticated(true);
                    }
                }
            } catch (error) {
                console.error('Lỗi xác thực:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (credentials) => {
        try {
            const response = await authApi.login(credentials);
            if (response.status === 'OK') {
                localStorage.setItem('token', response.data.token);
                setUser(response.data.user);
                setIsAuthenticated(true);
                return { success: true, data: response.data };
            }
            return { success: false, error: response.message };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    return { isAuthenticated, user, loading, login, logout };
};

export default useAuth;