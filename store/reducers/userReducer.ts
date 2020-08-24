import * as types from '../types';

const initialState = {
    users: [],
    user: {},
    loading: false,
    error: null,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USERS:
            return {
                ...state,
                // users: action.payload,
                loading: false,
                error: null
            }
        case types.EDIT_USER_BY_ID:
            const index = state.users.findIndex(user => user.id == action.payload.id);

            state.users[index] = action.payload;

            if (index > -1) {
                return {
                    ...state,
                    users: state.users,
                    user: {},
                    loading: false,
                    error: null
                }
            }
        case types.ADD_USER:
            return {
                ...state,
                users: state.users.concat({
                    ...action.payload,
                    id: Math.floor(Math.random() * 100)
                }),
                loading: false,
                error: null
            }
        case types.REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(user => user !== action.payload)
            }
        default:
            return state;
    }
}