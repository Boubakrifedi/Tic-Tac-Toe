import React from "react";

const Square = ({ clickedArray, handleClick, gridSize }) => {
  const squareSize = 100 / gridSize;
  const strokeWidth = 3;
  const strokeColor = "black";
  const crossColor = "red";
  const circleColor = "blue";
  const calculateCoordinates = (index) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const x = col * squareSize + squareSize / 2;
    const y = row * squareSize + squareSize / 2;

    return { x, y };
  };
  const drawCross = (index) => {
    const { x, y } = calculateCoordinates(index);
    const radius = squareSize / 3 - strokeWidth;
    const rectX = (index % gridSize) * squareSize;
    const rectY = Math.floor(index / gridSize) * squareSize;

    return (
      <>
        <rect
          key={index}
          x={rectX}
          y={rectY}
          width={squareSize}
          height={squareSize}
          fill="white"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <g>
          <line
            x1={x - radius}
            y1={y - radius}
            x2={x + radius}
            y2={y + radius}
            stroke={crossColor}
            strokeWidth={strokeWidth}
          />
          <line
            x1={x + radius}
            y1={y - radius}
            x2={x - radius}
            y2={y + radius}
            stroke={crossColor}
            strokeWidth={strokeWidth}
          />
        </g>
      </>
    );
  };

  const drawCircle = (index) => {
    const { x, y } = calculateCoordinates(index);
    const radius = squareSize / 3 - strokeWidth;
    const rectX = (index % gridSize) * squareSize;
    const rectY = Math.floor(index / gridSize) * squareSize;

    return (
      <>
        <rect
          key={index}
          x={rectX}
          y={rectY}
          width={squareSize}
          height={squareSize}
          fill="white"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={x}
          cy={y}
          r={radius}
          stroke={circleColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
      </>
    );
  };

  return (
    <svg viewBox={`0 0 100 100`}>
      {clickedArray.map((item, index) => {
        if (item === "") {
          return (
            <rect
              key={index}
              x={(index % gridSize) * squareSize}
              y={Math.floor(index / gridSize) * squareSize}
              width={squareSize}
              height={squareSize}
              fill="white"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              onClick={() => handleClick(index)}
            />
          );
        } else if (item === "X") {
          return drawCross(index);
        } else {
          return drawCircle(index);
        }
      })}
    </svg>
  );
};

export default Square;
