import { useEffect, useState } from "react";
import "./App.css";
import TicTacToe from "./TicTacToe";

const App = () => {
  const INITIAL = "";
  const [gridSize, setGridSize] = useState(3);
  const [grid, setGrid] = useState(Array(gridSize * gridSize).fill(INITIAL));
  const [difficulty, setDifficulty] = useState("easy");
  const [isAgainstComputer, setIsAgainstComputer] = useState(false);
  function handleGridSizeChange(event) {
    setGridSize(parseInt(event.target.value));
  }
  function handleIsAgainstComputerChange(event) {
    setIsAgainstComputer(event.target.checked);
  }
  function handleDifficultyChange(event) {
    setDifficulty(event.target.value);
  }

  useEffect(() => {
    setGrid(Array(gridSize * gridSize).fill(INITIAL));
  }, [gridSize]);
  return (
    <div className="App">
      <label>
        Taille de la grille :{" "}
        <select value={gridSize} onChange={handleGridSizeChange}>
          <option value={3}>3x3</option>
          <option value={4}>4x4</option>
          <option value={5}>5x5</option>
          <option value={6}>6x6</option>
        </select>
      </label>
      <br />
      <label className="label">
        Jouer contre l'ordinateur :{" "}
        <input
          type="checkbox"
          checked={isAgainstComputer}
          onChange={handleIsAgainstComputerChange}
          className="input-checkbox"
        />
      </label>
      {isAgainstComputer && (
        <div className="difficulty">
          <label className="label">
            <input
              type="radio"
              name="difficulty"
              value="easy"
              checked={difficulty === "easy"}
              onChange={handleDifficultyChange}
              className="input-difficulty"
            />
            Easy
          </label>
          <label className="label">
            <input
              type="radio"
              name="difficulty"
              value="medium"
              checked={difficulty === "medium"}
              onChange={handleDifficultyChange}
              className="input-difficulty"
            />
            Medium
          </label>
          <label className="label">
            <input
              type="radio"
              name="difficulty"
              value="hard"
              checked={difficulty === "hard"}
              onChange={handleDifficultyChange}
              className="input-difficulty"
            />
            Hard
          </label>
        </div>
      )}
      <br />
      <div>
        <TicTacToe
          grid={grid}
          setGrid={setGrid}
          INITIAL={INITIAL}
          gridSize={gridSize}
          setGridSize={setGridSize}
          isAgainstComputer={isAgainstComputer}
          difficulty={difficulty}
        />
      </div>
    </div>
  );
};

export default App;
