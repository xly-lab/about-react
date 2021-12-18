# 手写 redux

`./src/redux` 与 `./src/reduex1`

## createStore

`./src/redux/store`

> **该函数接收 三个参数**，
> 
> reducer ： 根据接收的action处理state
> 
>  state ：初始状态
> 
>  enhancer ： 接收并处理中间件 返回一个增强的 createStore
> 
> **并返回 store**
> 
> getState 获取当前状态
> 
> dispatch 用来接收 action 触发 reducer 
> 
> subscribe 用来发布所有的订阅 ，也可以用来监听回调

## enhancer (applyMiddleware)

`./src/redux/applyMiddleware`


> 接收一个 中间件 （middleware）
> 
> 返回一个函数，这个函数接收 createStore 并返回一个 createStore 函数

## combineReducer

`./src/redux/combineReducers`


> 合并多个 reducer

## logger （middleware）

`./src/redux/middlewares/logger`


> 中间件的能力 返回一个增强的 dispatch
> 
> 接收 store 返回一个函数，这个函数接收一个 dispatch，该函数再返回一个接收 action 的函数，这个函数也就是增强后的 dispatch，在这个函数里可以增加自定义的功能


# 手写 promiseA+

`./src/promise`

`promises-aplus-tests` 验证手写 `promise`

# 手写实现 react-redux

`./src/reactRedux`

## 实现 Provider 

`./src/reactRedux/Provider`

> react-redux 的目的是将 redux 与 react 链接起来，利用了 react 本事拥有的 context 重写了其 Provider ，将 store 复制给了 value 传递给子组件

## 实现 connect

`./src/reactRedux/connect`

> connect 属于高阶组件 ， 接受两个函数 mapStateToProps，mapDispatchToProps，将指定的 state 与 dispatch 传递给需要的组件；并返回一个接收组件的函数，该函数同样返回一个组件，这个组件得到了 state 与 dispatch；
> 
> 在store上注册一个回调，监听状态是否发生变化，通过浅比较判断组件是否需要更新，如果状态变化则强制更新组件，使其页面变化
