import { combineReducers } from "redux";
import user from "./user";
import app from "./app";
import tags from './tags';
import settings from './settings';
export default combineReducers({
  user,
  app,
  tags,
  settings
});