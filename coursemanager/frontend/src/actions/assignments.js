import axios from "axios";
import { returnErrors, createMessage } from "./messages";
import { tokenConfig } from "./auth";
import {
  CREATE_ASSIGNMENT_GROUP,
  DELETE_ASSIGNMENT_GROUP,
  EDIT_ASSIGNMENT_GROUP,
  GET_ASSIGNMENT_GROUPS,
  GET_ASSIGNMENT_GROUP,
  CREATE_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  EDIT_ASSIGNMENT,
  GET_ASSIGNMENT,
  GET_STUDENT_ASSIGNMENT,
  EDIT_STUDENT_ASSIGNMENT
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

// delete an assignment group
export const deleteAssignmentGroup = id => (dispatch, getState) => {
  return axios
    .delete(`/api/assignment_groups/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_ASSIGNMENT_GROUP,
        payload: id
      });
      dispatch(
        createMessage({ deleteAssignmentGroup: "Assignment group deleted" })
      );
      return id;
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      return null;
    });
};

// edit an assignment group
export const editAssignmentGroup = assignmentGroup => (dispatch, getState) => {
  return axios
    .patch(
      `/api/assignment_groups/${assignmentGroup.id}/`,
      assignmentGroup,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: EDIT_ASSIGNMENT_GROUP,
        payload: res.data
      });
      dispatch(
        createMessage({ editAssignmentGroup: "Assignment group edited" })
      );
      return res.data;
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

// get a given assignment group
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

// create an assignment
export const createAssignment = assignment => (dispatch, getState) => {
  return axios
    .post("/api/assignments/", assignment, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: CREATE_ASSIGNMENT,
        payload: res.data
      });
      dispatch(createMessage({ createAssignment: "Assignment created" }));
      return res.data;
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      return null;
    });
};

// delete an assignment
export const deleteAssignment = id => (dispatch, getState) => {
  return axios
    .delete(`/api/assignments/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_ASSIGNMENT,
        payload: id
      });
      dispatch(createMessage({ deleteAssignment: "Assignment deleted" }));
      return id;
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      return null;
    });
};

// edit an assignment
export const editAssignment = assignment => (dispatch, getState) => {
  return axios
    .patch(
      `/api/assignments/${assignment.id}/`,
      assignment,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: EDIT_ASSIGNMENT,
        payload: res.data
      });
      dispatch(createMessage({ editAssignment: "Assignment edited" }));
      return res.data;
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      return null;
    });
};

// get an assignment
export const getAssignment = id => (dispatch, getState) => {
  axios
    .get(`/api/assignments/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ASSIGNMENT,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// get a student assignment by the email and assignment number
export const getStudentAssignment = (student, assignment) => (
  dispatch,
  getState
) => {
  return axios
    .get(
      "/api/student_assignments",
      addStudentAndAssignmentToConfig(
        tokenConfig(getState),
        student,
        assignment
      )
    )
    .then(res => {
      dispatch({
        type: GET_STUDENT_ASSIGNMENT,
        payload: res.data
      });
      return res.data;
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      return null;
    });
};

// update a student assignment by the email and assignment number
export const editStudentAssignment = (
  student,
  assignment,
  studentAssignment
) => (dispatch, getState) => {
  return axios
    .patch(
      "/api/student_assignments",
      studentAssignment,
      addStudentAndAssignmentToConfig(
        tokenConfig(getState),
        student,
        assignment
      )
    )
    .then(res => {
      dispatch({
        type: EDIT_STUDENT_ASSIGNMENT,
        payload: res.data
      });
      dispatch(createMessage({ editStudentAssignment: "Checkout successful" }));
      return res.data;
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      return null;
    });
};

// adds the given course to the given config as a param
export const addCourseToConfig = (config, course) => {
  config.params = { course };
  return config;
};

// adds the given assignment and student to the given config as a param
export const addStudentAndAssignmentToConfig = (
  config,
  student,
  assignment
) => {
  config.params = { student, assignment };
  return config;
};
