import logo from "./logo.svg";
import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Square from "./components/Square/Square";

function App() {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [horizontalAxis, setHorizontalAxis] = useState([]);
  const [verticalAxis, setVerticalAxis] = useState([]);
  const [startingPosition, setStartingPosition] = useState([]);
  const [spritePosition, setSpritePosition] = useState([]);
  const [displaySpritePosition, setdisplaySpritePosition] = useState(false);

  const gameBoard = useRef();
  // const gameBoard = useRef();
  // if (horizontalAxis.length>0 &verticalAxis.length>0) {
  //   console.log(gameBoard.current.childNodes[0].childNodes[0].style.backgroundColor='red')
  // }

  useEffect(() => {
    console.log("hey1");
    console.log(width);

    getStartingPosition(displaySpritePosition);
    generateRandomSpritePositions(displaySpritePosition);
  }, [displaySpritePosition, spritePosition]);

  const startGame = () => {
    console.log(width, height);
    let amountOfSquares = Array.from({ length: width }, (v, i) => i);
    let amountOfSquareRows = Array.from({ length: height }, (v, i) => i);
    setHorizontalAxis((horizontalAxis) => [horizontalAxis, ...amountOfSquares]);
    setVerticalAxis([...amountOfSquareRows]);
    setdisplaySpritePosition(true);

    let coordinateX = Math.round(width / 2);
    let coordinateY = Math.round(height / 2);

    //  setStartingPosition(startingPosition.concat([coordinateX,coordinateY]))
    //  getStartingPosition()
  };
  let squares;
  // current.childNodes[0].childNodes[0]
  if (horizontalAxis.length > 0) {
    squares = (
      <div style={{ display: "flex" }}>
        {horizontalAxis.map((s) => (
          <Square key={s} />
        ))}
      </div>
    );
  }

  let generateRandomSpritePositions = (horizontal) => {
    //  let xAxis = Math.floor(Math.random() * width);
    //  let yAxis = Math.floor(Math.random() * height);
    if (displaySpritePosition) {
      let x = 0;
      let points = [];
      do {
        let xAxis = Math.floor(Math.random() * width);
        let yAxis = Math.floor(Math.random() * height);
        let point = [xAxis, yAxis];
        points.push();
        points.push(point);

        console.log(points);

        x++;
      } while (x < height);

      console.log(startingPosition);
      points.map((point) => {
        gameBoard.current.childNodes[point[1]].childNodes[
          point[0]
        ].style.backgroundColor = "blue";
      });
      setSpritePosition([...spritePosition, ...points]);
      setdisplaySpritePosition(false);
    }
  };

  let getStartingPosition = (displaySpritePosition) => {
    if (displaySpritePosition) {
      let coordinateX = Math.round(width / 2);
      let coordinateY = Math.round(height / 2);

      setStartingPosition(startingPosition.concat([coordinateX, coordinateY]));
      gameBoard.current.childNodes[coordinateY - 1].childNodes[
        coordinateX - 1
      ].firstChild.style.backgroundColor = "red";
    }
  };

  let getSpritePositions = () => {
    if (spritePosition.length > 0) {
      console.log(spritePosition);
      console.log(startingPosition);
      spritePosition.map(point=>move(startingPosition,point))
    }
  };
  let move = (currentPosition, destination) => {
    const [destX, destY] = [destination];
    const [locatnX, locatnY] = [currentPosition];

    //horizontal movement
    if (destX > locatnX) {
      let count = destX - locatnX
      for (let index = 0; index < count; index++) {
        gameBoard.current.childNodes[locatnY].childNodes[
          locatnX
        ].firstChild.style.left = "20px";
      }
      setStartingPosition([...startingPosition,[destX,locatnY]])
    } else if (destX < locatnX) {
      let count = locatnX - destX
      for (let index = 0; index < count; index++) {
        gameBoard.current.childNodes[locatnY].childNodes[
          locatnX
        ].firstChild.style.right = "20px";
      }
      setStartingPosition([...startingPosition,[destX,locatnY]])
    } else {
    }

    //vertical movement
    if (destY > locatnY) {
      let count = destY - locatnY
      for (let index = 0; index < count; index++) {
        gameBoard.current.childNodes[locatnY].childNodes[
          locatnX
        ].firstChild.style.bottom = "20px";
      }
      setStartingPosition([...startingPosition,[destX,destY]])
    } else if (destY < locatnY) {
      let count = locatnY - destY
      for (let index = 0; index < count; index++) {
        gameBoard.current.childNodes[locatnY].childNodes[
          locatnX
        ].firstChild.style.top = "20px";
      }
      setStartingPosition([...startingPosition,[destX,destY]])
    } else {
    }
  };
  getSpritePositions();

  return (
    <div className="App">
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <div style={{ margin: "0 10px 0 10px" }}>
          <TextField
            required
            id="standard-required"
            label="width"
            onChange={(event) => setWidth(event.target.value)}
          />
        </div>
        <div style={{ margin: "0 10px 0 10px" }}>
          <TextField
            required
            id="standard"
            label="height"
            onChange={(event) => setHeight(event.target.value)}
          />
        </div>
        <Button variant="contained" color="primary" onClick={startGame}>
          Start Game
        </Button>
      </div>
      <p>{width}</p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ marginTop: "50px" }} ref={gameBoard}>
          {verticalAxis.map(() => squares)}
        </div>
      </div>
    </div>
  );
}

export default App;
