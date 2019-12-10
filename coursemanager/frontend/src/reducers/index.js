import { combineReducers } from "redux";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import courses from "./courses";

export default combineReducers({ errors, messages, auth, courses });
