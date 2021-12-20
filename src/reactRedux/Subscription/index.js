class Subscription {
    constructor(store, parentSub) {
        this.store = store;
        this.parentSub = parentSub;
        this.listeners = [];
    }

    // 子组件注册回调到 subScription ；
    addNextSubs = (listener) => {
        this.listeners.push(listener);
    };

    // 执行子组件的回调
    notifyNextSubs = () => {
        this.listeners.forEach((fn) => {
            fn && fn();
        });
    };

    // 回调函数的包装
    handleChangeSwapper = () => {
        if (this.onStateChange) {
            this.onStateChange();
        }
    };

    /**
     * 1.注册回调函数
     * 2.如果 parentSub 有值，则将回调注册到 parentSub 上
     * 3.如果 parentSub 没有值 ，那当前组件就是根组件，回调注册到 redux store上
     *  */

    trySubScribe = () => {
        this.parentSub ?
            this.parentSub.addNextSubs(this.handleChangeSwapper) :
            this.store.subscribe(this.handleChangeSwapper);
    };
}

export default Subscription;