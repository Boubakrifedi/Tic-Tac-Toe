const EndGame = ({ newGame, player, draw, X_PLAYER, O_PLAYER }) => {
    return (
      <div className="end-game-screen">
        {!draw && (
          <span className="win-text">
            Player {player !== X_PLAYER ? X_PLAYER : O_PLAYER} Win!
          </span>
        )}
        {draw && <span className="win-text">Draw</span>}
        <button className="btn" onClick={newGame}>
          New Game
        </button>
      </div>
    );
  };
  export default EndGame;
  