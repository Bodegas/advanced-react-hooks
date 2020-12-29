import React, {createContext, useContext, useState} from "react";

const CountContext = createContext();

const CountProvider = props => {
  const [count, setCount] = useState(0);
  const value = [count, setCount];
  return <CountContext.Provider value={value} {...props} />;
};

function CountDisplay() {
  const [count] = useContext(CountContext);
  return <div>{`The current count is ${count}`}</div>;
}

function Counter() {
  const [, setCount] = useContext(CountContext);
  const increment = () => setCount(c => c + 1);
  return <button onClick={increment}>Increment count</button>;
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  );
}

export default App;
