import { FC } from "react";
import "./MouseController.css";

type TMouseControllerProps = {
  setDirection: (data: string) => void;
  direction: string;
};

const MouseController: FC<TMouseControllerProps> = ({
  direction,
  setDirection,
}) => {
  const setDirectionHandler = (data: string) => {
    switch (data) {
      case "ArrowRight":
        if (direction !== "left") {
          setDirection("right");
        }
        break;
      case "ArrowLeft":
        if (direction !== "right") {
          setDirection("left");
        }
        break;
      case "ArrowUp":
        if (direction !== "down") {
          setDirection("up");
        }
        break;
      case "ArrowDown":
        if (direction !== "up") {
          setDirection("down");
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="controller">
      <div>
        <button onClick={() => setDirectionHandler("ArrowLeft")}>left</button>
        <button onClick={() => setDirectionHandler("ArrowRight")}>right</button>
      </div>
      <div>
        <button onClick={() => setDirectionHandler("ArrowUp")}>up</button>
        <button onClick={() => setDirectionHandler("ArrowDown")}>down</button>
      </div>
    </div>
  );
};

export default MouseController;
