const combineReducers = (reducers) => {
    let newState = {};

    return (state = {}, action) => {
        let keys = Object.keys(reducers);

        keys.forEach((item) => {
            newState[item] = reducers[item](state[item], action);
        });
        return newState;
    };
};

export default combineReducers;