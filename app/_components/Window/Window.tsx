import Image from "next/image";
import styles from "./component.module.css";
import { useEffect, useState } from "react";
import WindowContent from "../WindowContent/WindowContent";
import { WindowInfo } from "@/app/types/WindowInfo";

interface Props {
  closeWindow: (window: WindowInfo) => void;
  windowInfo: WindowInfo;
}
export default function Window({ closeWindow, windowInfo }:Props) {
  const [position, setPosition] = useState({ x: 100, y: 100 }); // Initial position
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

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
  const handleCloseClick = () => {
    closeWindow(windowInfo)
  }
  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };
  const handleMouseDownButton = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  }

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  return (
    <div className={styles.window} style={{
      height: `${windowInfo.title === 'My CV' ? 600 : 200}px`,
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: `${windowInfo.title === 'My CV' ? 800 : 400}px`,
      zIndex: windowInfo.zIndex
    }}>
      {/* Title Bar */}
      <div onMouseDown={handleMouseDown} className={styles.titleBar}>
        {/* Icon */}
        <Image src={windowInfo.icon} alt={windowInfo.title} className={styles.icon} />
        <div className={styles.titleBarSpacer}>
          {/* Title */}
          <div className={styles.title}>{windowInfo.title}</div>
          {/* Buttons */}
          <div onMouseDown={handleMouseDownButton} className={styles.buttons}>
            <button className={styles.minimize}></button>
            <button className={styles.maximize}></button>
            <button onClick={handleCloseClick} className={styles.close}></button>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className={styles.content}>
        <WindowContent isDragging={isDragging} windowInfo={windowInfo} />
      </div>
    </div>
  )
}