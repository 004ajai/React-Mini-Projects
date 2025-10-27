import React from 'react';
import {BrowserRouter as Router , Routes , Route , Link} from "react-router-dom";
import ToDo from './Components/ToDo/ToDo';
import RockPaperScissors from './Components/RockPaperScissors/RockPaperScissors';
import Weather from './Components/Weather/Weather';
import ColourPicker from './Components/ColourPicker/ColourPicker';
import Color from './Components/colors/color';


export default function App() {
  return (
    <Router>
      <div>
        <h1>My React Mini Projects</h1>
      <nav>
        <Link to="/todo">ToDo</Link>
        <Link to="/rps">RockPaperScissor</Link>
        <Link to="/colourPicker">ColourPicker</Link>
        <Link to="/weather">Weather</Link>
        <Link to="/color">Color</Link>
      </nav>
        <Routes>
          <Route path='/todo' element={<ToDo/>}></Route>
          <Route path='/rps' element={<RockPaperScissors/>}></Route>
          <Route path='/colourPicker' element={<ColourPicker/>}></Route>
          <Route path='/weather' element={<Weather/>}></Route>
          <Route path='/color' element={<Color/>}></Route>

        </Routes>

      </div>
    </Router>
  )
}
