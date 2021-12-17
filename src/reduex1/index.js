const createStore = (reducer, enhancer) => {
    let state = {};
    let listeners = [];

    if (enhancer !== null && typeof enhancer === "function") {
        return enhancer(createStore)(reducer);
    }
    const getState = () => state;
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((fn) => fn && fn());
    };
    const subscribe = (listener) => {
        listeners.push(listener);
    };
    return {
        getState,
        dispatch,
        subscribe,
    };
};

const combinerReducers = (reducers) => {
    let newState = {};
    return (state = {}, action) => {
        let keys = Object.keys(reducers);
        keys.forEach((key) => {
            newState[key] = reducers[key](state[key], action);
        });
        return newState;
    };
};

const applyMiddleware = (...middlewares) => {
    return (createStore) => {
        return (reducer, state) => {
            let store = createStore(reducer, state);
            let chain = middlewares.map((middleware) => middleware(store));
            let newDispatch = compose(chain)(store.dispatch);
            return {
                ...store,
                dispatch: newDispatch,
            };
        };
    };
};

const compose = (fns) =>
    fns.reduce((pre, fn) => (dispatch) => pre(fn(dispatch)));

const redux = { createStore, combinerReducers, applyMiddleware };

export default redux;