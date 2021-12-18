import React from "react";
import ReactDOM from "react-dom";
import App1 from "./App1";
import "./index.css";
import ReactReduxProvider from "./reactRedux/Provider";
import reportWebVitals from "./reportWebVitals";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <ReactReduxProvider store={store}>
      <App1 />
    </ReactReduxProvider>{" "}
    {/* </Provider> */}{" "}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
