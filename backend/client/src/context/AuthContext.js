import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { authReducer } from '../reducers/authReducer';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        loading: true,
        error: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load user
    useEffect(() => {
        if (state.token) {
            loadUser();
        }
    }, [state.token]);

    const loadUser = async () => {
        try {
            const res = await axios.get('/api/auth/me');
            dispatch({ type: 'USER_LOADED', payload: res.data });
        } catch (err) {
            dispatch({ type: 'AUTH_ERROR' });
        }
    };

    // Register user
    const register = async (formData) => {
        try {
            const res = await axios.post('/api/auth/register', formData);
            dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
        } catch (err) {
            dispatch({ type: 'REGISTER_FAIL', payload: err.response.data.msg });
        }
    };

    // Login user
    const login = async (formData) => {
        try {
            const res = await axios.post('/api/auth/login', formData);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
        } catch (err) {
            dispatch({ type: 'LOGIN_FAIL', payload: err.response.data.msg });
        }
    };

    // Logout
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                loading: state.loading,
                error: state.error,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
