"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
// ---------- Assets ----------
import desktopPic from "@/public/desktop.jpg";
// ---------- Components ----------
import Taskbar from "@/app/_components/Taskbar/Taskbar";
import Desktop from "./_components/Desktop/Desktop";
import StartMenu from "./_components/StartMenu/StartMenu";
import Window from "./_components/Window/Window";
// ---------- Types ----------
import { WindowInfo } from "./types/WindowInfo";

export default function Home() {
  const siteLinks = [
    { title: 'LinkedIn', url: 'https://www.linkedin.com/in/thomas-waldick/' },
    { title: 'GitHub', url: 'https://github.com/Thomaswaldick' },
    { title: 'Codecademy', url: 'https://www.codecademy.com/profiles/with_thomas' },
    { title: 'About This Site', url: 'https://github.com/Thomaswaldick/thomas-waldick-portfolio' },
  ]
  // ---------- States ----------
  const [activeWindows, setActiveWindows] = useState<WindowInfo[]>([]);
  const [mobileFeatures, setMobileFeatures] = useState(false);
  const [screenSettingsSet, setScreenSettings] = useState(false);
  const [startMenuOpened, setStartMenuOpened] = useState(false);
  // ---------- Effects ----------
  // Runs on initial load, sets variable for mobile features if on a mobile device or has small window size
  useEffect(() => {
    let isSmallScreen = false
    let isMobile = false
    if (window.screen.width < 800 || window.screen.height < 600) {
      isSmallScreen = true
    }
    const userAgent = navigator.userAgent;
    if (/Mobi|Android/i.test(userAgent) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 2)) {
      isMobile = true
    } 
    setMobileFeatures(isSmallScreen || isMobile)
    setScreenSettings(true)
  }, [])
  // Starts event listeners to open start menu on keypress and close on mouse click
  useEffect(() => {
    const toggleStartMenuButton = (e: KeyboardEvent) => {
      if (!mobileFeatures && (e.code == "OSLeft" || e.code == "OSRight" || e.code == "MetaLeft")) {
        setStartMenuOpened(prev => !prev)
      }
    }
    window.addEventListener('click', closeStartMenu)
    window.addEventListener('keydown', toggleStartMenuButton)
    return () => {
      window.removeEventListener('click', closeStartMenu)
      window.removeEventListener('keydown', toggleStartMenuButton)
    }
  }, [mobileFeatures])
  // ---------- Functions ----------
  // Closes star menu by updating state
  const closeStartMenu = () => {
    setStartMenuOpened(false)
  }
  // Closes window passed in by filtering out window based on title
  const closeWindow = (windowInfo: WindowInfo) => {
    setActiveWindows(prevWindows => prevWindows.filter((w) => w.title !== windowInfo.title))
  }
  // Opens window by first closing start menu if opened, then opens CV in new tab if on mobile, or opens window if not on mobile
  const openWindow = (windowInfo: WindowInfo) => {
    if (startMenuOpened) {
      setStartMenuOpened(false)
    }
    const siteLink = siteLinks.find((site) => site.title === windowInfo.title)
    if (siteLink) {
      window.open(siteLink.url, "_blank")
    } else if (mobileFeatures && windowInfo.title === "My CV") {
      window.open("/Thomas Waldick CV.pdf", "_blank")
    } else if (!mobileFeatures) {
      const windowAlreadyOpen = activeWindows.find((w) => w.title === windowInfo.title)
      if (!windowAlreadyOpen) {
        setActiveWindows(prevWindows => [{ icon: windowInfo.icon, title: windowInfo.title, zIndex: prevWindows.length + 1 }, ...prevWindows])
      }
    }
  }
  // Toggles the start menu opened state
  const toggleStartMenu = () => {
    setStartMenuOpened(prev => !prev)
  }
  // ---------- Return ----------
  return (
    <div className={styles.page} style={{
      backgroundImage: `url(${desktopPic.src})`,
    }} aria-label="Screen">
      {activeWindows.map((window) =>
        <Window closeWindow={closeWindow} windowInfo={window} key={window.title} />
      )}
      <Desktop closeStartMenu={closeStartMenu} openWindow={openWindow} mobileFeatures={mobileFeatures} screenSettingsSet={screenSettingsSet} startMenuOpened={startMenuOpened} />
      <StartMenu openWindow={openWindow} startMenuOpened={startMenuOpened} />
      <Taskbar activeWindows={activeWindows} mobileFeatures={mobileFeatures} screenSettingsSet={screenSettingsSet} startMenuOpened={startMenuOpened} toggleStartMenu={toggleStartMenu} />
    </div>
  );
}
