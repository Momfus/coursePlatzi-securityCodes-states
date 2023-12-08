import React from "react";

/**
 * Extender de React.Component es necesario para crear un componente de clase en React.
 * Esto te proporciona características como el estado del componente y los métodos del ciclo de
 * vida del componente, que no están disponibles en los componentes de función sin Hooks.
 */
class Loading extends React.Component {
  // Al desmontar el componente
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    return <p>Cargando...</p>;
  }
}

export { Loading };
