import React from "react";
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
import { Box, Grid, InputLabel, Paper, Select } from "@mui/material";
import { Field, Form, Formik } from "formik";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import DeleteIcon from "@mui/icons-material/Delete";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const FeesDetails = () => {
  const studentList = [];
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
                Fees Details
              </Button>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                  Fees Details
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
                  <Formik>
                    <Form>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Full Name
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          sx={{ width: "100%", mb: 2 }}
                          label="Full Name"
                        ></Select>
                      </FormControl>

                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Select Stream
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          sx={{ width: "100%", mb: 2 }}
                          label="Stream/Class"
                        ></Select>
                      </FormControl>

                      <Field
                        name="paid"
                        as={TextField}
                        label="Paid Amount"
                        sx={{ width: "100%", mb: 2 }}
                      ></Field>

                      <Field
                        name="remain"
                        as={TextField}
                        label="Remaining Amount"
                        sx={{ width: "100%", mb: 2 }}
                      ></Field>

                      <DialogActions>
                        <Button
                          variant="contained"
                          autoFocus
                          onClick={handleClose}
                        >
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
                    Paid Amount
                  </th>
                  <th
                    style={{
                      padding: "20px 3px",
                      color: "white",
                      fontFamily: "math",
                      fontSize: "14px",
                    }}
                  >
                    Remaining Amount
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
              <tbody>
                <tr style={{ textAlign: "center" }}>
                  <td
                    style={{
                      padding: "20px 3px",
                      color: "black",
                      fontFamily: "math",
                      fontSize: "14px",
                    }}
                  >
                    No
                  </td>

                  <td
                    style={{
                      padding: "20px 3px",
                      color: "black",
                      fontFamily: "math",
                      fontSize: "14px",
                    }}
                  >
                    Maulik khambhdiya
                  </td>

                  <td
                    style={{
                      padding: "20px 3px",
                      color: "black",
                      fontFamily: "math",
                      fontSize: "14px",
                    }}
                  >
                    Stream
                  </td>

                  <td
                    style={{
                      padding: "20px 3px",
                      color: "black",
                      fontFamily: "math",
                      fontSize: "14px",
                    }}
                  >
                    454
                  </td>

                  <td
                    style={{
                      padding: "20px 3px",
                      color: "black",
                      fontFamily: "math",
                      fontSize: "14px",
                    }}
                  >
                    12511
                  </td>

                  <td
                    style={{
                      padding: "20px 3px",
                      color: "black",
                      fontFamily: "math",
                    }}
                  >
                    <button style={{ border: "none", background: "none" }}>
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
                    <button style={{ border: "none", background: "none" }}>
                      <EditDocumentIcon
                        sx={{
                          ":hover": { color: "rgb(140, 7, 158)" },
                          fontSize: "25px",
                        }}
                      />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Grid>
        </Grid>
      </Home>
    </>
  );
};

export default FeesDetails;
