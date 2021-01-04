import { combineReducers } from "redux";
import user from "./user";
import app from "./app";
import tags from './tags';
export default combineReducers({
  user,
  app,
  tags
});