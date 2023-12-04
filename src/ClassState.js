import React from "react";

/**
 * Extender de React.Component es necesario para crear un componente de clase en React.
 * Esto te proporciona características como el estado del componente y los métodos del ciclo de
 * vida del componente, que no están disponibles en los componentes de función sin Hooks.
 */
class ClassState extends React.Component {
  constructor() {
    super(); // Con esto hacemos que se inicializa lo del padre primero (de React.component viene por defecto el setState y las convenciones que se hacen)
    // En las que son de clases, asi seteamos los estados
    this.state = {
      error: false,
    };
  }

  render() {
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor, escribe el código de seguridad.</p>

        {this.state.error && <p>Error: El código es incorrecto</p>}

        <input placeholder="Código de seguridad" />
        <button
          onClick={() =>
            this.setState((prevState) => ({ error: !prevState.error }))
          }
        >
          Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState };
