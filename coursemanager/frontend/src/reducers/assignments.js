import {
  CREATE_ASSIGNMENT_GROUP,
  DELETE_ASSIGNMENT_GROUP,
  EDIT_ASSIGNMENT_GROUP,
  GET_ASSIGNMENT_GROUPS,
  GET_ASSIGNMENT_GROUP,
  CREATE_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  GET_ASSIGNMENT,
  GET_STUDENT_ASSIGNMENT,
  EDIT_STUDENT_ASSIGNMENT
} from "../actions/types";
import {
  sortAssignmentGroupByPoints,
  sortAssignmentsByDueDate
} from "../actions/utility";

const initialState = {
  assignmentGroups: [],
  assignmentGroup: null,
  assignments: [],
  assignment: null,
  studentAssignments: [],
  studentAssignment: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_ASSIGNMENT_GROUP:
      return {
        ...state,
        assignmentGroups: [action.payload, ...state.assignmentGroups]
          .sort(sortAssignmentGroupByPoints)
          .reverse(),
        assignmentGroup: action.payload
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
    case EDIT_ASSIGNMENT_GROUP:
      return {
        ...state,
        assignmentGroups: state.assignmentGroups
          .map(group =>
            group.id === action.payload.id ? action.payload : group
          )
          .sort(sortAssignmentGroupByPoints),
        assignmentGroup: action.payload
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
    case DELETE_ASSIGNMENT:
      return {
        ...state,
        assignments: state.assignments.filter(
          assignment => assignment.id != action.payload
        ),
        assignment: null,
        studentAssignments: []
      };
    case GET_ASSIGNMENT:
      return {
        ...state,
        assignment: action.payload.assignment,
        studentAssignments: action.payload.student_assignments
      };
    case GET_STUDENT_ASSIGNMENT:
      return {
        ...state,
        studentAssignment: action.payload.student_assignment,
        assignment: action.payload.assignment
      };
    case EDIT_STUDENT_ASSIGNMENT:
      return {
        ...state,
        studentAssignment: action.payload
      };
    default:
      return state;
  }
}
