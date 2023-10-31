import React from "react";
import "./Food.css";

const Food: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  return (
    <div
      className="food"
      style={{ left: `${x * 32}px`, top: `${y * 32}px` }}
    ></div>
  );
};

export default Food;
