import {
  Box,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Home from "./Home";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Field, Form, Formik } from "formik";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import DeleteIcon from "@mui/icons-material/Delete";
import Switch from "@mui/material/Switch";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const AddStudent = () => {
  const userId = localStorage.getItem("token");

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleCardClickOpen = (student) => {
    setSelectedStudent(student);
    setOpen1(true);
  };
  const handleCardClose = () => {
    setOpen1(false);
  };

  const label = { inputProps: { "aria-label": "Size switch demo" } };
  const token = "Bmd2OPMgVDRCEp5n";

  const [studentList, setStudentList] = useState([]);
  const [sList, setSList] = useState([]);

  const [ini, setIni] = useState({
    student_name: "",
    stream: "",
    user: null,
    age: "",
    gender: "",
    address: "",
    contact: "",
    active_status: false,
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    viewData();
    viewStream();
  }, []);

  function viewStream() {
    axios
      .get("https://generateapi.onrender.com/api/stream", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setSList(res.data.Data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function viewData() {
    axios
      .get("https://generateapi.onrender.com/api/student_details", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setStudentList(res.data.Data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSubmit = (values, { resetForm }) => {
    values.user = userId;
    const { _id, ...rest } = values;
    rest.user = userId;

    console.log("values=>", values);

    if (editId != null) {
      //console.log("editId =>", editId);

      axios
        .patch(
          `https://generateapi.onrender.com/api/student_details/${editId}`,
          rest,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          console.log("Data Edited");
          setEditId(null);
          viewData();
          setOpen1(false)
          setIni({
            student_name: "",
            stream: "",
            user: null,
            age: "",
            gender: "",
            address: "",
            contact: "",
            active_status: "",
          });
        })

        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post("https://generateapi.onrender.com/api/student_details", values, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log("Data Added");
          viewData();
          setOpen(false);
        })
        .catch((error) => {
          console.log(error);
        });
      resetForm();
    }
  };

  const deleteData = (deleteId) => {
    axios
      .delete(
        `https://generateapi.onrender.com/api/student_details/${deleteId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log("Data Delete Successfully");
        viewData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editData = (item) => {
    setIni({
      ...item,
      stream: item.stream?._id || "", // extract stream ID
    });
    setEditId(item._id);
    setOpen(true);
  };
  return (
    <>
      <Home>
        <Paper
          elevation={4}
          sx={{ padding: 2, borderRadius: 2, backgroundColor: "#b4ff0014" }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ lg: 10, md: 10, sm: 12, xs: 12 }}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl
                  fullWidth
                  sx={{ backgroundColor: "#00b8ff29", fontFamily: "cursive" }}
                >
                  <Autocomplete
                    disablePortal
                    fullWidth
                    options={studentList}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Search" />
                    )}
                  />
                </FormControl>
              </Box>
            </Grid>

            <Grid
              size={{ lg: 2, md: 2, sm: 12, xs: 12 }}
              sx={{ textAlign: { xs: "left", sm: "right" } }}
            >
              <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{
                  width: "100%",
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                Add Student
              </Button>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                  Add Student
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={(theme) => ({
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                  })}
                >
                  <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                  <Formik
                    enableReinitialize
                    initialValues={ini}
                    onSubmit={handleSubmit}
                  >
                    <Form>
                      <Field
                        name="student_name"
                        type="text"
                        as={TextField}
                        label="Full Name"
                        sx={{ width: "100%", mb: 2 }}
                      ></Field>

                      <Field name="stream">
                        {({ field, form }) => (
                          <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel id="stream-select-label">Select Stream</InputLabel>
                            <Select
                              labelId="stream-select-label"
                              id="stream-select"
                              value={field.value || ""}
                              onChange={(e) => {
                                form.setFieldValue("stream", e.target.value);
                              }}
                              label="Stream"
                            >
                              {sList.map((item) => (
                                <MenuItem key={item._id} value={item._id}>
                                  {item.stream}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      </Field>

                      <Field
                        name="age"
                        type="number"
                        as={TextField}
                        label="Age"
                        sx={{ width: "100%", mb: 2 }}
                      ></Field>

                      <Field
                        name="gender"
                        type="text"
                        as={TextField}
                        label="Gender"
                        sx={{ width: "100%", mb: 2 }}
                      ></Field>

                      <Field
                        name="address"
                        type="text"
                        as={TextField}
                        label="Address"
                        sx={{ width: "100%", mb: 2 }}
                      ></Field>

                      <Field
                        name="contact"
                        as={TextField}
                        label="Contact"
                        sx={{ width: "100%", mb: 2 }}
                      ></Field>

                      <DialogActions>
                        <Button type="submit" variant="contained" autoFocus>
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

        <br />
        <br />
        <Grid container spacing={0} sx={{ alignItems: "center" }}>
          <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
            <table
              style={{
                borderSpacing: "0px",
                width: "100%",
                textAlign: "center",
              }}
            >
              <thead style={{ backgroundColor: "rgb(25, 118, 210)" }}>
                <tr>
                  <th
                    style={{
                      padding: "20px 3px",
                      color: "white",
                      fontFamily: "math",
                      fontSize: "14px",
                    }}
                  >
                    No
                  </th>
                  <th
                    style={{
                      padding: "20px 3px",
                      color: "white",
                      fontFamily: "math",
                      fontSize: "14px",
                    }}
                  >
                    Name
                  </th>
                  <th
                    style={{
                      padding: "20px 3px",
                      color: "white",
                      fontFamily: "math",
                      fontSize: "14px",
                    }}
                  >
                    Stream
                  </th>
                  <th
                    style={{
                      padding: "20px 3px",
                      color: "white",
                      fontFamily: "math",
                      fontSize: "14px",
                    }}
                  >
                    Details
                  </th>

                  <th
                    style={{
                      padding: "20px 3px",
                      color: "white",
                      fontFamily: "math",
                      fontSize: "14px",
                    }}
                  >
                    Active Status
                  </th>
                  <th
                    style={{
                      padding: "20px 3px",
                      color: "white",
                      fontFamily: "math",
                      fontSize: "14px",
                    }}
                  >
                    Delete
                  </th>
                  <th
                    style={{
                      padding: "20px 3px",
                      color: "white",
                      fontFamily: "math",
                      fontSize: "14px",
                    }}
                  >
                    Update
                  </th>
                </tr>
              </thead>

              {studentList.map((item, index) => (
                <tr style={{ textAlign: "center" }}>
                  <td
                    style={{
                      padding: "20px 3px",
                      color: "black",
                      fontFamily: "math",
                      fontSize: "14px",
                    }}
                  >
                    {index + 1}
                  </td>
                  <td
                    style={{
                      padding: "20px 3px",
                      color: "black",
                      fontFamily: "math",
                      fontSize: "14px",
                    }}
                  >
                    {item.student_name}
                  </td>
                  <td
                    style={{
                      padding: "20px 3px",
                      color: "black",
                      fontFamily: "math",
                      fontSize: "14px",
                    }}
                  >
                    {item.stream.stream}
                  </td>

                  <td
                    style={{
                      padding: "20px 3px",
                      color: "black",
                      fontFamily: "math",
                    }}
                  >
                    <Button
                      sx={{
                        borderRadius: "30px",
                        color: "white",
                        backgroundColor: "#36B0D8",
                        borderColor: "white",
                        padding: "3px 10px",
                        ":hover": {
                          color: "black",
                        },
                      }}
                      variant="outlined"
                      onClick={() => handleCardClickOpen({ ...item, index })}
                    >
                      Student Card
                    </Button>
                    <BootstrapDialog
                      onClose={handleCardClose}
                      aria-labelledby="customized-dialog-title"
                      open={open1}
                    >
                      <DialogTitle
                        sx={{ m: 0, p: 2 }}
                        id="customized-dialog-title"
                      >
                        Student Card
                      </DialogTitle>
                      <IconButton
                        aria-label="close"
                        onClick={handleCardClose}
                        sx={(theme) => ({
                          position: "absolute",
                          right: 8,
                          top: 8,
                          color: theme.palette.grey[500],
                        })}
                      >
                        <CloseIcon />
                      </IconButton>
                      <DialogContent dividers>
                        <Typography gutterBottom>
                          <table border="1">
                            <tr>
                              <th>No</th>
                              <th>Name</th>
                              <th>Age</th>
                              <th>Gender</th>
                              <th>Contact</th>
                              <th>Address</th>
                            </tr>

                            {selectedStudent && (
                              <tr>
                                <td>{selectedStudent.index + 1}</td>
                                <td>{selectedStudent.student_name}</td>
                                <td>{selectedStudent.age}</td>
                                <td>{selectedStudent.gender}</td>
                                <td>{selectedStudent.contact}</td>
                                <td>{selectedStudent.address}</td>
                              </tr>
                            )}
                          </table>
                        </Typography>
                      </DialogContent>
                    </BootstrapDialog>
                  </td>

                  <td
                    style={{
                      padding: "20px 3px",
                      color: "black",
                      fontFamily: "math",
                    }}
                  >
                    <Switch {...label} defaultChecked size="small" />
                  </td>

                  <td
                    style={{
                      padding: "20px 3px",
                      color: "black",
                      fontFamily: "math",
                    }}
                  >
                    <button
                      onClick={() => {
                        deleteData(item._id);
                      }}
                      style={{ border: "none", background: "none" }}
                    >
                      <DeleteIcon
                        sx={{
                          ":hover": { color: "rgb(255, 3, 3)" },
                          fontSize: "25px",
                        }}
                      />
                    </button>
                  </td>

                  <td
                    style={{
                      padding: "20px 3px",
                      color: "black",
                      fontFamily: "math",
                    }}
                  >
                    <button
                      onClick={() => {
                        editData(item);
                      }}
                      style={{ border: "none", background: "none" }}
                    >
                      <EditDocumentIcon
                        sx={{
                          ":hover": { color: "rgb(140, 7, 158)" },
                          fontSize: "25px",
                        }}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </Grid>
        </Grid>
      </Home>
    </>
  );
};

export default AddStudent;
