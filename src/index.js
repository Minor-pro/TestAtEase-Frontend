import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
//import createHistory from "history/createBrowserHistory";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import App from "./App";
import rootReducer from "redux/reducers/rootReducer";


const saveToLocalStorage = (state) =>
{
  try
  {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  }
  catch(err)
  {
    console.log(err);
  }
}

const loadFromLocalStorage = () =>
{
  try
  {
    const serializedState = localStorage.getItem("state");
    if(serializedState == null) return undefined;
    return JSON.parse(serializedState);
  }
  catch(err)
  {
    console.log(err);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();
const store = createStore(rootReducer, persistedState, composeWithDevTools());
store.subscribe(() => saveToLocalStorage(store.getState()));

//const history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <Switch>
      <Route path="/" render={(props) => <App {...props} />} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
  </Provider>
  ,
  document.getElementById("root")
);

