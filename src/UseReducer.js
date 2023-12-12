import React from "react";

const SECURITY_CODE = "paradigma";

// Aca se hará sin usar React.Component
function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState); // en vez de setState se usa con reducer por convencion el dispatch

  // Recordar: gracias a virtual Dom, react solo renderiza los casos que haya cambiado el estado (no todo)
  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          dispatch({
            type: "CONFIRM",
          });
        } else {
          dispatch({
            type: "ERROR",
          });
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
            dispatch({ type: "WRITE", payload: event.target.value });
          }}
        />
        <button
          onClick={() => {
            dispatch({
              type: "CHECK",
            });
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
            dispatch({
              type: "DELETE",
            });
          }}
        >
          Si, eliminar
        </button>
        <button
          onClick={() => {
            dispatch({
              type: "RESET",
            });
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
            dispatch({
              type: "RESET",
            });
          }}
        >
          Resetear, voler atrás
        </button>
      </React.Fragment>
    );
  }
}

const initialState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

// Reducer con object
const reducerObject = (state, payload) => ({
  ERROR: { ...state, error: true, loading: false },
  CHECK: { ...state, loading: true },
  CONFIRM: { ...state, error: false, loading: false, confirmed: true },
  DELETE: { ...state, deleted: true },
  RESET: { ...initialState },
  WRITE: { ...state, value: payload },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return {
      ...state, // En caso que se envie un elemento que no tenga, se envia el mismo que se envio
    };
  }
};

export { UseReducer };

// Hay tres formas de crear un reducer: (el reducerObject es el que se usa finalmente arriba)

// la base
// const reducer = (state, action) => {};

// Con condicionales if
// const reducerIf = (state, action) => {
//    if (action.type === "ERROR") {
//      return { ...state, error: true, loading: false };
//    } else if (action.type === "CHECK") {
//      return { ...state, loading: true };
//    } else {
//      return {
//        ...initialState,
//      };
//    }
//  };

//  // Con condicional swithc --> la mas popular
//  const reducerSwitch = (state, action) => {
//    switch (action.type) {
//      case "ERROR":
//        return { ...state, error: true, loading: false };
//      case "CHECK":
//        return { ...state, loading: true };
//      default:
//        return {
//          ...initialState, // Estado inicial en caso contrario
//        };
//    }
//  };
