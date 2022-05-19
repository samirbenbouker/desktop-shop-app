import React, {useEffect} from 'react'
import UserComponent from './UserComponent';

import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from "axios"
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom"



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


function UserContent() {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if(!localStorage.getItem("currentSession")) {
            navigate("/", { replace: false })
        }
    }, [navigate])

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get('https://server-shop-app.herokuapp.com/api/users')
                setUsers(res.data)
            } catch (error) {
                
                
            }
        }
        getUsers()
    }, [users])

    return (
        <Box sx={{ width: '100%' }}>
            {
                users
                ? <UserComponent users={users} />
                : <CircularProgress color="inherit" /> 
            }
            
        </Box>
    );
}

export default UserContent