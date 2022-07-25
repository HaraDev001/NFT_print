import axios from "axios";
import jwt_decode from "jwt-decode";

import setAuthToken from "../utils/setAuthToken";
import { SET_CURRENT_USER, GET_ERRORS } from "./types";
const serverURL = require("../config.js").serverURL;

// Login - get user token
export const login = (userData, history) => dispatch => {
    axios
        .post(serverURL + "/users/login", userData)
        .then(res => {
            // Save to localStorage
            // Set token to localStorage
            if( res.data.status === "success") {
                const { token } = res.data;
                localStorage.setItem("jwtToken", token);
                // Set token to Auth header
                setAuthToken(token);
                // Decode token to get user data
                const decoded = jwt_decode(token);
                // dispatch({
                //     type: GET_ERRORS,
                //     payload: res.data.msg
                // })
                dispatch(setCurrentUser(decoded));
                history.push('/admin')
            }
            else{
                dispatch({
                    type: GET_ERRORS,
                    payload: res.data.msg
                })
            }
        })
        .catch(err =>
            {
                console.log(err);
                dispatch({
                    type: GET_ERRORS,
                    payload: err
                })
            }
        );
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// Log user out
export const logout = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
  };