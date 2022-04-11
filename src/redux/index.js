import { combineReducers } from "redux";

import { github } from "./github";
import { auth } from "./auth";
import { todo } from "./todo";

export default combineReducers({
  github,
  auth,
  todo,
});
