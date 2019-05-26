import { LOGIN } from "./types";

export const login = (credentials) => dispatch => {
    dispatch({
        type: LOGIN,
        // put in the fetch in here (use axios)
        payload: credentials
    });
};
