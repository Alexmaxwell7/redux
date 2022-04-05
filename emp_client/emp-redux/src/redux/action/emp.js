import {
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    GET_USER_BYID_REQUEST,
    GET_USER_BYID_SUCCESS,
    GET_USER_BYID_FAILURE,
    UPDATE_USER_BYID_REQUEST,
    UPDATE_USER_BYID_SUCCESS,
    UPDATE_USER_BYID_FAILURE,
    DELETE_USER_BYID_REQUEST,
    DELETE_USER_BYID_SUCCESS,
    DELETE_USER_BYID_FAILURE,
  } from "./emptype";
  const api_url = "http://localhost:5000";
  const axios = require("axios");
  
  export function createUser(data, navigate) {
    return (dispatch) => {
      dispatch({ type: CREATE_USER_REQUEST });
      axios
        .post(`${api_url}/addemployee`, data)
        .then(function (res) {
          console.log("res=>", res.data);
          setTimeout(() => {
            dispatch({
              type: CREATE_USER_SUCCESS,
              payload: res.data,
            });
            navigate("/", { replace: true });
          }, 1000);
        })
        .catch(function (error) {
          const { response } = error;
          console.log("err", response);
          if (response !== undefined) {
            dispatch({
              type: CREATE_USER_FAILURE,
              payload: response.data,
            });
            alert(response.data?.message);
          }
        });
    };
  }
  
  export function getUsers() {
    return (dispatch) => {
      dispatch({ type: GET_USER_REQUEST });
      axios
        .get(`http://localhost:5000/getemployee`)
        .then(function (res) {
          console.log("getemployeedetails =>", res.data);
          dispatch({
            type: GET_USER_SUCCESS,
            payload: res.data,
          });
        })
        .catch(function (error) {
          const { response } = error;
          console.log("err", response);
          if (response !== undefined) {
            dispatch({
              type: GET_USER_FAILURE,
              payload: response?.data,
            });
          }
        });
    };
  }
  
  export function getUserById(id) {
    return (dispatch) => {
      dispatch({ type: GET_USER_BYID_REQUEST });
      axios
        .get(`${api_url}/getemployeeId/${id}`)
        .then(function (res) {
          console.log("res =>", res.data);
          dispatch({
            type: GET_USER_BYID_SUCCESS,
            payload: res.data,
          });
        })
        .catch(function (error) {
          const { response } = error;
          console.log("err", response);
          if (response !== undefined) {
            dispatch({
              type: GET_USER_BYID_FAILURE,
              payload: response.data,
            });
          }
        });
    };
  }
  
  export function updateUserById(id, data, navigate) {
    return (dispatch) => {
      dispatch({ type: UPDATE_USER_BYID_REQUEST });
      axios
        .put(`${api_url}/editemployee/${id}`, data)
        .then(function (res) {
          console.log("res=>", res.data);
          setTimeout(() => {
            dispatch({
              type: UPDATE_USER_BYID_SUCCESS,
              payload: res.data,
            });
            navigate("/", { replace: true });
          }, 1000);
        })
        .catch(function (error) {
          const { response } = error;
          console.log("err", response);
          if (response !== undefined) {
            dispatch({
              type: UPDATE_USER_BYID_FAILURE,
              payload: response.data,
            });
            alert(response.data?.message);
          }
        });
    };
  }
  
  export function deleteUserById(id) {
    return (dispatch) => {
      dispatch({ type: DELETE_USER_BYID_REQUEST });
      axios
        .delete(`${api_url}/deleteemployee/${id}`)
        .then(function (res) {
          console.log("res =>", res.data);
          dispatch({
            type: DELETE_USER_BYID_SUCCESS,
            payload: id,
          });
        })
        .catch(function (error) {
          const { response } = error;
          console.log("err", response);
          if (response !== undefined) {
            dispatch({
              type: DELETE_USER_BYID_FAILURE,
              payload: response.data,
            });
            alert(response.data?.message);
          }
        });
    };
  }
  