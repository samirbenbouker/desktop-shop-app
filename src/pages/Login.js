import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { Button, TextField, Typography, IconButton,  Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom"

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState("")

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("https://server-shop-app.herokuapp.com/api/auth/login", {username: username, password: password})
            if(res.data.isAdmin) {
                localStorage.setItem("currentSession", JSON.stringify(res.data))
                navigate("/user", { replace: false })
            }
            setMessage("User need to be a admin")
            setSeverity("warning")
            setOpen(true)
        } catch (error) {
            setMessage("USERNAME OR PASSWORD IS WRONG")
            setSeverity("error")
            setOpen(true)
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Box sx={{width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "url('https://www.funko.com/craftmin/users/pop-yourself-logo-089274fc4402d61e99429deb208b7f33.png') center"}}>
            <Box sx={{width: "25%", padding: "20px", backgroundColor: "black", borderRadius:"10px 10px 10px 10px"}}>
                <Typography sx={{fontSize: "24px", fontWeight: "300", color: "white", alginItems: "center"}}>SIGN IN</Typography>
                <Box component="form" sx={{display: "flex", flexDirection: "column"}}>
                    <TextField placeholder='username' type="text" borderColor="red" sx={{flex: "1", width: "100%", margin: "10px 0", backgroundColor:"white", borderRadius:"10px 10px 10px 10px"}} onChange={(e) => setUsername(e.target.value)}/>
                    <TextField placeholder='password' type="password" sx={{flex: "1", width: "100%", margin: "10px 0", backgroundColor:"white", borderRadius:"10px 10px 10px 10px", marginBottom: "2rem"}} onChange={(e) => setPassword(e.target.value)}/>
                    <Button sx={{width: "100%", border:"none", padding: "15px 20px", backgroundColor: "white", cursor: "pointer", marginBottom: "10px",borderRadius:"10px 10px 10px 10px"}} onClick={handleLogin}>LOGIN</Button>
                </Box>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                action={action}
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Login