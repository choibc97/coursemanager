import {
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  CREATE_COURSE,
  DELETE_COURSE,
  EDIT_COURSE
} from "../actions/types";

const initialState = {
  instructorCourses: [],
  taCourses: [],
  studentCourses: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case USER_LOADED:
      return {
        instructorCourses: action.payload.instructor_courses,
        taCourses: action.payload.ta_courses,
        studentCourses: action.payload.student_courses
      };
    case CREATE_COURSE:
      return {
        ...state,
        instructorCourses: [action.payload, ...state.instructorCourses]
      };
    case DELETE_COURSE:
      return {
        ...state,
        instructorCourses: state.instructorCourses.filter(
          course => course.id != action.payload
        )
      };
    case EDIT_COURSE:
      return {
        ...state,
        instructorCourses: state.instructorCourses.map(course =>
          course.id === action.payload.id ? action.payload : course
        )
      };
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
      return {
        instructorCourses: [],
        taCourses: [],
        studentCourses: []
      };
    default:
      return state;
  }
}
