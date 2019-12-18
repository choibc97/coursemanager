import {
  CREATE_ASSIGNMENT_GROUP,
  GET_ASSIGNMENT_GROUPS,
  GET_ASSIGNMENT_GROUP
} from "../actions/types";
import { sortAssignmentGroupByPoints } from "../actions/utility";

const initialState = {
  assignmentGroups: [],
  assignmentGroup: null,
  assignments: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_ASSIGNMENT_GROUP:
      return {
        ...state,
        assignmentGroups: [action.payload, ...state.assignmentGroups]
          .sort(sortAssignmentGroupByPoints)
          .reverse()
      };
    case GET_ASSIGNMENT_GROUPS:
      return {
        ...state,
        assignmentGroups: action.payload
      };
    case GET_ASSIGNMENT_GROUP:
      return {
        ...state,
        assignmentGroup: action.payload.assignment_group,
        assignments: action.payload.assignments
      };
    default:
      return state;
  }
}
