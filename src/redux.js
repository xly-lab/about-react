import redux from "./reduex1";
import { logger } from "./reduex1/middleware/logger";
const { createStore, combinerReducers, applyMiddleware } = redux;
let countState = {
    count: 0,
};
let mikeState = {
    mike: 0,
};

const reducer = (state = countState, action) => {
    switch (action.type) {
        case "A":
            return {...state, count: state.count + 12 };
        case "B":
            return {...state, count: state.count - 1 };
        default:
            return state;
    }
};
const reducer1 = (state = mikeState, action) => {
    switch (action.type) {
        case "C":
            return {...state, mike: state.mike + 12 };
        case "D":
            return {...state, mike: state.mike - 1 };
        default:
            return state;
    }
};

let store = createStore(
    combinerReducers({ reducer, reducer1 }),
    applyMiddleware(logger)
);

store.dispatch({ type: "A" });
store.dispatch({ type: "B" });
store.dispatch({ type: "C" });
store.dispatch({ type: "D" });