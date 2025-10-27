import React,{useState} from 'react';
import './Color.css';

export default function Color() {

    const [bgColor,setBgcolor] = useState(
        "linear-gradient(135deg , #af8e8eff 0% , #bd5252ff 100%)"
        );
    
    const cards = [
        {emoji:"🦁" , Color:"#cf4b0eff" , hex:"#cf4b0eff"},
        {emoji:"🐯" , Color:"#dda815ff" , hex:"#dda815ff"},
        {emoji:"🐠" , Color:"#2c9460ff" , hex:"#2c9460ff"},
        {emoji:"🐸" , Color:"#0c9e38ff" , hex:"#0c9e38ff"},
        {emoji:"🐬" , Color:"#0e7e86ff" , hex:"#0e7e86ff"},
        {emoji:"🐳" , Color:"#1a59ceff" , hex:"#1a59ceff"},
        {emoji:"🐘" , Color:"#575050ff" , hex:"#575050ff"},
        {emoji:"🐙" , Color:"#a51e1eff" , hex:"#a51e1eff"},
        {emoji:"🐽" , Color:"#c95a38ff" , hex:"#c95a38ff"},
        {emoji:"🦄" , Color:"#761783ff" , hex:"#761783ff"},
        {emoji:"🐇" , Color:"#eee9e9ff" , hex:"#1b1919ff"},
        {emoji:"🐺" , Color:"#1d1c1cff" , hex:"#1d1c1cff"},
    ]
                                                        
    const handleCardClick = (Color)=>{
        setBgcolor(Color);
    }

  return (


    <div className='app' style={{backgroundColor : bgColor}}>
        <div className='content'>
        <div className="container">
            {cards.map((card,index)=>(
                <div 
                key={index}
                className='card'
                onClick={()=> handleCardClick(card.Color)}>
                <div className='cardTop'
                style={{backgroundColor: card.Color}}>
                    <span className='emoji'>{card.emoji}</span>
                </div>
                <div className='cardBottom'>
                    <span className="hexCode" style={{color:card.hex}}>{card.hex}</span>
                </div>
                </div>
            )
            )}
        </div>
        </div>
    </div>
  )
}
