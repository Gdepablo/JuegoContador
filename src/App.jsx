import { useState, useEffect} from 'react';
import './App.css';

const App = () => {
  const [botonClick,setBotonClick] = useState(0);
  const [juegoIniciado,setJuegoIniciado] = useState(false);
  const [mensaje,setMensaje] = useState('');
  const [puntajeMaximo, setPuntajeMaximo] = useState(0);
  const delayEntreMensajes = 1000;
  const tiempoDeJuego = 5000;
  const [tiempoRestante, setTiempoRestante] = useState(tiempoDeJuego);
  const [esconderIniciarJuego, setEsconderIniciarJuego] = useState(false);

  const RenderedButton= () => {
  if(!juegoIniciado){
    return !esconderIniciarJuego && <button type='button' className='button' onClick={() => handleIniciarJuego()}>Iniciar juego</button>
  } else {
    <h2>Tiempo restante: {tiempoRestante} </h2>
    return <button type='button' className='anybutton' onClick={() => setBotonClick(botonClick+1)}>¡Clickeame!</button>
  }
  function handleIniciarJuego() {
    setEsconderIniciarJuego(true);

    async function handleEndgame() {
      await imprimirMensajeConDelay('Preparados...')
      await imprimirMensajeConDelay('Listos...')
        imprimirMensajeConDelay('Ya!')
      setBotonClick(0); //Para reinicializar el juego
      setJuegoIniciado(true);
      setTimeout(() => {
        setJuegoIniciado(false);
        imprimirMensajeConDelay('Se acabó el tiempo!');
        setEsconderIniciarJuego(false);
      }, tiempoDeJuego);
    }

    handleEndgame();
  }}

  const imprimirMensajeConDelay = async (mensaje) => {
    setMensaje(mensaje)
    await new Promise(resolve => setTimeout(resolve, delayEntreMensajes));}

    function handlePuntaje() {
      if(!juegoIniciado){
        return <h1>Puntaje máximo: {puntajeMaximo}</h1>
      } else {
        return <h1>Cantidad de clicks actuales: {botonClick}</h1>
      }}

  useEffect(() => {
    setTimeout(() => {
      juegoIniciado && tiempoRestante > 0 && setTiempoRestante(tiempoRestante - 1000)

      if(botonClick > puntajeMaximo){
        setPuntajeMaximo(botonClick)
      }
    }, 1000);
  }, [tiempoRestante, juegoIniciado, botonClick, puntajeMaximo]);

  return (
    <div className="App">
      <h2>{mensaje} </h2> 
      {RenderedButton()}
      {handlePuntaje()}
     {juegoIniciado? 
     <h2>Tiempo restante: {tiempoRestante / 1000} segundos </h2>
     :<h2>Ultimo puntaje: {botonClick} </h2>}
    </div>
  );
}

export default App;
