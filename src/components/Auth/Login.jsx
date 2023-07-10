import React, { useState } from 'react';
import { loginReduceer, registerReduceer } from '../../slices/user';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import styles from './style.module.css'
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router';

function Login() {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            dispatch(loginReduceer({ username, password }, enqueueSnackbar, navigate));
        } catch (error) {
            console.error(error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            dispatch(registerReduceer({ username, password }, enqueueSnackbar, navigate));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.login}>
                <h2 style={{ textAlign: 'center' }}>Login</h2>
                <div className={styles.textField}>
                    <TextField id="outlined-basic" fullWidth required label="Username" margin='dense' variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} size="small" />
                </div>
                <div className={styles.textField}>
                    <TextField id="outlined-basic" type="password" margin='dense' required fullWidth label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} size="small" />
                </div>
                <div className={styles.button}>
                    <Button variant="outlined" onClick={handleLogin} size="small">Login</Button>
                    <Button variant="outlined" onClick={handleRegister} size="small">Register</Button>
                </div>
            </div>
        </div>
    );
}

export default Login;
