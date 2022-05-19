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
import DescriptionIcon from '@mui/icons-material/Description';
import LinkIcon from '@mui/icons-material/Link';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryIcon from '@mui/icons-material/Category';

import { createMuiTheme } from '@mui/material/styles';

import copy from "copy-to-clipboard"
import { Button, ListItem, Snackbar } from '@mui/material';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function GetAllProductsContent({ products }) {
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [openCreateProductDialog, setOpenCreateProductDialog] = React.useState(false);
    const [search, setSearch] = useState("")
    const [editProduct, setEditProduct] = useState({})
    const [severity, setSeverity] = useState("success")
    const [message, setMessage] = useState("Text copied to clipboard")

    // CREATE AND EDIT FIELDS
    const [nameProduct, setNameProduct] = useState("")
    const [desc, setDesc] = useState("")
    const [URLImg, setURLImg] = useState("")
    const [price, setPrice] = useState("")
    const [inStock, setInStock] = useState(true)
    const [category, setCategory] = useState("")
    

    // DELETE DIALOG
    const handleClickOpenDeleteDialog = (product) => {
        setEditProduct(product)
        setOpenDeleteDialog(true);
    };

    const handleClickCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleClickDeleteDialog = () => {
        deleteProduct(editProduct._id)
        setOpenDeleteDialog(false)
    }

    const deleteProduct = async (productId) => {
        try {
            const res = await axios.delete(`https://server-shop-app.herokuapp.com/api/products/${productId}`)
            setSeverity("success")
            setMessage(res.data)
            setOpen(true)
        } catch (error) {
            setSeverity("error")
            setMessage(`Error when delete product`)
            setOpen(true)
        }
    }

    // EDIT DIALOG
    const handleClickOpenEditDialog = (product) => {
        setEditProduct(product)

        setNameProduct(product.title)
        setDesc(product.desc)
        setURLImg(product.img)
        setPrice(product.price)
        setInStock(product.inStock)
        setCategory(product.categories[1])

        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    const handleSaveEditDialog = () => {
        if(nameProduct.length < 1 || URLImg.length < 5 || price.length < 1 || category.length < 1) {
            setSeverity("warning")
            setMessage("Must have more than one character all the camps")
            setOpen(true)
        } else if(!/^\d+$/.test(price)) {
            setSeverity("warning")
            setMessage("Field price need to be a number")
            setOpen(true)
        } else {
            updateProduct(editProduct)
            setOpenEditDialog(false)
        }
    }

    const updateProduct = async (product) => {
        try {
            const res = await axios.put(
                `https://server-shop-app.herokuapp.com/api/products/${product._id}`,
                {
                    "title": nameProduct,
                    "desc": desc,
                    "img": URLImg,
                    "price": price,
                    "inStock": inStock,
                    "categories": ["ALL", category]
                }
            )
            setSeverity("success")
            setMessage(`Product with id ${res.data._id} updated successfully`)
            setOpen(true)
        } catch (error) {
            setSeverity("error")
            setMessage(`Error when updated product`)
            setOpen(true)
        }
    }

    // CREATE PRODUCT DIALOG
    const handleClickOpenCreateProductDialog = () => {
        setNameProduct("")
        setDesc("")
        setURLImg("")
        setPrice("")
        setInStock(false)
        setCategory("")

        setOpenCreateProductDialog(true)
    }

    const handleClickCloseCreateProductDialog = () => {
        setOpenCreateProductDialog(false)
    }

    const handleSaveCreateProduct = () => {
        if(nameProduct.length < 1 || URLImg.length < 5 || price.length < 1 || desc.length < 1 || category.length < 1) {
            setSeverity("warning")
            setMessage("Must have more than one character all the camps")
            setOpen(true)
        } else if(!/^\d+$/.test(price)) {
            setSeverity("warning")
            setMessage("Field price need to be a number")
            setOpen(true)
        } else {
            const newProduct = {
                "title": nameProduct,
                "desc": desc,
                "img": URLImg,
                "categories": ["ALL", category],
                "price": price,
                "inStock": inStock
            }
            createProduct(newProduct)
            setOpenCreateProductDialog(false)
        }
    }

    const createProduct = async (newProduct) => {
        try {
            const res = await axios.post(
                "https://server-shop-app.herokuapp.com/api/products",
                newProduct
            )
            setSeverity("success")
            setMessage(`Created product with name ${res.data.title} successfully`)
            setOpen(true)
        } catch (error) {
            setSeverity("warning")
            setMessage(`ERROR WHEN CREATE PRODUCT`)
            setOpen(true)
        }
    }

    // ACCORDION
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // COPY ID
    const handleClick = (productId) => {
        setOpen(true)
        copy(productId)
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

    // SEARCH PRODUCT
    const handleChangeSearch = (e) => {
        setSearch(e)
    }

    return (
        <div>
            <Box >
                <TextField id="outlined-basic" label="Search Product(Id, product name, categories)" variant="outlined" sx={{ width: "100%", marginBottom: "1rem" }} onChange={(e) => handleChangeSearch(e.target.value)} />
                <Button variant="contained" sx={{ width: "100%", marginBottom: "1rem", backgroundColor: "cian" }} onClick={handleClickOpenCreateProductDialog} >Create Product</Button>
                <Dialog open={openCreateProductDialog} onClose={handleClickCloseCreateProductDialog}>
                    <DialogTitle>Create product: </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Name Product"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setNameProduct(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="desc"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="img"
                            label="URL Img"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setURLImg(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="category"
                            label="Category"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="price"
                            label="Price"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <Box sx={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
                            <Typography sx={{ color: "gray" }}>In Stock: </Typography>
                            <Switch defaultChecked onChange={(e) => setInStock(e.target.checked)}/>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClickCloseCreateProductDialog}>Cancel</Button>
                        <Button onClick={() => handleSaveCreateProduct()}>Create</Button>
                    </DialogActions>
                </Dialog>
            </Box>
            {
                products.filter((product) => {
                    if (search === "") {
                        return product
                    } else if (product._id.toLowerCase().includes(search.toLowerCase()) || product.title.toLowerCase().includes(search.toLowerCase())) {
                        return product;
                    }
                }).map((product, index) => (
                    <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                        >
                            <Box sx={{ display: "flex" }}>
                                <AccountCircleIcon sx={{ padding: "0 1rem 0 0" }} />
                                <Box sx={{ display: "flex" }}>
                                    <Typography theme={theme}>Name product: </Typography>
                                    <Typography sx={{ flexShrink: 0, marginLeft: "5px" }}>
                                        {product.title}
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
                                        <ListItemText primary={product._id} />
                                        <Button sx={{ color: "black" }} variant="outlined" onClick={() => handleClick(product._id)}>
                                            <ContentCopyIcon sx={{ marginRight: "5px" }} /> Copy Id
                                        </Button>
                                    </Box>
                                </ListItem>
                                {
                                    product.desc ? <ListItemButton>
                                        <ListItemIcon>
                                            <DescriptionIcon />
                                        </ListItemIcon>
                                        <Typography theme={theme} sx={{ marginRight: "5px" }}>Description: </Typography>
                                        <ListItemText primary={product.desc} />
                                    </ListItemButton> : <></>
                                }
                                <ListItemButton>
                                    <ListItemIcon>
                                        <LinkIcon />
                                    </ListItemIcon>
                                    <Typography theme={theme} sx={{ marginRight: "5px" }}>URL Img: </Typography>
                                    <ListItemText primary={product.img} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <CategoryIcon />  
                                    </ListItemIcon>
                                    <Typography theme={theme} sx={{ marginRight: "5px" }}>Categories: </Typography>
                                    <ListItemText primary={product.categories && product.categories[1]} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AttachMoneyIcon />
                                    </ListItemIcon>
                                    <Typography theme={theme} sx={{ marginRight: "5px" }}>Price: </Typography>
                                    <ListItemText primary={product.price} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AdminPanelSettingsIcon />
                                    </ListItemIcon>
                                    <Typography theme={theme} sx={{ marginRight: "5px" }}>In Stock: </Typography>
                                    <ListItemText primary={product.inStock ? "Yes" : "No"} />
                                </ListItemButton>
                            </List>
                            <div align="right">
                                <Button sx={{ color: "black", marginRight: "10px" }} variant="outlined" onClick={() => handleClickOpenEditDialog(product)}>
                                    <EditIcon sx={{ marginRight: "5px" }} /> Edit
                                </Button>
                                <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                                    <DialogTitle>Edit product: </DialogTitle>
                                    <DialogContent>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="title"
                                            label="Name Product"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            defaultValue={editProduct.title}
                                            onChange={(e) => setNameProduct(e.target.value)}
                                        />
                                        {editProduct.desc
                                            ? <TextField
                                                margin="dense"
                                                id="desc"
                                                label="Description"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                defaultValue={editProduct.desc}
                                                onChange={(e) => setDesc(e.target.value)}
                                            />
                                            : <></>}
                                        <TextField
                                            margin="dense"
                                            id="img"
                                            label="URL Img"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            defaultValue={editProduct.img}
                                            onChange={(e) => setURLImg(e.target.value)}
                                        />
                                        <TextField
                                            margin="dense"
                                            id="category"
                                            label="Category"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            defaultValue={editProduct.categories && editProduct.categories[1]}
                                            onChange={(e) => setCategory(e.target.value)}
                                        /> 
                                        <TextField
                                            margin="dense"
                                            id="price"
                                            label="Price"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            defaultValue={editProduct.price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                        <Box sx={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
                                            <Typography sx={{ color: "gray" }}>In Stock: </Typography>
                                            <Switch defaultChecked={editProduct.inStock} onChange={(e) => setInStock(e.target.checked)} />
                                        </Box>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseEditDialog}>Cancel</Button>
                                        <Button onClick={handleSaveEditDialog}>Save</Button>
                                    </DialogActions>
                                </Dialog>
                                <Button sx={{ color: "black" }} variant="outlined" onClick={() => handleClickOpenDeleteDialog(product)}>
                                    <DeleteIcon sx={{ marginRight: "5px" }} /> Delete
                                </Button>
                                <Dialog
                                    open={openDeleteDialog}
                                    onClose={handleClickCloseDeleteDialog}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {"Are you sure you want to delete the product?"}
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
                autoHideDuration={6000}
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

export default GetAllProductsContent