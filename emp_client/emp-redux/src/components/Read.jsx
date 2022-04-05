import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  useTheme,
  AppBar,
  Toolbar,
  Typography,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  useMediaQuery,
} from "@material-ui/core";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Send as SendIcon 
} from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUserById } from "./../redux/action/emp";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  button: {
    margin: theme.spacing(1),
  },
  table: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
}));

function Read() {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.employee?.loading);
  const users = useSelector((state) => state.employee?.items);
  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    console.log('loading', loading)
    if (!loading) {
      setOpen(loading);
    }
  }, [loading]);

  const openDialog = (_id) => {
    setOpen(true);
    setUserId(_id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmDelete = () => {
    dispatch(deleteUserById(userId));
  };
  return (
    <React.Fragment>
      <AppBar position="static">
          <Typography variant="h6" className={classes.title} style={{backgroundColor:'black'}}>
             React Redux Thunk
          </Typography>
      </AppBar>
      <Link to="/create">
        <Button
         variant="contained"
         size="large"
          className={classes.button}
          startIcon={<SendIcon />}
          style={{backgroundColor:'lightgreen'}}
        >
          Create User
        </Button>
      </Link>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>CreatedAt</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item,index) => (
              <TableRow key={item._id}>
                 <TableCell>{index + 1}</TableCell>
                 <TableCell>{item.id}</TableCell>
                <TableCell>{item.emp_name}</TableCell>
                <TableCell>{item.emp_role}</TableCell>
                <TableCell>{item.emp_email}</TableCell>
                <TableCell>{item.emp_salary}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>
                  <Link to={`/update/${item._id}`}>
                    <EditIcon>edit</EditIcon>
                  </Link>
                </TableCell>
                <TableCell>
                  <DeleteIcon onClick={() => openDialog(item._id)}>
                    delete
                  </DeleteIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {open && (
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="Delete User"
        >
          <DialogContent style={{ width: 300 }}>
            <DialogContentText>Are you sure?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  );
}

export default Read;
