import './GameOver.css'

const GameOver = ({restartGame, score}) => {
  return (
    <div>
      <h1 className='titulo_fimDeJogo'>Fim de jogo</h1>
      <h2 className='score_fimDeJogo'>Pontuação final: <span>{score}</span> </h2>
      <button className='botao-fimDeJogo' onClick={restartGame}>Reiniciar Jogo</button>
     <a className='link-git' href="https://github.com/Matheus-Loubach"><p>GitHub: Matheus-Loubach</p></a> 
    </div>
  )
}

export default GameOver