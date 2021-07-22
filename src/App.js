
import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario'
import Cita from './components/Cita'

function App() {

  //citas en localStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  console.log("Hola me ejecute de nuevo");
  console.log(citasIniciales);
  if(!citasIniciales) {
    citasIniciales = [];
  }


  //Arreglo de citas - este es un arreglo de citas (PLURAL), cada vez que se agregue una cita vamos a colocarla en este arreglo ppal
  const [citas, guardarCitas] = useState(citasIniciales)

  useEffect(() => {
    console.log(citas);
    console.log(citasIniciales);

    if(citas) {
      localStorage.setItem('citas', JSON.stringify(citas));
    }else {
      localStorage.setItem('citas', JSON.stringify([]))
    }

  }, [citas]);

  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  //Eliminar citas

  const eliminarCita = id => {
    // console.log(id);
    const nuevasCitas = citas.filter(item => item.id !== id)
    guardarCitas(nuevasCitas)
  }


  //Mensaje condicional
  // console.log(citas.length);

  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas'

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita 
                key= {cita.id}
                cita= {cita}
                eliminarCita={eliminarCita}
              />
            )
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
