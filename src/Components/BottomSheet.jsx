import React, { useState, useEffect } from "react";
import "../Styles/BottomSheet.css";
import arrowkey from "../Components/up-arrow-5.png";

export default function BottomSheet({onCloseButtonClick}) {
  const [dragging, setDragging] = useState(false);
  const [initialY, setInitialY] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  

  useEffect(() => {
    const handleMouseMove = (e) => {
        if (dragging) {
          const currentY = e.clientY || (e.touches && e.touches[0].clientY);
      
          if (initialY === null) {
            setInitialY(currentY);
          }
      
          if (currentY !== undefined) { 
            const deltaY = currentY - initialY;
      
            const newOffsetY = offsetY + deltaY;
      
            setOffsetY(newOffsetY);
            setInitialY(currentY);
          }
        }
      };
    const handleMouseUp = () => {
      if (dragging) {
        setDragging(false);

       
        const middleHeight = window.innerHeight / 2;

        if (offsetY < -middleHeight / 2) {
     
          setOffsetY(-middleHeight / 2);
        } else {
         
          setOffsetY(0);
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleMouseMove);
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [dragging, initialY, offsetY]);

  const handleMouseDown = (e) => {
    setDragging(true);
    setInitialY(e.clientY || e.touches[0].clientY);
  };

  return (
    <div
      className={`bottom-sheet ${dragging ? "dragging" : ""}`}
      style={{
        transform: `translateY(${offsetY}px)`,
        transition: "transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
      }}
    >
      <div
        className="handle"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <img src={arrowkey} alt="" />
        <p onClick={onCloseButtonClick} className="cut">❌</p>{" "}
      </div>
      <div className="content"></div>
    </div>
  );
}
