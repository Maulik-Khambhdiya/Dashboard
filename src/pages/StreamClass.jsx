import React, { useEffect, useState } from 'react'
import Home from './Home'
import { Box, Button, Grid, Paper} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Field, Form, Formik } from 'formik';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import axios from 'axios';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const StreamClass = () => {
    const studentList = [];


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const token = "Bmd2OPMgVDRCEp5n"
    const userId = localStorage.getItem('token')

    // console.log("id ==> ",userId);

    const [ini, setIni] = useState({
        stream: "",
        faculty: "",
        user: null
    })

    const [facultyList, setFacultyList] = useState([])

    const [editId, setEditId] = useState(null)

    useEffect(() => {
        viewData()
    }, [])

    function viewData() {
        axios.get("https://generateapi.onrender.com/api/stream", {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                setFacultyList(res.data.Data)

            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleSubmit = (values, { resetForm }) => {

        values.user = userId
        // console.log("values ==> ",values);

        const { _id, ...rest } = values

        rest.user = userId

        // console.log("rest==>",rest);

        if (editId != null) {

            axios.patch(`https://generateapi.onrender.com/api/stream/${editId}`, rest, {
                headers: {
                    Authorization: token
                }
            })
                .then((res) => {
                    console.log("Data Edited")
                    setEditId(null)
                    viewData()
                    setIni({
                        stream: "",
                        faculty: "",
                        user: null
                    })

                })

                .catch((error) => {
                    console.log(error)
                })

        }

        else {

            axios.post("https://generateapi.onrender.com/api/stream", values, {
                headers: {
                    Authorization: token
                }
            })
                .then((res) => {
                    console.log("Data Add Successfully")
                    //resetForm();
                    viewData()
                    setOpen(false);
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        resetForm()

    }

    const deleteData = (deleteId) => {
        axios.delete(`https://generateapi.onrender.com/api/stream/${deleteId}`, {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                console.log("Data Delete Successfully")
                viewData()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const editData = (item) => {
        setIni(item)
        setEditId(item._id)
        setOpen(true);
    }



    return (
        <>
            <Home>

                <Paper elevation={4} sx={{ padding: 2, borderRadius: 2, backgroundColor: "#b4ff0014" }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid size={{ lg: 10, md: 10, sm: 12, xs: 12 }}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth sx={{ backgroundColor: "#00b8ff29", fontFamily: "cursive" }}>
                                    <Autocomplete
                                        disablePortal
                                        fullWidth
                                        options={studentList}
                                        sx={{ width: "100%" }}
                                        renderInput={(params) => <TextField {...params} label="Search" />}
                                    />
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid size={{ lg: 2, md: 2, sm: 12, xs: 12 }} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>


                            <Button variant="contained" onClick={handleClickOpen}
                                sx={{
                                    width: "100%",
                                    textTransform: 'none',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: '#1565c0',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                Add Stream/Class
                            </Button>
                            <BootstrapDialog
                                onClose={handleClose}
                                aria-labelledby="customized-dialog-title"
                                open={open}
                            >
                                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                    Add Stream/Class
                                </DialogTitle>
                                <IconButton
                                    aria-label="close"
                                    onClick={handleClose}
                                    sx={(theme) => ({
                                        position: 'absolute',
                                        right: 8,
                                        top: 8,
                                        color: theme.palette.grey[500],
                                    })}
                                >
                                    <CloseIcon />
                                </IconButton>

                                {/*....................................Form details ............................................*/}
                                <DialogContent dividers>
                                    <Formik
                                        enableReinitialize
                                        initialValues={ini}
                                        onSubmit={handleSubmit}
                                    >
                                        <Form>

                                            <Field name="stream"
                                                type="text"
                                                as={TextField}
                                                label="Stream/Class"
                                                sx={{ width: "100%", mb: 2 }}>

                                            </Field>

                                            <Field name="faculty"
                                                type="text"
                                                as={TextField}
                                                label="Faculty"
                                                sx={{ width: "100%", mb: 2 }}>

                                            </Field>



                                            <DialogActions>
                                                <Button type='submit' variant='contained' autoFocus>
                                                    Submit
                                                </Button>
                                            </DialogActions>


                                        </Form>
                                    </Formik>
                                </DialogContent>



                            </BootstrapDialog>
                        </Grid>
                    </Grid>
                </Paper>

                <br /><br />
                <Grid container spacing={0} sx={{ alignItems: "center" }}>

                    <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>

                        <table style={{ borderSpacing: "0px", width: "100%", textAlign: "center" }}>
                            <thead style={{ backgroundColor: "rgb(25, 118, 210)" }}>

                                <tr>
                                    <th style={{ padding: "20px 3px", color: "white", fontFamily: "math", fontSize: "14px" }}>No</th>
                                    <th style={{ padding: "20px 3px", color: "white", fontFamily: "math", fontSize: "14px" }}>Stream/Class</th>
                                    <th style={{ padding: "20px 3px", color: "white", fontFamily: "math", fontSize: "14px" }}>Year</th>
                                    <th style={{ padding: "20px 3px", color: "white", fontFamily: "math", fontSize: "14px" }} >Delete</th>
                                    <th style={{ padding: "20px 3px", color: "white", fontFamily: "math", fontSize: "14px" }}>Update</th>
                                </tr>


                            </thead>

                            {

                                facultyList.map((item, index) => (
                                    < tr style={{ textAlign: "center" }}>
                                        <td style={{ padding: "20px 3px", color: "black", fontFamily: "math", fontSize: "14px" }}>{index + 1}</td>
                                        <td style={{ padding: "20px 3px", color: "black", fontFamily: "math", fontSize: "14px" }}>{item.stream}</td>
                                        <td style={{ padding: "20px 3px", color: "black", fontFamily: "math", fontSize: "14px" }}>{item.faculty}</td>
                                        <td><button onClick={() => deleteData(item._id)} style={{ border: "none", background: "none" }}><DeleteIcon sx={{ ":hover": { color: "rgb(255, 3, 3)" }, fontSize: "25px" }} /></button></td>

                                        <td><button onClick={() => editData(item)} style={{ border: "none", background: "none" }}><EditDocumentIcon sx={{ ":hover": { color: "rgb(140, 7, 158)" }, fontSize: "25px" }} /></button></td>
                                    </tr>
                                ))
                            }


                        </table>
                    </Grid>


                </Grid>
            </Home >
        </>
    )
}

export default StreamClass
