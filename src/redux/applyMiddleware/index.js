const applyMiddleware = (...middlewares) => {
    return (createStore) => {
        return (reducer, state) => {
            let store = createStore(reducer, state);
            let chain = middlewares.map((middleware) => middleware(store));
            let newDispatch = compose(chain);
            let dispatch = newDispatch(store.dispatch);
            return {
                ...store,
                dispatch,
            };
        };
    };
};

const compose = (middlewares) => {
    return middlewares.reduce((pre, cur) => (dispatch) => pre(cur(dispatch)));
};

export default applyMiddleware;