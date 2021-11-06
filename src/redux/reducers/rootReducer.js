import { combineReducers } from "redux";
import questionImageReducer from "./questionImageReducer";
import testReducer from "./testReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  questionImage: questionImageReducer,
  test : testReducer
});

export default rootReducer;