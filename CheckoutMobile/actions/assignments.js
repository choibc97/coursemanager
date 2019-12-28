import axios from 'axios';
import {returnErrors, createMessage} from './messages';
import {tokenConfig} from './auth';
import {GET_STUDENT_ASSIGNMENT, EDIT_STUDENT_ASSIGNMENT} from './types';

// get a student assignment by the email and assignment number
export const getStudentAssignment = (student, assignment) => (
  dispatch,
  getState,
) => {
  return axios
    .get(
      'http://masters.benjaminchoi.com/api/student_assignments',
      addStudentAndAssignmentToConfig(
        tokenConfig(getState),
        student,
        assignment,
      ),
    )
    .then(res => {
      dispatch({
        type: GET_STUDENT_ASSIGNMENT,
        payload: res.data,
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
  studentAssignment,
) => (dispatch, getState) => {
  return axios
    .patch(
      'http://masters.benjaminchoi.com/api/student_assignments',
      studentAssignment,
      addStudentAndAssignmentToConfig(
        tokenConfig(getState),
        student,
        assignment,
      ),
    )
    .then(res => {
      dispatch({
        type: EDIT_STUDENT_ASSIGNMENT,
        payload: res.data,
      });
      dispatch(createMessage({editStudentAssignment: 'Checkout successful'}));
      return res.data;
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      return null;
    });
};

// adds the given assignment and student to the given config as a param
export const addStudentAndAssignmentToConfig = (
  config,
  student,
  assignment,
) => {
  config.params = {student, assignment};
  return config;
};
