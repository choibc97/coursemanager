import { LOGIN } from "../actions/types";

import typeToReducer from "type-to-reducer";

const initialState = {
    isPending: false,
    response: null,
    error: null,
};

export default typeToReducer({
    [LOGIN]: {
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
    }
}, initialState);
