import React, { useEffect, useState } from "react";
import Home from "./Home";
import FormControl from "@mui/material/FormControl";
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
import { Box, Grid, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import { Field, Form, Formik } from "formik";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Academyperformance = () => {
  const [academicList, setAcademicList] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const token = "Bmd2OPMgVDRCEp5n";
  const [studentList1, setStudentList1] = useState([]);
  const [sList, setSList] = useState([]);

  const [editId, setEditId] = useState(null);
  const userId = localStorage.getItem("token");

  const [ini, setIni] = useState({
    student_name: "",
    stream: "",
    class_rank: "",
    percentage: 0,
    teacher_commit: "",
    user: null,
  });

  useEffect(() => {
    viewPerformance();
    viewData()
  }, []);

  function viewData() {

    axios
      .get("https://generateapi.onrender.com/api/student_details", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setStudentList1(res.data.Data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get("https://generateapi.onrender.com/api/stream", {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        setSList(res.data.Data)

      })
      .catch((error) => {
        console.log(error)
      })
  }





  function viewPerformance() {
    axios
      .get("https://generateapi.onrender.com/api/academic_performance", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setAcademicList(res.data.Data);
        console.log(res.data.Data);

      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleData = (values) => {


    console.log("Submitting payload:", values);

    values.user = userId;

    const { _id, ...rest } = values;

    rest.user = userId;

    if (editId != null) {
      axios
        .patch(
          `https://generateapi.onrender.com/api/academic_performance/${editId}`,
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
          viewPerformance();
          setIni({
            student_name: "",
            stream: "",
            class_rank: "",
            percentage: 0,
            teacher_commit: "",
            user: null,
          });

          setOpen(false);
        })
        .catch((error) => {
          console.log(error);
        });

    }

    else {
      axios
        .post(
          "https://generateapi.onrender.com/api/academic_performance",
          values,
          {
            headers: {
              Authorization: token,
            },
          }
        )

        .then((res) => {
          console.log("Data Added Successfully");
          viewPerformance();
          setOpen(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const deleteData = (deleteId) => {
    axios
      .delete(
        `https://generateapi.onrender.com/api/academic_performance/${deleteId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log("Data Deleted Successfully");
        viewPerformance();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editData = (item) => {
    setAcademicList(item);
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
                    options={null}
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
                Add Performance
              </Button>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                  Academic Performance
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
                  <Formik initialValues={ini} onSubmit={handleData}>
                    <Form>
                      <Field name="student_name">
                        {({ field }) => (
                          <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel id="student-label">Full Name</InputLabel>
                            <Select
                              labelId="student-label"
                              label="Full Name"
                              {...field}
                            >
                              {studentList1.map((item) => (
                                <MenuItem key={item._id} value={item._id}>
                                  {item.student_name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="stream">
                        {({ field }) => (
                          <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel id="stream-label">Select Stream</InputLabel>
                            <Select
                              labelId="stream-label"
                              label="Select Stream"
                              {...field}
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
                        name="rank"
                        as={TextField}
                        label="Class Rank"
                        sx={{ width: "100%", mb: 2 }}
                      ></Field>

                      <Field
                        name="percentage"
                        as={TextField}
                        type="number"
                        label="GPA/Percentage"
                        sx={{ width: "100%", mb: 2 }}
                      ></Field>

                      <Field
                        name="remark"
                        as={TextField}
                        label="Teacher's Comments"
                        sx={{ width: "100%", mb: 2 }}
                      ></Field>

                      <DialogActions>
                        <Button variant="contained" autoFocus type="submit">
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
                <tr style={{ border: "1px solid black" }}>
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
                    Rank
                  </th>

                  <th
                    style={{
                      padding: "20px 3px",
                      color: "white",
                      fontFamily: "math",
                      fontSize: "14px",
                    }}
                  >
                    Percentage
                  </th>
                  <th
                    style={{
                      padding: "20px 3px",
                      color: "white",
                      fontFamily: "math",
                      fontSize: "14px",
                    }}
                  >
                    Comments
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
              {academicList.map((item, index) => (
                <tr style={{ textAlign: "center", border: "1px solid black" }}>
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
                    {item.full_name.student_name}
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
                      fontSize: "14px",
                    }}
                  >
                    {item.class_rank}



                  </td>

                  <td
                    style={{
                      padding: "20px 3px",
                      color: "black",
                      fontFamily: "math",
                      fontSize: "14px",
                    }}
                  >
                    {item.percentage + " %"}
                  </td>

                  <td
                    style={{
                      padding: "20px 3px",
                      color: "black",
                      fontFamily: "math",
                      fontSize: "14px",
                    }}
                  >
                    {item.teacher_commit}
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

export default Academyperformance;
