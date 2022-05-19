import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import { useNavigate } from "react-router-dom"

const pages = ['User', 'Product'];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState("");
    const [logged, setLogged] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if(JSON.parse(localStorage.getItem("currentSession"))) {
            setLogged(true)
        }
    }, [])

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (page) => {
        switch (page) {
            case "User":
                navigate("/user", { replace: false })
                break;
            case "Product":
                navigate("/product", { replace: false })
                break
        }
    };

    const handleCloseSession = () => {
        localStorage.removeItem("currentSession")
        navigate("/", { replace: false })
        setLogged(false)
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Button sx={{ color: "white" }}>
                        <h1
                            variant="h4"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            FunKo Admin
                        </h1>
                    </Button>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => handleCloseNavMenu(page)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {!logged
                            ? <div>
                                <Button sx={{ color: "white" }} onClick={() => navigate("/login", { replace: false })}>
                                    <span>Login</span>
                                </Button>
                            </div>
                            : <Button sx={{ color: "white" }} onClick={handleCloseSession}>
                                <span>Close session</span>
                            </Button>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );

}

export default Navbar