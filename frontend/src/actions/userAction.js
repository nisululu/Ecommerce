import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    LOGOUT_SUCCESS,
    ADMIN_USER_FAIL,
    ADMIN_USER_REQUEST,
    ADMIN_USER_SUCCESS,
    CLEAR_ERRORS,
    DELETE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL
} from '../constants/userConstant'
import axios from 'axios'

//User Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })

        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.post(
            `/api/v1/login`,
            { email, password },
            config
        )

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

//User Registeration
export const signup = (userData) => async (dispatch) => {
    try {
        dispatch({ type: SIGNUP_REQUEST })

        const config = { headers: { "Content-Type": "multipart/form-data" } }

        const { data } = await axios.post(
            `/api/v1/register`,
            userData,
            config
        )

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SIGNUP_FAIL,
            payload: error.response.data.message
        })
    }
}

//Load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await axios.get(`/api/v1/me`)

        dispatch({ type: LOAD_USER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Logout User
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/logout`)

        dispatch({ type: LOGOUT_SUCCESS })
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message })
    }
}

//Update Profile
export const updateProfilee = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const config = { headers: { "Content-Type": "multipart/form-data" } }

        const { data } = await axios.put(
            "/api/v1/me/update",
            userData,
            config
        )

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payolad: error.response.data.message
        })
    }
}

export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.put(
            `/api/v1/password/update`,
            passwords,
            config
        )

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

//Get all users -- Admin
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_USER_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/users`)

        dispatch({
            type: ADMIN_USER_SUCCESS,
            payload: data.users
        })
    } catch (error) {
        dispatch({ type: ADMIN_USER_FAIL })
    }
}

//Get User's Details -- Admin
export const getUserDetails = (id) => async(dispatch) => {
    try {
        dispatch({ type: USER_DETAIL_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/user/${id}`)

        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({ type: USER_DETAIL_FAIL })
    }
}

//Delete User -- Admin
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/user/${id}`)

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({ type: DELETE_USER_FAIL })
    }
}

//Update User -- Admin
export const updateUser = (id, updatedData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST })

        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/v1/admin/user/${id}`, updatedData, config)

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({ type: UPDATE_USER_FAIL })
    }
}

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}