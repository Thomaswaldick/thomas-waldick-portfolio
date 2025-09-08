import Image from "next/image";
import styles from "./component.module.css";
import { useEffect, useMemo, useState } from "react";
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
  currentActiveWindow: WindowInfo | null;
  maximizeWindow: (window: WindowInfo) => void;
  minimizeWindow: (window: WindowInfo) => void;
  unmaximizeWindow: (window: WindowInfo) => void;
  updateCurrentActiveWindow: (windowInfo: WindowInfo | null) => void;
  windowInfo: WindowInfo;
}

export default function Window({ closeWindow, currentActiveWindow, maximizeWindow, minimizeWindow, unmaximizeWindow, updateCurrentActiveWindow, windowInfo }:Props) {
  // ------------------------------------------------------------
  // States
  // ------------------------------------------------------------
  const [oldPosition, setOldPosition] = useState({ x: 100, y: 100 });
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  // ------------------------------------------------------------
  // Effects
  // ------------------------------------------------------------
  // Handles dragging the window around when clicked down
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || windowInfo.state === "maximized") return;
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
  // Memo
  // ------------------------------------------------------------
  const isActiveWindow = useMemo(() => {
    return currentActiveWindow?.title === windowInfo.title
  }, [currentActiveWindow, windowInfo])
  // ------------------------------------------------------------
  // Functions
  // ------------------------------------------------------------
  // Gets the window height based on the window title and state
  const getWindowHeight = () => {
    if (windowInfo.state === "maximized") {
      return window.innerHeight - 30
    } else if (windowInfo.title === "My CV") {
      return 600
    } else {
      return 200
    }
  }
  // ------------------------------
  // Gets the window width based on the window title and state
  const getWindowWidth = () => {
    if (windowInfo.state === "maximized") {
      return window.innerWidth
    } else if (windowInfo.title === "My CV") {
      return 800
    } else {
      return 400
    }
  }
  // ------------------------------
  // Closes window on button click
  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent the click from bubbling up to handleWindowClick
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
  // ------------------------------
  // On maximize button click, maximize the window
  const handleMaximizeClick = () => {
    if (windowInfo.state === "maximized") {
      setOldPosition({ x: 100, y: 100 })
      setPosition(oldPosition)
      unmaximizeWindow(windowInfo)
    } else {
      setOldPosition(position)
      setPosition({ x: 0, y: 0 })
      maximizeWindow(windowInfo)
    }
  }
  // ------------------------------
  // On window click, update the current active window
  const handleWindowClick = () => {
    updateCurrentActiveWindow(windowInfo)
  };
  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  return (
    <section onMouseDown={handleWindowClick} className={styles.window} style={{
      display: windowInfo.state === "minimized" ? "none" : "",
      height: `${getWindowHeight()}px`,
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: `${getWindowWidth()}px`,
      zIndex: windowInfo.zIndex
    }} aria-label={`${windowInfo.title} window`}>
      {/* Title Bar */}
      <header onMouseDown={handleMouseDown} className={`${styles.titleBar} ${!isActiveWindow ? styles.inactiveWindow : ''}`} aria-label="Title bar">
        {/* Icon */}
        <Image src={windowInfo.icon} alt={`${windowInfo.title} icon`} className={styles.icon} draggable={false} aria-label="Window icon" />
        <div className={styles.titleBarSpacer} aria-label="Title bar container">
          {/* Title */}
          <div className={`${styles.title} ${!isActiveWindow ? styles.inactiveWindow : ''}`} aria-label="Window Title">{windowInfo.title}</div>
          {/* Buttons */}
          <div onMouseDown={handleMouseDownButton} className={`${styles.buttons} ${!isActiveWindow ? styles.inactiveWindow : ''}`} aria-label="Window buttons">
            <button onClick={() => minimizeWindow(windowInfo)} className={styles.minimize} aria-label="Maximize button"></button>
            <button onClick={handleMaximizeClick} className={styles.maximize} aria-label="Minimize button"></button>
            <button onClick={handleCloseClick} className={styles.close} aria-label="Close button"></button>
          </div>
        </div>
      </header>
      {/* Content */}
      <div className={`${styles.content} ${!isActiveWindow ? styles.inactiveWindow : ''}`} aria-label="Window content">
        <WindowContent isDragging={isDragging} windowInfo={windowInfo} />
      </div>
    </section>
  )
}