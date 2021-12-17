import { connect } from "react-redux";
import "./App.css";
import "./redux.js";

function App(props) {
  return (
    <div className="App">
      {props.count}
      <button onClick={props.add}>+1</button>
      <button onClick={props.sub}>-1</button>
    </div>
  );
}

export default connect(
  (mapState) => ({
    count: mapState.count,
  }),
  (dispatch) => ({
    add: () => dispatch({ type: "add" }),
    sub: () => dispatch({ type: "sub" }),
  })
)(App);
