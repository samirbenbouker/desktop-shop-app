import React, { useState, useEffect } from 'react'
import ProductComponent from './ProductComponent';

import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';
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

function ProductContent() {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if(!localStorage.getItem("currentSession")) {
            navigate("/", { replace: false })
        }
    }, [navigate])

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get('https://server-shop-app.herokuapp.com/api/products')
                setProducts(res.data)
            } catch (error) {
                
            }
        }
        getProducts()
    }, [products])

    return (
        <Box sx={{ width: '100%' }}>
            {
                products 
                ? <ProductComponent products={products} />
                : <CircularProgress color="secondary" /> 
            }
            
        </Box>
    );
}

export default ProductContent