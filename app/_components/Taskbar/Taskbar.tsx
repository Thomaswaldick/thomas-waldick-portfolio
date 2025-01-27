import Image from "next/image";
import styles from "./component.module.css";
import startButtonDefaultPic from "@/public/StartButton.png"
import startButtonHoverPic from "@/public/StartButton_Hover.png"
import startButtonClickPic from "@/public/StartButton_Click.png"
import { useEffect, useState } from "react";
import { WindowInfo } from "@/app/types/WindowInfo";

interface Props {
  activeWindows: WindowInfo[];
  isMobile: boolean;
  isSmallScreen: boolean;
  startMenuOpened: boolean;
  toggleStartMenu: () => void;
}
export default function Taskbar({ activeWindows, isMobile, isSmallScreen, startMenuOpened, toggleStartMenu }:Props) {
  const [startButtonPic, setStartButtonPic] = useState(startButtonDefaultPic.src);
  const [timeString, setTimeString] = useState('');
  useEffect(() => {
    updateTime()
    const intervalId = setInterval(() => {
      updateTime()
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])
  useEffect(() => {
    if (!startMenuOpened && startButtonPic !== startButtonDefaultPic.src && startButtonPic !== startButtonHoverPic.src) {
      setStartButtonPic(startButtonDefaultPic.src)
    } else if (startMenuOpened && startButtonPic !== startButtonClickPic.src) {
      setStartButtonPic(startButtonClickPic.src)
    }
  }, [startMenuOpened, startButtonPic])

  const condensedTitle = (title: string) => {
    if (title.length < 18) {
      return title
    } else {
      return title.slice(0, 15) + '...'
    }
  }
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!startMenuOpened) {
      setStartButtonPic(startButtonClickPic.src)
    } else {
      setStartButtonPic(startButtonDefaultPic.src)
    }
    toggleStartMenu()
  }
  const handleMouseEnter = () => {
    if (!startMenuOpened) {
      setStartButtonPic(startButtonHoverPic.src);
    }
  }
  const handleMouseLeave = () => {
    if (!startMenuOpened) {
      setStartButtonPic(startButtonDefaultPic.src);
    }
  }
  const updateTime = () => {
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    let minuteString = ""
    let hourString = ""
    if (minutes < 10) {
      minuteString = "0"
    }
    minuteString += minutes.toString();
    const suffix = hour >= 12 ? "PM" : "AM";
    if (hour === 0) {
      hourString = "12";
    } else if (hour < 10) {
      hourString = "0" + hour.toString();
    } else if (hour > 12) {
      hourString = (hour % 12).toString();
    } else {
      hourString = hour.toString();
    }
    setTimeString(hourString + ":" + minuteString + " " + suffix);
  }
  return (
    <nav className={styles.taskBar} aria-label="Task Bar">
      <div className={styles.row}>
        {!isSmallScreen && !isMobile ?
          <button className={styles.startButton} aria-label="Start Button" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
            <Image src={startButtonPic} alt="Start Button Image" height={30} width={100} />
          </button> : null
        }
        <div className={styles.activeWindows}>
          {activeWindows.map((window) =>
            <div className={styles.window} key={window.title}>
              <Image src={window.icon} className={styles.windowIcon} alt={window.title} />
              <div className={styles.windowText}>{condensedTitle(window.title)}</div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.systemTray}>
        <div className={styles.clock}>{timeString}</div>
      </div>
    </nav>
  )
}