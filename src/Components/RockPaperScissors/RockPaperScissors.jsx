import React,{useState} from 'react'
import './RockPaperScissors.css'
import Rock from "../../assets/Rock.jpeg"
import Paper from "../../assets/Paper.jpeg"
import Scissors from "../../assets/Scissor.jpeg"



export default function RockPaperScissors() {

    const [playerScore,setPlayerScore] = useState(0);
    const [computerScore,setComputrScore] = useState(0);
    const [rounds,setRounds] = useState(0);
    const[result,setResult] = useState("");

    const play = (playerChoice) =>{
        const choices=["Rock" , "Paper" , "Scissor"]
        const computerChoice = choices[Math.floor(Math.random()*3)]
        setRounds((prev) => prev+1)   

        if (playerChoice == computerChoice){
            setResult("It's Draw");
        } else if(
            (playerChoice=="Rock" && computerChoice=="Scissor") ||
            (playerChoice=="Paper" && computerChoice=="Rock") ||
            (playerChoice=="Scissor" && computerChoice=="Paper")
        ){
            setPlayerScore((prev)=>prev+1);
            setResult(
                `you win! ${playerChoice.toUpperCase()} beats ${computerChoice.toUpperCase()}`
            );
        }else{

            setComputerScore((prev)=>prev+1);
            setResult(
                `you lose! ${computerChoice.toUpperCase()} beats ${playerChoice.toUpperCase()}`
            );
        }
        }




  return (
    <div className='game-container'>
        <h1>RockPaperScissor</h1>

        <div className='choices'>
            <img src={Rock} alt="Rock" onClick={()=> play("Rock")} />
            <img src={Paper} alt="Paper" onClick={()=> play("Paper")} />
            <img src={Scissors} alt="Scissor" onClick={()=> play("Scissor")} />
        </div>
        <div className="score-board">
            <p>Rounds: <span>{rounds}</span></p>
            <p>Player: <span>{playerScore}</span> - Computer: <span>{computerScore}</span></p>

        </div>

        <div id="result">{result}</div>
    </div>
  )
}
