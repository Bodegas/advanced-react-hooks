// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import React, {useReducer} from "react";

const countReducer = (state, newState) => newState;

function Counter({initialCount = 0, step = 1}) {
  const [count, setCount] = useReducer(countReducer, initialCount);

  const increment = () => setCount(count + step);
  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
