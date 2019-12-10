import {
  LOGIN_SUCCESS,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT_SUCCESS
} from "../actions/types";

const initialState = {
  isLoading: false,
  instructorCourses: [],
  taCourses: [],
  studentCourses: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_SUCCESS:
    case USER_LOADED:
      return {
        isLoading: false,
        instructorCourses: action.payload.instructor_courses,
        taCourses: action.payload.ta_courses,
        studentCourses: action.payload.student_courses
      };
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
      return {
        isLoading: false,
        instructorCourses: [],
        taCourses: [],
        studentCourses: []
      };
    default:
      return state;
  }
}
