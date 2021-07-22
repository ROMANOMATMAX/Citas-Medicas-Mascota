import React, {Fragment, useState} from 'react';
import uuid from 'uuid/dist/v4'
import PropTypes from 'prop-types'

const Formulario = ({crearCita}) => {

    //Crear State de citas - esta es una cita (SINGULAR)
    const [cita, actualizarCita] = useState({
        //usar el mismo name que se le dio a los inputs en el form
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })

    const [error, setError] = useState(false);

    //Se aplica destructuring al state para tener acceso a las variables, evitar tener que estar haciendo cita.mascota, cita.propietario etc
    const {mascota, propietario, fecha, hora, sintomas} = cita;


    function actualizarState(e) {
        // console.log(typeof(e.target.name));
        actualizarCita({
            ...cita,
            //cuando el nombre no se coloca de forma directa sino a través de una expresión debe hacerse entre esas llaves
           [e.target.name]: e.target.value
        })
    }

    //CUando el usuario presiona agregar cita
    const submitCita = e => {
        e.preventDefault();
        
        //Validar los datos que nos estan enviando
        if(mascota.trim()==='' || propietario.trim()==='' || fecha.trim()==='' || hora.trim()==='' || sintomas.trim()==='') {
            console.log('Hay un error');
            setError(true);
            return;
        }
        
        setError(false);

        //Asignar un ID, cuando muestras registros repetidos en react necesitas un key
        cita.id = uuid();
        console.log(cita);
        //Crear la cita
        crearCita(cita);
        //Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }



    return (  
        <Fragment>
            <h2>Crear Citas</h2>

            {/* No puedes poner un if aqui debes usar ternario */}
            {/* Como esto inicia en false la condicion no se cumple y retorna null */}
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="nombre Mascota"
                    onChange = {(e) => {
                        actualizarState(e);
                    }
                    }
                    value = {mascota}//cuando se reinicia el form y se les da un valor de string vacio a cada elmento del state el value tambien es ''
                />
                <label>Nombre del dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="nombre del dueño de la mascota"
                    onChange = {(e) => {
                        actualizarState(e);
                    }
                    }
                    value = {propietario}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange = {(e) => {
                        actualizarState(e);
                    }
                    }
                    value = {fecha}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange = {(e) => {
                        actualizarState(e);
                    }
                    }
                    value = {hora}
                />
                <label>Sintomas</label>
                <textarea
                 className="u-full-width"
                 name="sintomas"
                 onChange = {(e) => {
                    actualizarState(e);
                }
                }
                value = {sintomas}
                ></textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
    );
}


Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;