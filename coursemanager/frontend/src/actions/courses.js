import axios from "axios";
import { returnErrors, createMessage } from "./messages";
import { tokenConfig } from "./auth";
import { CREATE_COURSE, DELETE_COURSE, EDIT_COURSE } from "./types";

// create a course
export const createCourse = course => (dispatch, getState) => {
  return axios
    .post("/api/courses/", course, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: CREATE_COURSE,
        payload: res.data
      });
      dispatch(createMessage({ createCourse: "Course created" }));
      return true;
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      return false;
    });
};

// delete a course
export const deleteCourse = id => (dispatch, getState) => {
  return axios
    .delete(`/api/courses/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_COURSE,
        payload: id
      });
      dispatch(createMessage({ deleteCourse: "Course deleted" }));
      return true;
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      return false;
    });
};

// edit a course
export const editCourse = course => (dispatch, getState) => {
  return axios
    .patch(`/api/courses/${course.id}/`, course, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: EDIT_COURSE,
        payload: res.data
      });
      dispatch(createMessage({ editCourse: "Course edited" }));
      return true;
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      return false;
    });
};
