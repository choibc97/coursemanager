import { CHECKOUT, SCAN } from "./types";

export const scan = (code) => dispatch => {
    dispatch({
        type: SCAN,
        // put in the fetch in here (use axios)
        payload: (code)
    });
};

export const checkout = (student, ta) => dispatch => {
    dispatch({
        type: CHECKOUT,
        // put in the fetch in here (use axios)
        payload: (student, ta)
    });
};
