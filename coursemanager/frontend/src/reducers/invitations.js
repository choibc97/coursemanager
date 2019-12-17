import {
  INVITATION_LOADING,
  GET_INVITATION,
  INVITATION_ERROR
} from "../actions/types";

const initialState = {
  isLoading: true,
  registerInvitation: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INVITATION_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_INVITATION:
      return {
        ...state,
        isLoading: false,
        registerInvitation: action.payload
      };
    case INVITATION_ERROR:
      return {
        ...state,
        isLoading: false,
        registerInvitation: null
      };
    default:
      return state;
  }
}
