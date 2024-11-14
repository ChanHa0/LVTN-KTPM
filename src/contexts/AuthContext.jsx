import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async (id) => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get(`http://localhost:5000/api/user/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(response.data);
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin người dùng:', error);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const updateUser = async (id, userData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:5000/api/user/${id}`,
                userData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setUser(response.data);
            return { success: true };
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin:', error);
            return { success: false, error: error.response?.data?.message || 'Có lỗi xảy ra' };
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);