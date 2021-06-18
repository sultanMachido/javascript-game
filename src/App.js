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
  const [left, setLeft] = useState(4);
  const [leftButton, setLeftButton] = useState(false);

  const gameBoard = useRef();
  // const gameBoard = useRef();
  // if (horizontalAxis.length>0 &verticalAxis.length>0) {
  //   console.log(gameBoard.current.childNodes[0].childNodes[0].style.backgroundColor='red')
  // }

  useEffect(() => {
    getStartingPosition(displaySpritePosition, left);
    generateRandomSpritePositions(displaySpritePosition);
    goLeft(left, displaySpritePosition);
  }, [displaySpritePosition, spritePosition, left]);

  const startGame = () => {
    console.log(width, height);
    let amountOfSquares = Array.from({ length: width }, (v, i) => i);
    let amountOfSquareRows = Array.from({ length: height }, (v, i) => i);
    setHorizontalAxis([...amountOfSquares]);
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

  let generateRandomSpritePositions = (displaySpritePosition) => {
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
      console.log(points);
      setSpritePosition([...points]);
      setdisplaySpritePosition(false);
      setLeftButton(true);
    }
  };

  let getStartingPosition = (displaySpritePosition, left) => {
    let coordinateX = Math.round(width / 2);
    let coordinateY = Math.round(height / 2);
    if (displaySpritePosition) {
      setStartingPosition(startingPosition.concat([coordinateX, coordinateY]));
      gameBoard.current.childNodes[coordinateY - 1].childNodes[
        coordinateX - 1
      ].firstChild.style.backgroundColor = "red";
    } else if (left > 4) {
      // gameBoard.current.childNodes[coordinateY - 1].childNodes[
      //   coordinateX - 1
      // ].firstChild.style.left=left+'px'
      console.log(spritePosition);
      getPathToFollow(startingPosition, spritePosition);
      move(coordinateX, coordinateY);
    }
  };

  let getSpritePositions = () => {
    if (spritePosition.length > 0) {
    }
  };
  let move = (coordinateX, coordinateY) => {
    let start =
      gameBoard.current.childNodes[coordinateY - 1].childNodes[coordinateX - 1]
        .firstChild.style;
    let end =
      gameBoard.current.childNodes[coordinateY - 1].childNodes[coordinateX - 1]
        .firstChild.style;
    let done;

    var pos = 0;

    setTimeout(setInterval(frame, 300), 5000);
    setInterval(frameLeft, 100);

    let pas = 0;

    function frame() {
      if (pos == 30) {
        clearInterval(id);
      } else {
        pos++;
        start.top = pos + "px";
       
      }
     
    }
    function frameLeft() {
      if (pas == 30) {
        clearInterval(id);
      } else {
        pas++;
        end.left = pas + "px";
        
      }
     
    }
  };


  getSpritePositions();

  let id = null;
  
  let getPathToFollow = (currentPosition, points) => {
    let currentPoint = [...currentPosition];
    let path = [];
    let moveX = {
      steps: "",
      direction: "",
    };

    let moveY = {
      steps: "",
      direction: "",
    };

    let count = 0;

    points.map((point) => {
     
      if (currentPoint[0] < point[0]) {
        let steps = point[0] - currentPoint[0];
        let direction = "right";

        moveX.steps = steps;
        moveX.direction = direction;
       
      }

      if (currentPoint[0] > point[0]) {
        let steps = currentPoint[0] - point[0];
        let direction = "left";

        moveX.steps = steps;
        moveX.direction = direction;
      
      }

      if (currentPoint[0] === point[0]) {
        let steps = 0;
        let direction = "none";

        moveX.steps = steps;
        moveX.direction = direction;
      
      }

      if (currentPoint[1] < point[1]) {
        let steps = point[1] - currentPoint[1];
        let direction = "down";

        moveY.steps = steps;
        moveY.direction = direction;
       
      }

      if (currentPoint[1] > point[1]) {
        let steps = currentPoint[1] - point[1];
        let direction = "top";

        moveY.steps = steps;
        moveY.direction = direction;
        
      }

      if (currentPoint[1] === point[1]) {
        let steps = 0;
        let direction = "none";

        moveY.steps = steps;
        moveY.direction = direction;
      
      }
      console.log(moveX, moveY, "moves");

      let x = { ...moveX };
      let y = { ...moveY };
      count++;
      path.push([x, y]);
     
      currentPoint[0] = point[0];
      currentPoint[1] = point[1];
      
    });
    
    return path;
  };

  let goLeft = () => {
    if (left > 4 && displaySpritePosition) {
      //   gameBoard.current.childNodes[5].childNodes[5].firstChild.style.backgroundColor='green'
      // gameBoard.current.childNodes[5].childNodes[5].firstChild.style.left=left+'px'
    }
  };

  let moveLeft = () => {
    // console.log(gameBoard.current.childNodes[5].childNodes[5].firstChild.style,'Check')
    setLeft(left + 1);
  };

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
        <Button variant="contained" color="primary" onClick={moveLeft}>
          Move left
        </Button>
      </div>
      <p>{left}</p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ marginTop: "50px" }} ref={gameBoard}>
          {verticalAxis.map(() => squares)}
        </div>
      </div>
    </div>
  );
}

export default App;
