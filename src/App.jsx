import { useState, useEffect } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Filtros from "./components/Filtros.jsx";
import ListadoGastos from "./components/ListadoGastos.jsx";
import {generarId} from './helpers/index.js'; 
import IconoNuevoGasto from './img/nuevo-gasto.svg';

function App() {
  // Gastos
  const [gastos, setGastos] = useState([
      ...(JSON.parse(localStorage.getItem("gastos")) ?? [])
  ]);

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  // Modal
  const [modal, setModal] = useState(false);
  const [animacionModal, setAnimacionModal] = useState(false);

  const[editarGasto, setEditarGasto] = useState({});

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    
    if(Object.keys(editarGasto).length > 0){
      setModal(true);

      setTimeout(() => {
        setAnimacionModal(true);
      }, 500);
    }
    
  }, [editarGasto]);

  useEffect(() => {
    // Agregando al localStorage
    localStorage.setItem('presupuesto', presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    // Agregando al localStorage
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupeusto')) ?? 0;

    if(presupuestoLS > 0){
      isValidPresupuesto(true);
    }

  }, []);

  useEffect(() => {
    if(filtro){
      const gastoFiltrado = gastos.filter(gasto => gasto.categoria === filtro);

      setGastosFiltrados(gastoFiltrado);
    }
  }, [filtro]);
  
  const handleNuevoGasto = () => {
    setModal(true);

    // Resetea el editarGasto
    setEditarGasto({});

    setTimeout(() => {
      setAnimacionModal(true);
    }, 500);
  }


  const guardarGasto = (gasto) => {
    if(gasto.id){
      // Actualizar gasto
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastosActualizados);
      setEditarGasto({});
    }else{
      // Nuevo gasto
      gasto.fecha = Date.now();
      gasto.id = generarId();
      setGastos([...gastos, gasto]);
    }

    // Cerrando modal
    setAnimacionModal(false);
        
    setTimeout(() => {
        setModal(false);
    }, 500);
  };

  const eliminarGasto = (id) => {
    const gastoActualizados = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastoActualizados);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}

      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}
            />

            <ListadoGastos 
              gastos={gastos} 
              setEditarGasto={setEditarGasto}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>

          <div className="nuevo-gasto">
            <img 
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto} 
            />
          </div>
        </>
      )}

      {modal && (
        <Modal 
          setModal={setModal}
          animacionModal={animacionModal} 
          setAnimacionModal={setAnimacionModal}
          guardarGasto={guardarGasto}
          editarGasto={editarGasto}
          setEditarGasto={setEditarGasto}
        />
      )}
      
    </div>
  )
}

export default App
