import axios from "axios";
import { returnErrors, createMessage } from "./messages";
import { GET_INVITATION, INVITATION_ERROR } from "./types";

// get an invitation from a token
export const getInvitation = token => dispatch => {
  axios
    .get("/api/register_invitation", invitationConfig(token))
    .then(res => {
      dispatch({
        type: GET_INVITATION,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: INVITATION_ERROR });
    });
};

export const invitationConfig = token => {
  // headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    },
    params: {
      token
    }
  };

  return config;
};
