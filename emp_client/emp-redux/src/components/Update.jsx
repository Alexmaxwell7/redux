import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  makeStyles,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getUserById, updateUserById } from "./../redux/action/emp";

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

function Update() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.employee?.loading);
  const user = useSelector((state) => state.employee?.item);
  const [inputs, setInputs] = useState({
    id: "",
    emp_name: "",
    emp_role: "",
    emp_email:"",
    emp_salary:"",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      setInputs(user);
    }
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (!inputs.emp_name || !inputs.emp_role || !inputs.emp_email || !inputs.emp_salary || !inputs.id) {
      return;
    }
    dispatch(updateUserById(id, inputs, navigate));
  }

  return (
    <React.Fragment>
      <h1 style={{ textAlign: "center" }}>Update User</h1>
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

export default Update;
