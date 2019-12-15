import { CREATE_ASSIGNMENT_GROUP } from "../actions/types";

const initialState = {
  assignmentGroups: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_ASSIGNMENT_GROUP:
      return {
        ...state,
        assignmentGroups: [action.payload, ...state.assignmentGroups]
      };
    default:
      return state;
  }
}
