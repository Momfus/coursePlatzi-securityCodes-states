import React from "react";

const SECURITY_CODE = "paradigma";

// Aca se hará sin usars React.Component
function UseState({ name }) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Este estado será dinámico de lo que se escribe en el input
  const [value, setValue] = React.useState("");

  // Recordar: gracias a virtual Dom, react solo renderiza los casos que haya cambiado el estado (no todo)

  React.useEffect(() => {
    if (loading) {
      setTimeout(() => {
        if (value !== SECURITY_CODE) {
          setError(true);
        }

        setLoading(false);
      }, 2000);
    }
  }, [loading]);

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor, escribe el código de seguridad.</p>

      {error && !loading && <p>Error: El código es incorrecto</p>}
      {loading && <p>Cargando...</p>}

      <input
        placeholder="Código de seguridad"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      <button
        onClick={() => {
          setError(false);
          setLoading(true);
        }}
      >
        Comprobar
      </button>
    </div>
  );
}

export { UseState };
