
import React, {useReducer} from "react";

const countReducer = (state, step) => state+step;

function Counter({initialCount = 0, step = 1}) {
  const [count, changeCount] = useReducer(countReducer, initialCount);

  const increment = () => changeCount(step);
  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
