import "./App.css";
import connect from "./reactRedux/connect";
// import "./redux.js";

function App(props) {
  const { count, sub, add } = props;
  return (
    <>
      {count}
      <button onClick={add}>+1</button>
      <button onClick={sub}>-1</button>
    </>
  );
}

export default connect(
  (state) => ({ count: state.count }),
  (dispatch) => ({
    sub: () => dispatch({ type: "sub" }),
    add: () => dispatch({ type: "add" }),
  })
)(App);
