import React from "react";
import { Loading } from "./loading";

const SECURITY_CODE = "paradigma";

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
      value: "",
      error: false,
      loading: false,
    };
  }

  /* Métodos de ciclo de vida como 
    componentWillMount,  --> este ya no se usa, se recomienda hacerlo en el constructor
    componentWillUmount, 
    componentDidMount, --> Es cuando se desmonta el componente, como el ngDestroy de angular
    componentDidUpdate, --> Cuando se actualiza el componente
    etc como funcionesse llaman*/
  // UNSAFE_componentWillMount() {
  //   // El UNSAFE se usa para que react sepa que igualmente queremos usarlo
  //   console.log("componentWillMount");
  // }

  componentDidUpdate() {
    console.log("componentDidUpdate");

    if (this.state.loading) {
      setTimeout(() => {
        if (this.state.value !== SECURITY_CODE) {
          this.setState({ error: true });
        }

        this.setState({ loading: false });
      }, 2000);
    }
  }

  render() {
    //const {error, loading, value} = this.state; // Por si no queremos estar haciendo cada rato el "this.state.blabla"
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor, escribe el código de seguridad.</p>

        {this.state.error && !this.state.loading && (
          <p>Error: El código es incorrecto</p>
        )}

        {this.state.loading && <Loading />}

        <input
          placeholder="Código de seguridad"
          value={this.state.value}
          onChange={(event) => {
            this.setState({ value: event.target.value });
          }}
        />
        <button
          onClick={() =>
            // this.setState((prevState) => ({ error: !prevState.error })) // Formas de obtener el estado previo de un state
            this.setState((prevState) => ({ error: false, loading: true }))
          }
        >
          Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState };
