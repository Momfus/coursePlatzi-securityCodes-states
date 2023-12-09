import React from "react";

const SECURITY_CODE = "paradigma";

// Aca se hará sin usars React.Component
function UseState({ name }) {
  // Con los estados compuestos podemos definir que valor del conjunto cambiar todo junto o uno a la vez
  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
  });

  // Recordar: gracias a virtual Dom, react solo renderiza los casos que haya cambiado el estado (no todo)

  React.useEffect(() => {
    if (state.loading) {
      if (state.loading) {
        setTimeout(() => {
          setState((prevState) => {
            if (prevState.value !== SECURITY_CODE) {
              return { ...prevState, error: true, loading: false };
            }
            return { ...prevState, loading: false };
          });
        }, 2000);
      }
    }
  }, [state.loading]);

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor, escribe el código de seguridad.</p>

      {state.error && !state.loading && <p>Error: El código es incorrecto</p>}
      {state.loading && <p>Cargando...</p>}

      <input
        placeholder="Código de seguridad"
        value={state.value}
        onChange={(event) => {
          setState({ ...state, value: event.target.value });
        }}
      />
      <button
        onClick={() => {
          setState({ ...state, error: false, loading: true });
        }}
      >
        Comprobar
      </button>
    </div>
  );
}

export { UseState };
