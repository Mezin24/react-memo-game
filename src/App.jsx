import { useState, useEffect } from 'react'
import CardItem from './components/CardItem'
import {cardImages} from './data/cards'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import './App.css'

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiseOne, setChoiseOne] = useState(null);
  const [choiseTwo, setChoiseTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [match, setMatch] = useState(0);
  const { width, height } = useWindowSize()
  
  const startGame = () => { 
    const shuffledCards = _.shuffle([...cardImages, ...cardImages]).map(card => ({...card, id:uuidv4()}))
    setCards(shuffledCards)
    setTurns(0)  
    setMatch(0)
   }

   const handleChoise = (card) => {
    choiseOne  ?  setChoiseTwo(card) : setChoiseOne(card)
   }

   const resetTurns = () => {
    setChoiseOne(null)
    setChoiseTwo(null)
    setTurns(prev => prev + 1)
    setDisabled(false)
   }

   useEffect(() => {
    startGame()
   }, []);

   useEffect(() => {
    if (!choiseOne || !choiseTwo) return

    setDisabled(true)

    if (choiseOne.src === choiseTwo.src) {
      setCards(prev => prev.map(card => card.src === choiseOne.src ? ({...card, match: true}) : card))
      setMatch(prev => prev + 1)
      console.log(match);

      resetTurns()
    } else {
      setTimeout(() => { resetTurns() }, 1000)
    }

   }, [choiseOne, choiseTwo]);

  
  return <div className="App">
    <h1>Magic match</h1>
    <button onClick={startGame}>New Game</button>
    <div className="cards-grid">
    {cards.map(card => (
      <CardItem 
        key={card.id} 
        card={card}  
        handleChoise={handleChoise} 
        flipped={card === choiseOne || card === choiseTwo || card.match}
        disabled={disabled}
      />))}
    </div>
    <p>Turns: {turns}</p>
    {match === cardImages.length &&  <Confetti
      width={width}
      height={height}
    />}
  </div>
}
 
export default App;