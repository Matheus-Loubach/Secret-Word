//CSS
import './App.css';
//REACT
import { useCallback, useEffect, useState } from 'react';
//DATA
import {wordsList} from './data/world'
//COMPONENTS
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver'
const stages = [
  {id: 0,name: 'start'},
  {id: 1, name: 'game'},
  {id: 2, name: 'end'},
];

//quantidade de tentativas
const GuessQty = 5;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList);

  
  const [pickedWord, setPickedWord] = useState('');//palavra escolhida
  const [pickedCategory, setPickedCategory] = useState('');  //categoria escolhida
  const [letters, setLetters] = useState([]);//LETTERS acertadas

  const [guessedLetters,SetGuessedLetters] = useState([]);//palavras adivinhadas
  const [wrongLetters, SetWrongLetters]  = useState([]); // letras erradas
  const [guesses, SetGuesses] = useState(GuessQty); //tentativas do user
  const [score, SetScore] = useState(0); //score

 

  const pickWordAndCategory = useCallback(() =>{
    //CATEGORIAS DE WORDS
    const categories = Object.keys(words);
    //rando category
    const category = categories[Math.floor(Math.random() * categories.length)]
    //randowm word(palavra)
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return {word,category};
  }, [words]);
  
  
  //Start the game
 const startGame = useCallback(() =>{
  clearAllstates();
  //picked word and pickedCategory
 const {word,category} = pickWordAndCategory();

 //create an array of letters(separar as letras)
 let wordLetters = word.split(''); 
  wordLetters = wordLetters.map((l) => l.toLowerCase());

    //fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

  setGameStage(stages[1].name)
 }, [pickWordAndCategory]);

 //process the letter input
 const verifyLetter = (letter) =>{
  
  const normaLizedLetter = letter.toLowerCase()

  //check letter
  if(guessedLetters.includes(normaLizedLetter) || wrongLetters.includes(normaLizedLetter)){
    return;
  }
  // push guessed letter or remove a guess
  if(letters.includes(normaLizedLetter)){
SetGuessedLetters((actualGuessedLetters) => [
  ...actualGuessedLetters,normaLizedLetter,
]);
      
  }
  else{
    SetWrongLetters((actualWrongLetters) => [
      ...actualWrongLetters,normaLizedLetter,
    ]);

    //contagem de erros
    SetGuesses((actualGuesses) => actualGuesses - 1)  
  }

 };

 const clearAllstates = () =>{
  SetGuessedLetters([]);//letras certas
  SetWrongLetters([]);//letras erradas
 }


//condição win
useEffect(()=>{
  const uniqueLetters = [...new Set(letters)]

  if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name){
    // add score
    SetScore((atualScore) => atualScore += 100);

    //restart game with new word
    startGame();
  }

},[guessedLetters, letters, startGame]);


 //monitora dado // codição derrota
 useEffect(()=>{
  if(guesses <= 0){
    //reset all states
    clearAllstates();
    setGameStage(stages[2].name);
    
  }
 },[guesses])
 

 // restarts the game
 const restartGame = () =>{
  SetScore(0);
  SetGuesses(GuessQty);
  setGameStage(stages[0].name);
 }


  return (
    
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter}
      pickedWord={pickedWord} 
      pickedCategory={pickedCategory}
       letters={letters}
       guessedLetters = {guessedLetters}
       wrongLetters = {wrongLetters}
       guesses = {guesses}
       score = {score}
       />}
      {gameStage === 'end' && <GameOver restartGame={restartGame} score={score}/>}
    </div>
  );
}

export default App;
