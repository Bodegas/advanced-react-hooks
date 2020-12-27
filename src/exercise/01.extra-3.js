import React, {useReducer} from "react";

const countReducer = (state, action) => {
  if(typeof action === "function")  {
    return {...state, ...action(state)}
  }
  return {...state, ...action}
}

function Counter({initialCount = 0, step = 1}) {
  const [state, setState] = useReducer(countReducer, {
    count: initialCount,
  });
  const {count} = state;
  const increment = () =>
    setState(currentState => ({count: currentState.count + step}));
    // setState(({count: count + step}));
  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
