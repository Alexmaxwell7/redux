import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  makeStyles,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { createUser } from "./../redux/action/emp";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
    buttonProgress: {
      color: "#fff",
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
  },
}));

function Create() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.users?.loading);
  const [inputs, setInputs] = useState({
    id: "",
    emp_name: "",
    emp_role: "",
    emp_email:"",
    emp_salary:"",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    handleValidate(inputs);
  }, [inputs]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (handleValidate(inputs)) {
      dispatch(createUser(inputs, navigate));
    }
  }

  function handleValidate(values) {
    let errors = {};
    let isValid = true;
    if (!values["id"]) {
      isValid = false;
      errors["id"] = "Please enter id";
    }
    if (!values["emp_name"]) {
      isValid = false;
      errors["emp_name"] = "Please enter  name.";
    }
    if (!values["emp_role"]) {
      isValid = false;
      errors["emp_role"] = "Please enter role";
    }
    if (!values["emp_email"]) {
      isValid = false;
      errors["emp_email"] = "Please enter email";
    }
    if (!values["emp_salary"]) {
      isValid = false;
      errors["emp_salary"] = "Please enter salary";
    }
    setErrors(errors);
    return isValid;
  }

  return (
    <React.Fragment>
      <h1 style={{ textAlign: "center" }}>Create User</h1>
      <form
        className={classes.root}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          type="text"
          name="id"
          label="ID"
          value={inputs.id}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          type="text"
          name="emp_name"
          label="Name"
          value={inputs.emp_name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          type="text"
          name="emp_role"
          label="Role"
          value={inputs.emp_role}
          onChange={handleChange}
          fullWidth
        />
         <TextField
          type="email"
          name="emp_email"
          label="Email"
          value={inputs.emp_email}
          onChange={handleChange}
          fullWidth
        />
         <TextField
          type="text"
          name="emp_salary"
          label="Salary"
          value={inputs.emp_salary}
          onChange={handleChange}
          fullWidth
        />
        <Button
          disabled={loading}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </form>
    </React.Fragment>
  );
}

export default Create;
