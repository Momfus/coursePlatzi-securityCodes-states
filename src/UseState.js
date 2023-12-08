import React from "react";

// Aca se hará sin usars React.Component
function UseState({ name }) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Recordar: gracias a virtual Dom, react solo renderiza los casos que haya cambiado el estado (no todo)

  React.useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor, escribe el código de seguridad.</p>

      {error && <p>Error: El código es incorrecto</p>}
      {loading && <p>Cargando...</p>}

      <input placeholder="Código de seguridad" />
      <button onClick={() => setLoading(true)}>Comprobar</button>
    </div>
  );
}

export { UseState };
