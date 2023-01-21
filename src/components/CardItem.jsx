import './CardIte.css'
import coverImg from '/img/cover.png'

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
          src={card.src} 
          alt="card front"  
          className="front"/>
        <img 
          src={coverImg}
          alt="card cover"  
          className="back" 
          onClick={() => handleClick(card)}/>
      </div>
    </div>
   );
}
 
export default CardItem;