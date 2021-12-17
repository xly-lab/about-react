const REJECT = "reject";
const RESOLVE = "resolve";
const PENDING = "pending";

class Promise {
    constructor(executer) {
        this.state = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.rejectArr = [];
        this.resolveArr = [];
        const resolveFn = (value) => {
            if (this.state === PENDING) {
                this.state = RESOLVE;
                this.value = value;
                this.resolveArr.forEach((fn) => fn && fn());
            }
        };

        const rejectFn = (reason) => {
            if (this.state === PENDING) {
                this.state = REJECT;
                this.reason = reason;
                this.rejectArr.forEach((fn) => fn && fn());
            }
        };
        try {
            executer(resolveFn, rejectFn);
        } catch (error) {
            this.rejectFn(error);
        }
    }
    then(resFn, rejFn) {
        resFn = typeof resFn === "function" ? resFn : (_) => _;
        rejFn =
            typeof rejFn === "function" ?
            rejFn :
            (err) => {
                throw err;
            };
        let p1 = new Promise((resolve, reject) => {
            if (this.state === PENDING) {
                this.resolveArr.push(() => {
                    setTimeout(() => {
                        try {
                            let x = resFn(this.value);
                            handleThen(x, p1, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    });
                });
                this.rejectArr.push(() => {
                    setTimeout(() => {
                        try {
                            let x = rejFn(this.reason);
                            handleThen(x, p1, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    });
                });
            }
            if (this.state === RESOLVE) {
                setTimeout(() => {
                    try {
                        let x = resFn(this.value);
                        handleThen(x, p1, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            }
            if (this.state === REJECT) {
                setTimeout(() => {
                    try {
                        let x = rejFn(this.reason);
                        handleThen(x, p1, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            }
        });
        return p1;
    }
}

function handleThen(x, p1, resolve, reject) {
    if (x === p1) {
        return reject(new TypeError("不能循环引用"));
    }
    if ((x !== null && typeof x === "object") || typeof x === "function") {
        let called = false;
        try {
            let then = x.then;
            if (typeof then === "function") {
                then.call(
                    x,
                    (value) => {
                        if (called) return;
                        called = true;
                        handleThen(value, p1, resolve, reject);
                    },
                    (reason) => {
                        if (called) return;
                        called = true;
                        reject(reason);
                    }
                );
            } else {
                if (called) return;
                called = true;
                resolve(x);
            }
        } catch (error) {
            if (called) return;
            called = true;
            reject(error);
        }
    } else {
        resolve(x);
    }
}

Promise.defer = Promise.deferred = function() {
    let result = {};

    result.promise = new Promise((resolve, reject) => {
        result.resolve = resolve;
        result.reject = reject;
    });
    return result;
};

module.exports = Promise;