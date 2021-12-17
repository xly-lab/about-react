const createStore = (reducer, enhancer) => {
    let state = {};
    let listeners = [];

    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener);
    };

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((item) => item && item());
    };

    if (enhancer && typeof enhancer === "function") {
        return enhancer(createStore)(reducer);
    }

    return {
        getState,
        dispatch,
        subscribe,
    };
};

export default createStore;