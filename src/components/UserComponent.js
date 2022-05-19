import React, { useState } from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import MuiAlert from '@mui/material/Alert';


import { createMuiTheme } from '@mui/material/styles';

import copy from "copy-to-clipboard"
import { Button, ListItem, Snackbar } from '@mui/material';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


function GetAllContent({ users }) {
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [openCreateUserDialog, setOpenCreateUserDialog] = React.useState(false);
    const [search, setSearch] = useState("")
    const [edtiUser, setEditUser] = useState({})
    const [severity, setSeverity] = useState("success")
    const [message, setMessage] = useState("Text copied to clipboard")

    // CREATE AND EDTI FIELDS
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    // DELETE DIALOG
    const handleClickOpenDeleteDialog = (user) => {
        setEditUser(user)
        setOpenDeleteDialog(true);
    };

    const handleClickCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleClickDeleteDialog = () => {
        deleteUser(edtiUser._id)
        setOpenDeleteDialog(false)
    }

    const deleteUser = async (userId) => {
        try {
            const res = await axios.delete(`https://server-shop-app.herokuapp.com/api/users/${userId}`)
            setSeverity("success")
            setMessage(res.data)
            setOpen(true)
        } catch (error) {
            setSeverity("error")
            setMessage(`Error when delete user`)
            setOpen(true)
        }
    }

    // EDIT DIALOG
    const handleClickOpenEditDialog = (user) => {
        setEditUser(user)

        setUsername(user.username)
        setEmail(user.email)
        setPassword(user.password)
        setConfirmPassword("")
        setIsAdmin(false)

        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    const handleSaveEditDialog = () => {
        if(username.length < 1 || email.length < 1) {
            setSeverity("warning")
            setMessage("Must have more than one character all the camps")
            setOpen(true)
        } else {
            updateUser(edtiUser)
            setOpenEditDialog(false)
        }

    }

    const updateUser = async (user) => {
        try {
            const res = await axios.put(
                `https://server-shop-app.herokuapp.com/api/users/${user._id}`, 
                {
                    "username": username, 
                    "password": user.password,
                    "email": email,
                    "isAdmin": isAdmin,
                    "need": false
                }
            )
            setSeverity("success")
            setMessage(`User with id ${res.data._id} updated successfully`)
            setOpen(true)
        } catch (error) {
            setSeverity("error")
            setMessage(`Error when updated user`)
            setOpen(true)
        }
    }

    // CREATE USER DIALOG
    const handleClickOpenCreateUserDialog = () => {
        setUsername("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setIsAdmin(false)
        setOpenCreateUserDialog(true)
    }

    const handleClickCloseCreateUserDialog = () => {
        setOpenCreateUserDialog(false)
    }

    const handleSaveCreateUser = () => {
        if (username.length < 1 || email.length < 1 || password.length < 1 || confirmPassword.length < 1) {
            // SET ERROR MESSAGE
            setSeverity("warning")
            setMessage(`Fill all the camps`)
            setOpen(true)
        } else if (password !== confirmPassword) {
            // SET ERROR MESSAGE
            setSeverity("warning")
            setMessage(`PASSWORDS NOT SAME`)
            setOpen(true)
        } else {
            const newUser = {
                "username": username,
                "email": email,
                "password": password,
                "isAdmin": isAdmin
            }
            // CALL API
            createUser(newUser)
            setOpenCreateUserDialog(false)
        }
        
    }

    const createUser = async (newUser) => {
        try {
            const res = axios.post(
                "https://server-shop-app.herokuapp.com/api/auth/register",
                newUser
            )
            setSeverity("success")
            setMessage(`Created user with name ${res.data.username} successfully`)
            setOpen(true)
        } catch (error) {
            setSeverity("warning")
            setMessage(`ERROR WHEN CREATE USER`)
            setOpen(true)
        }
    }

    // ACCORDION
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // COPY ID
    const handleClick = (userId) => {
        setOpen(true)
        copy(userId)
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    // STYLE Typography BOLD
    const theme = createMuiTheme({
        typography: {
            body1: {
                fontWeight: 600
            }
        }
    })

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

    // SEARCH USER
    const handleChangeSearch = (e) => {
        setSearch(e)
    }


    return (
        <div>
            <Box >
                <TextField id="outlined-basic" label="Search User(Id, email or username)" variant="outlined" sx={{ width: "100%", marginBottom: "1rem" }} onChange={(e) => handleChangeSearch(e.target.value)} />
                <Button variant="contained" sx={{ width: "100%", marginBottom: "1rem", backgroundColor: "cian" }} onClick={handleClickOpenCreateUserDialog} >Create User</Button>
                <Dialog open={openCreateUserDialog} onClose={handleClickCloseCreateUserDialog}>
                    <DialogTitle>Create user: </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Username"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Box sx={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
                            <Typography sx={{ color: "gray" }}>Is Admin: </Typography>
                            <Switch onChange={(e) => setIsAdmin(e.target.checked)} />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClickCloseCreateUserDialog}>Cancel</Button>
                        <Button onClick={handleSaveCreateUser}>Create</Button>
                    </DialogActions>
                </Dialog>
            </Box>
            {
                users.filter((user) => {
                    if (search === "") {
                        return user
                    } else if (user._id.toLowerCase().includes(search.toLowerCase()) || user.username.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())) {
                        return user;
                    }
                }).map((user, index) => (
                    <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)} >
                        <AccordionSummary

                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                        >
                            <Box sx={{ display: "flex" }}>
                                <AccountCircleIcon sx={{ padding: "0 1rem 0 0" }} />
                                <Box sx={{ display: "flex" }}>
                                    <Typography theme={theme}>Username: </Typography>
                                    <Typography sx={{ width: '33%', flexShrink: 0, marginLeft: "5px" }}>
                                        {user.username}
                                    </Typography>
                                </Box>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List
                                sx={{ width: '100%', bgcolor: 'background.paper' }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                            >
                                <ListItem>
                                    <ListItemIcon>
                                        <Grid3x3Icon />
                                    </ListItemIcon>
                                    <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
                                        <Typography theme={theme} sx={{ marginRight: "5px" }}>Id: </Typography>
                                        <ListItemText primary={user._id} />
                                        <Button sx={{ color: "black" }} variant="outlined" onClick={() => handleClick(user._id)}>
                                            <ContentCopyIcon sx={{ marginRight: "5px" }} /> Copy Id
                                        </Button>
                                    </Box>
                                </ListItem>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AlternateEmailIcon />
                                    </ListItemIcon>
                                    <Typography theme={theme} sx={{ marginRight: "5px" }}>Email: </Typography>
                                    <ListItemText primary={user.email} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AdminPanelSettingsIcon />
                                    </ListItemIcon>
                                    <Typography theme={theme} sx={{ marginRight: "5px" }}>Is Admin: </Typography>
                                    <ListItemText primary={user.isAdmin ? "Yes" : "No"} />
                                </ListItemButton>
                            </List>
                            <div align="right">
                                <Button sx={{ color: "black", marginRight: "10px" }} variant="outlined" onClick={() => handleClickOpenEditDialog(user)}>
                                    <EditIcon sx={{ marginRight: "5px" }} /> Edit
                                </Button>
                                <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                                    <DialogTitle>Edit user with Id: </DialogTitle>
                                    <DialogContent>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Username"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            defaultValue={edtiUser.username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        ></TextField>
                                        <TextField
                                            margin="dense"
                                            id="name"
                                            label="Email Address"
                                            type="email"
                                            fullWidth
                                            variant="standard"
                                            defaultValue={edtiUser.email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <Box sx={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
                                            <Typography sx={{ color: "gray" }}>Is Admin: </Typography>
                                            <Switch defaultChecked={edtiUser.isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                                        </Box>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseEditDialog}>Cancel</Button>
                                        <Button onClick={handleSaveEditDialog}>Save</Button>
                                    </DialogActions>
                                </Dialog>
                                <Button sx={{ color: "black" }} variant="outlined" onClick={() => handleClickOpenDeleteDialog(user)}>
                                    <DeleteIcon sx={{ marginRight: "5px" }} /> Delete
                                </Button>
                                <Dialog
                                    open={openDeleteDialog}
                                    onClose={handleClickCloseDeleteDialog}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {"Are you sure you want to delete the user?"}
                                    </DialogTitle>
                                    <DialogActions>
                                        <Button onClick={handleClickCloseDeleteDialog}>Cancel</Button>
                                        <Button onClick={handleClickDeleteDialog} autoFocus>
                                            Delete
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                ))
            }
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
        </div>
    )
}

export default GetAllContent