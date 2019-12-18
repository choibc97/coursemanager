import {
  CREATE_ASSIGNMENT_GROUP,
  DELETE_ASSIGNMENT_GROUP,
  GET_ASSIGNMENT_GROUPS,
  GET_ASSIGNMENT_GROUP,
  CREATE_ASSIGNMENT
} from "../actions/types";
import {
  sortAssignmentGroupByPoints,
  sortAssignmentsByDueDate
} from "../actions/utility";

const initialState = {
  assignmentGroups: [],
  assignmentGroup: null,
  assignments: [],
  assignment: null
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
    case DELETE_ASSIGNMENT_GROUP:
      return {
        ...state,
        assignmentGroups: state.assignmentGroups.filter(
          group => group.id != action.payload
        ),
        assignmentGroup: null,
        assignments: []
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
    case CREATE_ASSIGNMENT:
      return {
        ...state,
        assignments: [action.payload, ...state.assignments].sort(
          sortAssignmentsByDueDate
        ),
        assignment: action.payload
      };
    default:
      return state;
  }
}
