import "./StartScreen.css"

const StartScreen = ({startGame}) => {
  return (
    <div>
      <div className="titulo_inicial">
      <h1 className='start'>Secret</h1>
      <h2 className='start'>Word</h2>
      <button onClick={startGame} className="butao_inicial">Iniciar</button>
      </div>
    </div>
  )
}

export default StartScreen