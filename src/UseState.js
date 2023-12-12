import React from "react";

const SECURITY_CODE = "paradigma";

// Aca se hará sin usars React.Component
function UseState({ name }) {
  // Con los estados compuestos podemos definir que valor del conjunto cambiar todo junto o uno a la vez
  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
    // Lo siguiente es para saber que pantallas mostrar
    deleted: false,
    confirmed: false,
  });

  // De manera declarativa, poder hacer un cambio de estado especifico
  const onConfirm = () => {
    setState({ ...state, error: false, loading: false, confirmed: true });
  };

  const onError = () => {
    setState({ ...state, error: true, loading: false });
  };

  const onWrite = (newValue) => {
    setState({ ...state, value: newValue });
  };

  const onCheck = () => {
    setState({ ...state, loading: true });
  };

  const onDelete = () => {
    setState({ ...state, deleted: true });
  };

  const onReset = () => {
    setState({ ...state, confirmed: false, deleted: false, value: "" });
  };

  // Recordar: gracias a virtual Dom, react solo renderiza los casos que haya cambiado el estado (no todo)
  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
        }
      }, 2000);
    }
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el confirmed seguridad.</p>

        {state.error && !state.loading && <p>Error: El código es incorrecto</p>}
        {state.loading && <p>Cargando...</p>}

        <input
          placeholder="confirmed seguridad"
          value={state.value}
          onChange={(event) => {
            onWrite(event.target.value);
          }}
        />
        <button
          onClick={() => {
            onCheck();
          }}
        >
          Comprobar
        </button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <h2>Eliminar {name}</h2>
        <p>Pedimos confirmación ¿Estás seguro?</p>
        <button
          onClick={() => {
            onDelete();
          }}
        >
          Si, eliminar
        </button>
        <button
          onClick={() => {
            onReset();
          }}
        >
          No, me arrepentí
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h2>Eliminar {name}</h2>
        <p>Eliminado con éxito</p>
        <button
          onClick={() => {
            onReset();
          }}
        >
          Resetear, voler atrás
        </button>
      </React.Fragment>
    );
  }
}

export { UseState };
