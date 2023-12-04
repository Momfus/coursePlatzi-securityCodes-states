import React from "react";

// Aca se hará sin usars React.Component
function UseState({ name }) {
  const [error, setError] = React.useState(false);

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor, escribe el código de seguridad.</p>

      {error && <p>Error: El código es incorrecto</p>}

      <input placeholder="Código de seguridad" />
      <button onClick={() => setError(!error)}>Comprobar</button>
    </div>
  );
}

export { UseState };
