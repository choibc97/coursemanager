import { combineReducers } from "redux";

import authReducer from "../reducers/authReducer";
import checkoutReducer from "../reducers/checkoutReducer";

export default combineReducers({
    auth: authReducer,
    checkout: checkoutReducer,
});
