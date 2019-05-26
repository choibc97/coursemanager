import { CHECKOUT, SCAN } from "../actions/types";

import typeToReducer from "type-to-reducer";

const initialState = {
    isPending: false,
    response: null,
    error: null,
    code: null,
};

export default typeToReducer({
    [CHECKOUT]: {
        PENDING: () => ({
            ...initialState,
            isPending: true
        }),
        FULFILLED: (state, action) => ({
            ...initialState,
            response: action.payload
        }),
        REJECTED: (state, action) => ({
            ...initialState,
            error: action.payload
        })
    },
    [SCAN]: {
        PENDING: () => ({
            ...initialState,
            isPending: true
        }),
        FULFILLED: (state, action) => ({
            response: action.payload
        }),
        REJECTED: (state, action) => ({
            ...initialState,
            error: action.payload
        })
    }
}, initialState);
