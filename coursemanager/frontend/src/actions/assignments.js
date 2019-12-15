import axios from "axios";
import { returnErrors, createMessage } from "./messages";
import { tokenConfig } from "./auth";
import { CREATE_ASSIGNMENT_GROUP } from "./types";

// create an assignment group
export const createAssignmentGroup = (assignmentGroup = (
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
      return res.data;
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      return null;
    });
});
