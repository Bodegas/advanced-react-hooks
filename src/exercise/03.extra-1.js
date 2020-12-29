import React, {createContext, useContext, useState} from "react";

const CountContext = createContext();

const CountProvider = props => {
  const [count, setCount] = useState(0);
  const value = [count, setCount];
  return <CountContext.Provider value={value} {...props} />;
};

const useCount = () => {
  const value = useContext(CountContext);
  if (!value) {
    throw new Error("useCount must be used with a CountProvider.")
  }
  return value;
};
function CountDisplay() {
  const [count] = useCount();
  return <div>{`The current count is ${count}`}</div>;
}

function Counter() {
  const [, setCount] = useCount();
  const increment = () => setCount(c => c + 1);
  return <button onClick={increment}>Increment count</button>;
}

function App() {
  return (
    <div>
      <CountDisplay />
      <Counter />
    </div>
  );
}

export default App;
