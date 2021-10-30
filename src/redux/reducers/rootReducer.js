import { combineReducers } from "redux";
import questionImageReducer from "./questionImageReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  questionImage: questionImageReducer
});

export default rootReducer;