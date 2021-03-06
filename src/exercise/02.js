// useCallback: custom hooks
// http://localhost:3000/isolated/exercise/02.js

import React, {useState, useEffect, useReducer} from "react";
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from "../pokemon";

function asyncReducer(state, action) {
  switch (action.type) {
    case "pending": {
      return {status: "pending", data: null, error: null};
    }
    case "resolved": {
      return {status: "resolved", data: action.data, error: null};
    }
    case "rejected": {
      return {status: "rejected", data: null, error: action.error};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const useAsync = (asyncCallback, initState, dependencies) => {
  const [state, dispatch] = useReducer(asyncReducer, {
    status: initState.status || "idle",
    data: initState.data || null,
    error: initState.error || null,
  });

  useEffect(
    () => {
      const promise = asyncCallback()
      if (!promise) {
        return
      }
      dispatch({type: "pending"});
      promise.then(
        data => {
          dispatch({type: "resolved", data});
        },
        error => {
          dispatch({type: "rejected", error});
        },
      );
    },
    [...dependencies],
  );
  return state;
};

function PokemonInfo({pokemonName}) {
  const state = useAsync(
    () => {
      if (!pokemonName) {
        return;
      }
      return fetchPokemon(pokemonName);
    },
    {status: pokemonName ? "pending" : "idle"},
    [pokemonName],
  );

  const {data, status, error} = state;

  if (status === "idle" || !pokemonName) {
    return "Submit a pokemon";
  } else if (status === "pending") {
    return <PokemonInfoFallback name={pokemonName} />;
  } else if (status === "rejected") {
    throw error;
  } else if (status === "resolved") {
    return <PokemonDataView pokemon={data} />;
  }

  throw new Error("This should be impossible");
}

function App() {
  const [pokemonName, setPokemonName] = useState("");

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  function handleReset() {
    setPokemonName("");
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  );
}

function AppWithUnmountCheckbox() {
  const [mountApp, setMountApp] = useState(true);
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={mountApp}
          onChange={e => setMountApp(e.target.checked)}
        />{" "}
        Mount Component
      </label>
      <hr />
      {mountApp ? <App /> : null}
    </div>
  );
}

export default AppWithUnmountCheckbox;
