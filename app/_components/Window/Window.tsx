import Image from "next/image";
import styles from "./component.module.css";
import { useEffect, useState } from "react";
// ------------------------------------------------------------
// Components
// ------------------------------------------------------------
import WindowContent from "../WindowContent/WindowContent";
// ------------------------------------------------------------
// Types
// ------------------------------------------------------------
import { WindowInfo } from "@/app/types/WindowInfo";
interface Props {
  closeWindow: (window: WindowInfo) => void;
  windowInfo: WindowInfo;
}

export default function Window({ closeWindow, windowInfo }:Props) {
  // ------------------------------------------------------------
  // States
  // ------------------------------------------------------------
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  // ------------------------------------------------------------
  // Effects
  // ------------------------------------------------------------
  // Handles dragging the window around when clicked down
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;
      setPosition({ x: newX, y: newY });
    };
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, offset])
  // ------------------------------------------------------------
  // Functions
  // ------------------------------------------------------------
  // Closes window on button click
  const handleCloseClick = () => {
    closeWindow(windowInfo)
  }
  // ------------------------------
  // When mouse is clicked, set dragging state and offset state
  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    if (e.button !== 0) return
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };
  // ------------------------------
  // On button click, prevent dragging
  const handleMouseDownButton = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  }
  // ------------------------------
  // On mouse up, set dragging state to false
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  return (
    <section className={styles.window} style={{
      height: `${windowInfo.title === 'My CV' ? 600 : 200}px`,
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: `${windowInfo.title === 'My CV' ? 800 : 400}px`,
      zIndex: windowInfo.zIndex
    }} aria-label={`${windowInfo.title} window`}>
      {/* Title Bar */}
      <header onMouseDown={handleMouseDown} className={styles.titleBar} aria-label="Title bar">
        {/* Icon */}
        <Image src={windowInfo.icon} alt={`${windowInfo.title} icon`} className={styles.icon} draggable={false} aria-label="Window icon" />
        <div className={styles.titleBarSpacer} aria-label="Title bar container">
          {/* Title */}
          <div className={styles.title} aria-label="Window Title">{windowInfo.title}</div>
          {/* Buttons */}
          <div onMouseDown={handleMouseDownButton} className={styles.buttons} aria-label="Window buttons">
            <button className={styles.minimize} aria-label="Maximize button"></button>
            <button className={styles.maximize} aria-label="Minimize button"></button>
            <button onClick={handleCloseClick} className={styles.close} aria-label="Close button"></button>
          </div>
        </div>
      </header>
      {/* Content */}
      <div className={styles.content} aria-label="Window content">
        <WindowContent isDragging={isDragging} windowInfo={windowInfo} />
      </div>
    </section>
  )
}