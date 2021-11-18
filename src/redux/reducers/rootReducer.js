import { combineReducers } from "redux";
import questionImageReducer from "./questionImageReducer";
import searchReducer from "./searchReducer";
import testReducer from "./testReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  questionImage: questionImageReducer,
  test : testReducer,
  search : searchReducer
});

export default rootReducer;