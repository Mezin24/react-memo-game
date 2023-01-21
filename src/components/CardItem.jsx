import './CardIte.css'

const CardItem = ({card, handleChoise, flipped, disabled}) => {

  const handleClick = (card) => { 
    if (!disabled) {
      handleChoise(card)
    }
   }

  return ( 
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <img 
          src={`./src/${card.src}`} 
          alt="card front"  
          className="front"/>
        <img 
          src='./src/img/cover.png' 
          alt="card cover"  
          className="back" 
          onClick={() => handleClick(card)}/>
      </div>
    </div>
   );
}
 
export default CardItem;