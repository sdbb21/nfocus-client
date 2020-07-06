import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import score from "./score/reducer";

export default combineReducers({
  appState,
  user,
  score,
});
