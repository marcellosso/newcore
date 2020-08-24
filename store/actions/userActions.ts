import * as types from '../types';

export const getusers = () => dispatch => {
    dispatch({
        type: types.GET_USERS,
        // payload: dados
    })
}

export const adduser = dado => dispatch => {
    dispatch({
        type: types.ADD_USER,
        payload: dado
    })
}

export const removeuser = dado => dispatch => {
    dispatch({
        type: types.REMOVE_USER,
        payload: dado
    })
}

export const editbyid = (dado) => dispatch => {
    dispatch({
        type: types.EDIT_USER_BY_ID,
        payload: dado,
    })
}