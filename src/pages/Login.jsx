import styled from 'styled-components';
import React, { useState } from 'react';
import {
    Container,
    Box,
    Button,
    Typography,
    Avatar,
    Paper,
    TextField
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Field, Form, Formik } from 'formik';
import { useHistory } from "react-router-dom";
import axios from 'axios';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));



const Login = () => {

    const token = "Bmd2OPMgVDRCEp5n"
    let history = useHistory();

    const [ini, setIni] = useState({
        email: '',
        password: '',
    })

    const handleSubmit = (values) => {

        console.log(values);
        
        axios.post('https://generateapi.onrender.com/auth/login', values, {
            headers: {
                Authorization: token
            }
        })
            .then((response) => {
                console.log(response.data.data._id)
                localStorage.setItem('token', response.data.data._id)
                history.push('/home')
            }
            )
            .catch((error) => {
                console.error(error);
            }
            );
    }

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 4, mt: 8, backgroundColor: "#b3dfff" }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Avatar sx={{ bgcolor: "#1976d2", mb: 2 }}>
                        <AccountCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" gutterBottom>
                        Sign in
                    </Typography>


                    <Formik
                        initialValues={ini}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <Field name="email"
                                as={TextField}
                                label="Email"
                                fullWidth
                                margin="normal" ></Field>

                            <Field type="password" name="password"
                                as={TextField}
                                label="Password"
                                fullWidth
                                margin="normal"
                            ></Field>

                            <Button type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}>Submit</Button>

                        </Form>
                    </Formik>
                </Box>
            </Paper>
        </Container>
    )
}

export default Login


