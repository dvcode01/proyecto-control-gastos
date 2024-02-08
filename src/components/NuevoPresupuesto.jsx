import {useState} from 'react';
import Alerta from './Alerta';

function NuevoPresupuesto({presupuesto, setPresupuesto, setIsValidPresupuesto}) {
    const [mensaje, setMensaje] = useState('');

    const handlePresupuesto = (e) => {
        e.preventDefault();

        if(!presupuesto || presupuesto < 0){
            setMensaje('Presupuesto no válido');
            return;
        }

        setMensaje('');
        setIsValidPresupuesto(true);


    };

    return (
        <div className='contenedor-presupuesto contenedor sombra'>
            <form action="" className='formulario' onSubmit={handlePresupuesto}>
                <div className="campo">
                    <label htmlFor="">Definir Presupuesto:</label>
                    <input 
                    type="number"
                    className='nuevo-presupuesto' 
                    name="presupuesto" 
                    id="" 
                    placeholder='Añade tu Presupuesto'
                    value={presupuesto}
                    onChange={(e) => setPresupuesto(Number(e.target.value))}
                    />
                </div>

                <input type="submit" value="Añadir" />

                {mensaje && <Alerta tipo="error">{mensaje}</Alerta>}
            </form>
        </div>
    )
}

export default NuevoPresupuesto