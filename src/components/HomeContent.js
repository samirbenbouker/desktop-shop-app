import React from 'react'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useNavigate } from "react-router-dom"

function HomeContent({ data }) {
    const navigate = useNavigate()

    const handleNavigate = (title) => {
        if (title === "User") {
            navigate("/user", { replace: false })
        } else {
            navigate("/product", { replace: false })
        }
    }

    return (
        <Card
            sx={{
                marginTop: "10px",
                margin: "25px 25px 0 25px",
                width: "50%"
            }}
        >
            < CardMedia
                component="img"
                height="140"
                image={data.imgUrl}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {data.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {data.desc}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => handleNavigate(data.title)} size="small">Show More</Button>
            </CardActions>
        </Card>
    )
}

export default HomeContent