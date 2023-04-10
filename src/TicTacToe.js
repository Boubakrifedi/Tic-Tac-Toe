import { useState, useEffect, useCallback, useMemo } from "react";
import Square from "./Square.js";
import EndGame from "./EndGame.js";
import clickSound from "./Clicksound.wav";
import winSound from "./winsound.wav";
import drawSound from "./drawgamesound.wav";

const X_PLAYER = "X";
const O_PLAYER = "O";

const TicTacToe = ({
  grid,
  setGrid,
  INITIAL,
  setGridSize,
  gridSize,
  isAgainstComputer,
  difficulty,
}) => {
  const winCombination = [];

  // Rows
  for (let i = 0; i < grid.length; i += gridSize) {
    winCombination.push(Array.from({ length: gridSize }, (_, j) => i + j));
  }

  // Columns
  for (let i = 0; i < gridSize; i++) {
    winCombination.push(
      Array.from({ length: gridSize }, (_, j) => i + j * gridSize)
    );
  }

  // Diagonal from top-left to bottom-right
  winCombination.push(
    Array.from({ length: gridSize }, (_, i) => i * (gridSize + 1))
  );

  // Diagonal from bottom-left to top-right
  winCombination.push(
    Array.from({ length: gridSize }, (_, i) => (i + 1) * (gridSize - 1))
  );

  const [player, setPlayer] = useState(X_PLAYER);
  const [prevFirstPlayer, setPrevFirstPlayer] = useState(X_PLAYER);
  const [gameFinished, setGameFinished] = useState(false);
  const [randomMove, setRandomMove] = useState(true);
  const [draw, setDraw] = useState(false);
  const clickaudio = useMemo(() => new Audio(clickSound), [clickSound]);
  const winaudio = useMemo(() => new Audio(winSound), [winSound]);
  const drawaudio = useMemo(() => new Audio(drawSound), [drawSound]);

  useEffect(() => {
    if (prevFirstPlayer === X_PLAYER && gameFinished) {
      setPrevFirstPlayer(O_PLAYER);
    }
    if (prevFirstPlayer === O_PLAYER && gameFinished) {
      setPrevFirstPlayer(X_PLAYER);
    }
  }, [player]);

  const newGame = () => {
    setGrid(Array(gridSize * gridSize).fill(INITIAL));
    setGameFinished(false);
    setDraw(false);
    setGridSize(gridSize);
    setPlayer(prevFirstPlayer);
    setRandomMove(!randomMove);
    winaudio.pause();
    winaudio.currentTime = 0;
    drawaudio.pause()
    drawaudio.currentTime = 0;
  };

  const handleClick = useCallback(
    (id) => {
      if (!gameFinished && grid[id] === INITIAL) {
        const newGrid = [...grid];
        if (player === O_PLAYER) {
          newGrid[id] = O_PLAYER;
        } else {
          newGrid[id] = X_PLAYER;
        }
        setGrid(newGrid);
        setPlayer(player === X_PLAYER ? O_PLAYER : X_PLAYER);
        clickaudio.play();
      }
    },
    [gameFinished, player, grid, INITIAL, setGrid]
  );

  const isGameOver = () => {
    if (!gameFinished) {
      for (let i = 0; i < winCombination.length; i++) {
        const combination = winCombination[i];
        if (combination.every((index) => grid[index] === X_PLAYER)) {
          setGameFinished(true);
          winaudio.play();
          return;
        }
        if (combination.every((index) => grid[index] === O_PLAYER)) {
          setGameFinished(true);
          winaudio.play();
          return;
        }
      }
      if (!grid.includes(INITIAL)) {
        setDraw(true);
        setGameFinished(true);
        drawaudio.play()
      }
    }
  };

  function findBestMove(grid, player, gridSize) {
    // Check for a winning move
    for (let i = 0; i < gridSize * gridSize; i++) {
      if (grid[i] === INITIAL) {
        grid[i] = player;
        if (checkWin(grid, player, gridSize)) {
          return i;
        }
        grid[i] = INITIAL;
      }
    }
    // Check for a blocking move
    const opponent = player === O_PLAYER ? X_PLAYER : O_PLAYER;
    for (let i = 0; i < gridSize * gridSize; i++) {
      if (grid[i] === INITIAL) {
        grid[i] = opponent;
        if (checkWin(grid, opponent, gridSize)) {
          return i;
        }
        grid[i] = INITIAL;
      }
    }
    // Pick a random move
    const availableMoves = grid.reduce((moves, value, index) => {
      if (value === INITIAL) {
        moves.push(index);
      }
      return moves;
    }, []);
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  }

  function checkWin(grid, player, gridSize) {
    // Check rows
    for (let i = 0; i < gridSize * gridSize; i += gridSize) {
      let hasWon = true;
      for (let j = 0; j < gridSize; j++) {
        if (grid[i + j] !== player) {
          hasWon = false;
          break;
        }
      }
      if (hasWon) {
        return true;
      }
    }
    // Check columns
    for (let i = 0; i < gridSize; i++) {
      let hasWon = true;
      for (let j = 0; j < gridSize; j++) {
        if (grid[i + j * gridSize] !== player) {
          hasWon = false;
          break;
        }
      }
      if (hasWon) {
        return true;
      }
    }
    // Check diagonals
    let hasWon = true;
    for (let i = 0; i < gridSize * gridSize; i += gridSize + 1) {
      if (grid[i] !== player) {
        hasWon = false;
        break;
      }
    }
    if (hasWon) {
      return true;
    }

    hasWon = true;
    for (
      let i = gridSize - 1;
      i < gridSize * (gridSize - 1) + 1;
      i += gridSize - 1
    ) {
      if (grid[i] !== player) {
        hasWon = false;
        break;
      }
    }
    if (hasWon) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (isAgainstComputer && player === O_PLAYER) {
      let bestMove;
      if (difficulty === "hard") {
        bestMove = findBestMove([...grid], O_PLAYER, gridSize);
      } else if (difficulty === "medium") {
        if (randomMove) {
          const availableMoves = grid.reduce((moves, value, index) => {
            if (value === INITIAL) {
              moves.push(index);
            }
            return moves;
          }, []);
          const randomIndex = Math.floor(Math.random() * availableMoves.length);
          bestMove = availableMoves[randomIndex];
        } else {
          bestMove = findBestMove([...grid], O_PLAYER, gridSize);
        }
      } else {
        const availableMoves = grid.reduce((moves, value, index) => {
          if (value === INITIAL) {
            moves.push(index);
          }
          return moves;
        }, []);
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        bestMove = availableMoves[randomIndex];
      }
      handleClick(bestMove);
    }
  }, [player, isAgainstComputer, grid, handleClick, difficulty, gridSize]);

  isGameOver();

  useEffect(() => {
    setGrid(Array(gridSize * gridSize).fill(INITIAL));
    setGameFinished(false);
    setDraw(false);
    setGridSize(gridSize);
    setPlayer(prevFirstPlayer);
    setRandomMove(!randomMove);
  }, [isAgainstComputer]);

  return (
    <div className="game-container">
      {!gameFinished && !isAgainstComputer && (
        <div className="player-turn">
          Turn player : {player === X_PLAYER ? X_PLAYER : O_PLAYER}
        </div>
      )}
      {gameFinished && (
        <EndGame
          newGame={newGame}
          player={player}
          draw={draw}
          X_PLAYER={X_PLAYER}
          O_PLAYER={O_PLAYER}
        />
      )}
      <Square
        clickedArray={grid}
        handleClick={handleClick}
        gridSize={gridSize}
      />
    </div>
  );
};
export default TicTacToe;
