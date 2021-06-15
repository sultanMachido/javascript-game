import logo from "./logo.svg";
import "./App.css";
import React, { useState,useRef,useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Square from './components/Square/Square'

function App() {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [horizontalAxis,setHorizontalAxis] = useState([]);
  const [verticalAxis,setVerticalAxis] = useState([]);
 
   
  const gameBoard = useRef();
  // const gameBoard = useRef();
  // if (horizontalAxis.length>0 &verticalAxis.length>0) {
  //   console.log(gameBoard.current.childNodes[0].childNodes[0].style.backgroundColor='red')
  // }

  useEffect(()=>{
       console.log('hey1')
  if (horizontalAxis.length>0 &verticalAxis.length>0) {
    console.log(gameBoard.current.childNodes[0].childNodes[0].style.backgroundColor='red')
   }
  },[horizontalAxis])
 
  const startGame=()=>{
    console.log(width,height)
    let amountOfSquares = Array.from({length: width}, (v, i) => i);
    let amountOfSquareRows = Array.from({length: height}, (v, i) => i);
    setHorizontalAxis([...amountOfSquares])
    setVerticalAxis([...amountOfSquareRows])
    console.log(horizontalAxis)

   
    
  }
  let squares
  // current.childNodes[0].childNodes[0]
  if (horizontalAxis.length > 0) {
      squares = (
        <div style={{display:'flex'}}>
         {horizontalAxis.map(()=><Square />)}
       </div>
      )
   }
  
  let generateRandomSpritePositions=(coordinateX,coordinateY)=>{
     
  } 

 let setStartingPosition=()=>{

  }

  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "center",marginTop:'10px'}}>
        <div style={{margin:'0 10px 0 10px'}}>
          <TextField required id="standard-required" label="width" onChange={event=>setWidth(event.target.value)} />
        </div>
        <div style={{margin:'0 10px 0 10px'}}>
          <TextField required id="standard" label="height" onChange={event=>setHeight(event.target.value)} />
        </div>
        <Button variant="contained" color="primary" onClick={startGame}>
          Start Game
        </Button>
      </div>
      
      <div style={{display:'flex',justifyContent:'center'}}>
         <div style={{marginTop:'50px'}} ref={gameBoard}>
          {verticalAxis.map(()=>squares)}
         </div>
      </div>
       
    </div>
  );
}

export default App;
