import {combineReducers} from 'redux';
import auth from './auth';
import assignments from './assignments';
import errors from './errors';
import messages from './messages';

export default combineReducers({
  auth,
  assignments,
  errors,
  messages,
});
