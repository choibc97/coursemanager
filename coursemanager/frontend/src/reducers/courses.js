import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  CREATE_COURSE,
  DELETE_COURSE,
  EDIT_COURSE
} from "../actions/types";
import { sortCourseByCourseId } from "../actions/utility";

const initialState = {
  instructorCourses: [],
  taCourses: [],
  studentCourses: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case USER_LOADED:
      return {
        ...state,
        instructorCourses: action.payload.instructor_courses,
        taCourses: action.payload.ta_courses,
        studentCourses: action.payload.student_courses
      };
    case CREATE_COURSE:
      return {
        ...state,
        instructorCourses: [action.payload, ...state.instructorCourses].sort(
          sortCourseByCourseId
        )
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
        instructorCourses: state.instructorCourses
          .map(course =>
            course.id === action.payload.id ? action.payload : course
          )
          .sort(sortCourseByCourseId)
      };
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        instructorCourses: [],
        taCourses: [],
        studentCourses: []
      };
    default:
      return state;
  }
}
