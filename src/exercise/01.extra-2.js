import React, {useReducer} from "react";

const countReducer = (state, newState) => ({...state, count: newState.count})

function Counter({initialCount = 0, step = 1}) {
  const [state, setState] = useReducer(countReducer, {
    count: initialCount,
  })
  const {count} = state
  const increment = () => setState({count: count + step})
  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
