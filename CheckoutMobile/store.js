import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import logger from "redux-logger";

import rootReducer from "./reducers/index";

const initialState = {};

const middleware = [thunk, logger, promise];

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
);

export default store;
