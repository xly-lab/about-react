import React, { useEffect, useMemo } from "react";
import ReactReduxContext from "../Context";
import Subscription from "../Subscription";

const { Provider } = ReactReduxContext;

export default function ReactReduxProvider({ store, children }) {
  const contextValue = useMemo(() => {
    const subScription = new Subscription(store);
    subScription.onStateChange = subScription.notifyNextSubs;
    return {
      store,
      subScription,
    };
  }, [store]);

  const previousState = useMemo(() => store.getState(), [store]);

  useEffect(() => {
    const { subScription } = contextValue;
    subScription.trySubScribe();
    if (previousState !== contextValue) {
      subScription.notifyNextSubs();
    }
  }, [contextValue, previousState]);

  return <Provider value={contextValue}> {children} </Provider>;
}
