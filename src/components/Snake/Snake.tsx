import { ISnakeProps } from "../../interfases/ISnakeProps";
import "./Snake.css";

const getRotate = (direction: string) => {
  switch (direction) {
    case "right":
      return "270deg";
    case "left":
      return "90deg";
    case "up":
      return "180deg";
    case "down":
      return "0deg";
  }
};

const Snake = (data: ISnakeProps) => {
  return (
    <div
      className={data.isHead ? "snake-head" : "snake"}
      style={{ transform: `rotate(${getRotate(data.direction)})` }}
    ></div>
  );
};

export default Snake;
