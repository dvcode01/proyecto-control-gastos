import {useState, useEffect} from 'react';
import Alerta from './Alerta';
import CerrarBtn from '../img/cerrar.svg';
import { object } from 'prop-types';

function Modal({setModal, animacionModal, setAnimacionModal, guardarGasto, editarGasto, setEditarGasto}) {
    // Campos
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fecha, setFecha] = useState('');

    // Devuelve un mensaje de error
    const [mensaje, setMensaje] = useState('');

    const [id, setId] = useState('');


    useEffect(() => {
        if(Object.keys(editarGasto).length > 0){
            setNombre(editarGasto.nombre);
            setCantidad(editarGasto.cantidad);
            setCategoria(editarGasto.categoria);
            setId(editarGasto.id);
            setFecha(editarGasto.fecha);
        }

    }, []);
    
    
    const ocultarModal = () => {
        setAnimacionModal(false);
        setEditarGasto({});
        
        setTimeout(() => {
            setModal(false);
        }, 500);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validacion de los datos
        if([nombre, cantidad, categoria].includes('')){
            setMensaje('Todos los campos son obligatorios');
            
            setTimeout(() => {
                setMensaje('');
            }, 2000);
            
            return;
        }

        // Guardando los gastos
        guardarGasto({nombre, cantidad, categoria, id, fecha});
    };

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img src={CerrarBtn} alt="icono cerrar" onClick={ocultarModal} />
        </div>

        <form 
            className={`formulario ${animacionModal ? 'animar' : 'cerrar'}`}
            onSubmit={handleSubmit}
        >
            <legend>{editarGasto.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

            {mensaje && <Alerta tipo="error">{mensaje}</Alerta>}

            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>
                <input 
                    type="text" 
                    id="nombre" 
                    placeholder='Añade el nombre del gasto' 
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>
                <input 
                    type="number" 
                    id="cantidad" 
                    placeholder='Añade la cantidad del gasto, ej: 300'
                    value={cantidad}
                    onChange={(e) => setCantidad(Number(e.target.value))} 
                />
            </div>
            <div className="campo">
                <label htmlFor="categoria">Categoria</label>
                <select 
                    id="categoria" 
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)} 
                >
                    <option value="">-- Seleccione Categoria --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gasto Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
            
            <input type="submit" value={editarGasto.nombre ? "Guardar Cambio" : "Añadir Gasto"}/>
        </form>
    </div>
  )
}

export default Modal