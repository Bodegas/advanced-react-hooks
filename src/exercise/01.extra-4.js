import React, {useReducer} from "react";

const countReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT": {
      return {count: state.count + action.step};
    }
    default:
      return state;
  }
};

function Counter({initialCount = 0, step = 1}) {
  const [state, dispatch] = useReducer(countReducer, {
    count: initialCount,
  });
  const {count} = state;
  const increment = () => dispatch({type: "INCREMENT", step});
  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
