import {
  GET_STUDENT_ASSIGNMENT,
  EDIT_STUDENT_ASSIGNMENT,
} from '../actions/types';

const initialState = {
  assignment: null,
  studentAssignment: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STUDENT_ASSIGNMENT:
      return {
        ...state,
        studentAssignment: action.payload.student_assignment,
        assignment: action.payload.assignment,
      };
    case EDIT_STUDENT_ASSIGNMENT:
      return {
        ...state,
        studentAssignment: action.payload,
      };
    default:
      return state;
  }
}
