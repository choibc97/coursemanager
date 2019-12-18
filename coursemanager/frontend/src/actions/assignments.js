import axios from "axios";
import { returnErrors, createMessage } from "./messages";
import { tokenConfig } from "./auth";
import {
  CREATE_ASSIGNMENT_GROUP,
  GET_ASSIGNMENT_GROUPS,
  GET_ASSIGNMENT_GROUP
} from "./types";

// create an assignment group
export const createAssignmentGroup = assignmentGroup => (
  dispatch,
  getState
) => {
  return axios
    .post("/api/assignment_groups/", assignmentGroup, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: CREATE_ASSIGNMENT_GROUP,
        payload: res.data
      });
      dispatch(
        createMessage({ createAssignmentGroup: "Assignment group created" })
      );
      return res;
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      return null;
    });
};

// get assignment groups for a course
export const getAssignmentGroups = course => (dispatch, getState) => {
  axios
    .get(
      "/api/assignment_groups/",
      addCourseToConfig(tokenConfig(getState), course)
    )
    .then(res => {
      dispatch({
        type: GET_ASSIGNMENT_GROUPS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const getAssignmentGroup = id => (dispatch, getState) => {
  axios
    .get(`/api/assignment_groups/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ASSIGNMENT_GROUP,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// adds the given course to the given config as a param
export const addCourseToConfig = (config, course) => {
  config.params = { course };
  return config;
};
