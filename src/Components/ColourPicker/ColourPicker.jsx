import React,{useState,useEffect} from 'react';
import './ColourPicker.css';

export default function ColourPicker() {

  const [color , setColor] = useState("#ffffff")

  const handleChange = (e)=>{
    setColor(e.target.value)
  }

  useEffect(()=>{
    document.body.style.backgroundColor = color
  },[color])

  return (
    <div>
        
       <h1>React ColourPicker</h1>

       <input 
       type="color" 
       value={color}
       onChange={handleChange} 
       className='color-input'
       />
       <div className='color-display'  style={{backgroundColor:color}}>
        <p>{color}</p>
        </div>
    </div>
  )
}
