import {
  useContext,
  useRef,
  useLayoutEffect,
  useCallback,
  useState,
} from "react";
import ReactReduxContext from "../Context";
import shallowEqual from "../utils/shallowEqual.js";

const connect = (mapStateToProps, mapDispatchToProps) => {
  return (Component) => {
    const UpComponent = (wrapperProps) => {
      // 记录上次渲染参数
      const lastChildProps = useRef();
      const store = useContext(ReactReduxContext);
      const [, forceComponentUpdateDispatch] = useState(0);

      // 组装最终的props
      const childPropsSelector = useCallback((store, wrapperProps) => {
        const state = store.getState(); // 拿到state

        // 执行mapStateToProps和mapDispatchToProps
        const stateProps = mapStateToProps(state);
        const dispatchProps = mapDispatchToProps(store.dispatch);

        return Object.assign({}, stateProps, dispatchProps, wrapperProps);
      }, []);

      const actualChildProps = childPropsSelector(store, wrapperProps);

      useLayoutEffect(() => {
        lastChildProps.current = actualChildProps;
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      // 注册回调
      store.subscribe(() => {
        const newChildProps = childPropsSelector(store, wrapperProps);
        // 如果参数变了，记录新的值到lastChildProps上
        // 并且强制更新当前组件
        if (!shallowEqual(newChildProps, lastChildProps.current)) {
          lastChildProps.current = newChildProps;

          // 需要一个API来强制更新当前组件
          forceComponentUpdateDispatch((count) => count + 1);
        }
      });

      return <Component {...actualChildProps} />;
    };
    return UpComponent;
  };
};

export default connect;
