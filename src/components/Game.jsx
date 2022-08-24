import { useState } from "react"
import "./Game.css"
import './GameResponsive.css'

const Game = ({verifyLetter, pickedWord,pickedCategory,letters,guessedLetters,wrongLetters,guesses,score}) => {

  const [letter, setLetter] = useState('');

  //enviar letra
  const handleSubmit= (e) =>{
    e.preventDefault();

    verifyLetter(letter);
    setLetter('');
  }



  return (
    <div className="game">
      <p className="score">
        <span>Pontuação: {score}</span>
      </p>      
      <h1>Adivinhe a palavra</h1>
      <h3 className="dica">
        Dica: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s).</p>
      <div className="wordContainer">
      {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span className="letter" key={i}>
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente advinhar uma letra da palavra: </p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="letter" maxLength='1' required onChange={(e) => setLetter(e.target.value)} value={letter}/>
          <button className="botao_game">Jogar</button>
        </form>
      </div>
      <div className="letrasJogadas">
      <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  )
}

export default Game