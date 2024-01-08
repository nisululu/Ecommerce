import { CLEAR_ERRORS } from '../constants/userConstant'
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

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}