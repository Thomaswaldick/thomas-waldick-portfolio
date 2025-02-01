import Image from "next/image";
import styles from "./component.module.css";
import { useEffect, useState } from "react";
// ---------- Assets ----------
import startButtonDefaultPic from "@/public/StartButton.png"
import startButtonHoverPic from "@/public/StartButton_Hover.png"
import startButtonClickPic from "@/public/StartButton_Click.png"
// ---------- Types ----------
import { WindowInfo } from "@/app/types/WindowInfo";
interface Props {
  activeWindows: WindowInfo[];
  mobileFeatures: boolean;
  screenSettingsSet: boolean;
  startMenuOpened: boolean;
  toggleStartMenu: () => void;
}

export default function Taskbar({ activeWindows, mobileFeatures, screenSettingsSet, startMenuOpened, toggleStartMenu }: Props) {
  // ---------- States ----------
  const [startButtonPic, setStartButtonPic] = useState(startButtonDefaultPic.src);
  const [timeString, setTimeString] = useState('');
  // ---------- Effects ----------
  // Creates an interval that runs every second to update the time
  useEffect(() => {
    updateTime()
    const intervalId = setInterval(() => {
      updateTime()
    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])
  // Updates the start button picture state based on whether the start menu is opened or not
  useEffect(() => {
    if (!startMenuOpened && startButtonPic !== startButtonDefaultPic.src && startButtonPic !== startButtonHoverPic.src) {
      setStartButtonPic(startButtonDefaultPic.src)
    } else if (startMenuOpened && startButtonPic !== startButtonClickPic.src) {
      setStartButtonPic(startButtonClickPic.src)
    }
  }, [startMenuOpened, startButtonPic])
  // ---------- Functions ----------
  // Takes in a string title, and returns a shortened version if longer then 15 characters
  const condensedTitle = (title: string) => {
    if (title.length < 18) {
      return title
    } else {
      return title.slice(0, 15) + '...'
    }
  }
  // When start menu button is clicked, updates button pic and toggles start menu
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!startMenuOpened) {
      setStartButtonPic(startButtonClickPic.src)
    } else {
      setStartButtonPic(startButtonDefaultPic.src)
    }
    toggleStartMenu()
  }
  // Changes start menu button to hovered if not opened
  const handleMouseEnter = () => {
    if (!startMenuOpened) {
      setStartButtonPic(startButtonHoverPic.src);
    }
  }
  // Changes start menu button to default if not opened
  const handleMouseLeave = () => {
    if (!startMenuOpened) {
      setStartButtonPic(startButtonDefaultPic.src);
    }
  }
  // Updates the time string state based on current time
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
  // ---------- Return ----------
  return (
    <nav className={styles.taskBar} aria-label="Task Bar">
      <div className={styles.row} aria-label="Start menu button and active windows container">
        {/* Start Menu Button */}
        {screenSettingsSet && !mobileFeatures ?
          <button className={styles.startButton} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick} aria-label="Start menu button">
            <Image src={startButtonPic} alt="Start menu button image" height={30} width={100} draggable={false} aria-label="Start menu button image" />
          </button> : null
        }
        {/* Active Windows */}
        <div className={styles.activeWindows} aria-label="Active windows container">
          {activeWindows.map((window) =>
            <div className={styles.window} key={window.title} aria-label="Active window container">
              <Image src={window.icon} className={styles.windowIcon} alt={`${window.title} icon`} draggable={false} aria-label="Active window icon" />
              <div className={styles.windowText} aria-label="Active window title">{condensedTitle(window.title)}</div>
            </div>
          )}
        </div>
      </div>
      {/* System Tray */}
      <div className={styles.systemTray} aria-label="System tray">
        <div className={styles.clock} aria-label="Clock">{timeString}</div>
      </div>
    </nav>
  )
}