export const logger = (store) => {
    return (dispatch) => {
        return (action) => {
            console.group(action.type);
            console.log("dispatching", action);
            let result = dispatch(action);
            console.log("result ==================>", result);
            console.log("next state", store.getState());
            console.groupEnd();
        };
    };
};