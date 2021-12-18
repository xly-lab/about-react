import React, { useContext } from "react";
import "./App.css";
import "./redux.js";
import textContext from "./testContext";

function App(props) {
  const ctx = useContext(textContext);
  return ctx.color;
}

export default App;
