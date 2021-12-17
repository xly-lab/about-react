import createStore from "./store";
import logger from "./middlewares/logger";
import applyMiddleware from "./applyMiddleware";
import combineReducers from "./combineReducers";

let countState = {
  count: 0,
};
let mikeState = {
  mike: 0,
};

const reducer = (state = countState, action) => {
  switch (action.type) {
    case "A":
      return { count: state.count + 1 };
    case "B":
      return { count: state.count - 1 };
    default:
      return state;
  }
};
const reducer1 = (state = mikeState, action) => {
  switch (action.type) {
    case "C":
      return { mike: state.mike + 1 };
    case "D":
      return { mike: state.mike - 1 };
    default:
      return state;
  }
};

let store_ = createStore(
  combineReducers({ reducer, reducer1 }),
  applyMiddleware(logger)
);
console.log(store_);

store_.dispatch({ type: "A" });
store_.dispatch({ type: "B" });
store_.dispatch({ type: "C" });
store_.dispatch({ type: "D" });
