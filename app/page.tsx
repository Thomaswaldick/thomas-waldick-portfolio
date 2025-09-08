"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
// ------------------------------------------------------------
// Assets
// ------------------------------------------------------------
import desktopPic from "@/public/desktop.jpg";
// ------------------------------------------------------------
// Components
// ------------------------------------------------------------
import Taskbar from "@/app/_components/Taskbar/Taskbar";
import Desktop from "./_components/Desktop/Desktop";
import StartMenu from "./_components/StartMenu/StartMenu";
import Window from "./_components/Window/Window";
// ------------------------------------------------------------
// Types
// ------------------------------------------------------------
import { WindowInfo } from "./types/WindowInfo";

export default function Home() {
  const siteLinks = [
    { title: 'LinkedIn', url: 'https://www.linkedin.com/in/thomas-waldick/' },
    { title: 'GitHub', url: 'https://github.com/Thomaswaldick' },
    { title: 'Codecademy', url: 'https://www.codecademy.com/profiles/with_thomas' },
    { title: 'About This Site', url: 'https://github.com/Thomaswaldick/thomas-waldick-portfolio' },
  ]
  // ------------------------------------------------------------
  // States
  // ------------------------------------------------------------
  const [activeWindows, setActiveWindows] = useState<WindowInfo[]>([]);
  const [currentActiveWindow, setCurrentActiveWindow] = useState<WindowInfo | null>(null);
  const [mobileFeatures, setMobileFeatures] = useState(false);
  const [screenSettingsSet, setScreenSettings] = useState(false);
  const [startMenuOpened, setStartMenuOpened] = useState(false);
  // ------------------------------------------------------------
  // Effects
  // ------------------------------------------------------------
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
  // ------------------------------
  // Update index when active windows change
  useEffect(() => {
    updateActiveWindowIndexes()
  }, [activeWindows, currentActiveWindow])
  // ------------------------------
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
  // ------------------------------------------------------------
  // Functions
  // ------------------------------------------------------------
  // Closes start menu by updating state
  const closeStartMenu = () => {
    setStartMenuOpened(false)
  }
  // ------------------------------
  // Closes window passed in by filtering out window based on title
  const closeWindow = (windowInfo: WindowInfo) => {
    const copyOfActiveWindows = [...activeWindows].filter((w) => w.title !== windowInfo.title)
    setActiveWindows(copyOfActiveWindows)
  }
  // ------------------------------
  // Maximizes window by setting state to maximized and zIndex to 1
  const maximizeWindow = (windowInfo: WindowInfo) => {
    windowInfo.state = "maximized"
    const copyOfActiveWindows = [...activeWindows].map((w) => w.title === windowInfo.title ? windowInfo : w) as WindowInfo[]
    setActiveWindows(copyOfActiveWindows)
    if (currentActiveWindow?.title !== windowInfo.title) {
      setCurrentActiveWindow(windowInfo)
    }
  }
  // ------------------------------
  // Minimizes window by setting state to minimized and zIndex to -1
  const minimizeWindow = (windowInfo: WindowInfo) => {
    windowInfo.state = "minimized"
    windowInfo.zIndex = -1
    const copyOfActiveWindows = [...activeWindows].map((w) => w.title === windowInfo.title ? windowInfo : w) as WindowInfo[]
    setActiveWindows(copyOfActiveWindows)
    if (currentActiveWindow?.title === windowInfo.title) {
      setCurrentActiveWindow(null)
    }
  }
  // ------------------------------
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
        const newWindow = { icon: windowInfo.icon, state: "open", title: windowInfo.title, zIndex: activeWindows.length + 1 } as WindowInfo
        setActiveWindows(prevWindows => [...prevWindows, newWindow])
      }
    }
    setCurrentActiveWindow(windowInfo)
  }
  // ------------------------------
  // Toggles the start menu opened state
  const toggleStartMenu = () => {
    setStartMenuOpened(prev => !prev)
  }
  // ------------------------------
  // Unmaximizes window by setting state to open and zIndex to 1
  const unmaximizeWindow = (windowInfo: WindowInfo) => {
    windowInfo.state = "open"
    const copyOfActiveWindows = [...activeWindows].map((w) => w.title === windowInfo.title ? windowInfo : w) as WindowInfo[]
    setActiveWindows(copyOfActiveWindows)
  }
  // ------------------------------
  // Sets the current active window state
  const updateCurrentActiveWindow = (windowInfo: WindowInfo | null) => {
    if (currentActiveWindow && currentActiveWindow.title === windowInfo?.title) {
      return
    }
    if (windowInfo && windowInfo.state === "minimized") {
      windowInfo.state = "open"
    }
    setCurrentActiveWindow(windowInfo)
  }
  // ------------------------------
  // Updates the active window indexes based on the current active window
  const updateActiveWindowIndexes = () => {
    if (activeWindows.length === 0) {
      return
    }
    const newWindows: WindowInfo[] = JSON.parse(JSON.stringify(activeWindows))
    const updatedWindows: WindowInfo[] = []
    let currentZ = activeWindows.length
    let highestZIndexWindow: WindowInfo | null = null

    if (currentActiveWindow) {
      const current = newWindows.find((window) => window.title === currentActiveWindow?.title)
      if (current) {
        current.zIndex = currentZ
        highestZIndexWindow = current
      }
    }
    let searchIndex = currentZ
    while (searchIndex > 0) {
      const old = newWindows.find((window) => window.zIndex === searchIndex && window.title !== currentActiveWindow?.title && !updatedWindows.includes(window))
      if (old) {
        if (!highestZIndexWindow || old.zIndex > highestZIndexWindow.zIndex) {
          highestZIndexWindow = old
        }
        currentZ -= 1
        searchIndex -= 1
        old.zIndex = currentZ
        updatedWindows.push(old)
      } else {
        searchIndex -= 1
      }
    }
    if (highestZIndexWindow && highestZIndexWindow.state !== "minimized" && (highestZIndexWindow.title !== currentActiveWindow?.title || currentActiveWindow === null)) {
      setCurrentActiveWindow(highestZIndexWindow)
    }
    if (JSON.stringify(newWindows) !== JSON.stringify(activeWindows)) {
      setActiveWindows(newWindows)
    }
  }
  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  return (
    <div className={styles.page} style={{
      backgroundImage: `url(${desktopPic.src})`,
    }} aria-label="Screen">
      {activeWindows.map((window) =>
        <Window closeWindow={closeWindow} currentActiveWindow={currentActiveWindow} windowInfo={window} key={window.title} updateCurrentActiveWindow={updateCurrentActiveWindow} maximizeWindow={maximizeWindow} minimizeWindow={minimizeWindow} unmaximizeWindow={unmaximizeWindow} />
      )}
      <Desktop closeStartMenu={closeStartMenu} openWindow={openWindow} mobileFeatures={mobileFeatures} screenSettingsSet={screenSettingsSet} startMenuOpened={startMenuOpened} />
      <StartMenu openWindow={openWindow} startMenuOpened={startMenuOpened} />
      <Taskbar activeWindows={activeWindows} currentActiveWindow={currentActiveWindow} mobileFeatures={mobileFeatures} screenSettingsSet={screenSettingsSet} startMenuOpened={startMenuOpened} toggleStartMenu={toggleStartMenu} updateCurrentActiveWindow={updateCurrentActiveWindow} minimizeWindow={minimizeWindow} />
    </div>
  );
}
