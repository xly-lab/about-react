import React from "react";
import ReactReduxContext from "../Context";

const { Provider } = ReactReduxContext;

export default function ReactReduxProvider({ store, children }) {
  return <Provider value={store}> {children} </Provider>;
}
