import {
  CREATE_ASSIGNMENT_GROUP,
  GET_ASSIGNMENT_GROUPS
} from "../actions/types";
import { sortAssignmentGroupByPoints } from "../actions/utility";

const initialState = {
  assignmentGroups: []
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
    default:
      return state;
  }
}
