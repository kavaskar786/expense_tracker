import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const Login = () => {
    const authContext = useContext(AuthContext);
    const { login } = authContext;

    const [user, setUser] = useState({ email: '', password: '' });

    const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        login(user);
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Login</h2>
            <input
                type="email"
                name="email"
                value={user.email}
                onChange={onChange}
                placeholder="Email"
                required
            />
            <input
                type="password"
                name="password"
                value={user.password}
                onChange={onChange}
                placeholder="Password"
                required
            />
            <input type="submit" value="Login" />
        </form>
    );
};

export default Login;
