"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

import Taskbar from "@/app/_components/Taskbar/Taskbar";
import Desktop from "./_components/Desktop/Desktop";
import StartMenu from "./_components/StartMenu/StartMenu";
import Window from "./_components/Window/Window";

import { WindowInfo } from "./types/WindowInfo";

import desktopPic from "@/public/desktop.jpg";

export default function Home() {
  const siteLinks = [
    { title: 'LinkedIn', url: 'https://www.linkedin.com/in/thomas-waldick/' },
    { title: 'GitHub', url: 'https://github.com/Thomaswaldick' },
    { title: 'Codecademy', url: 'https://www.codecademy.com/profiles/with_thomas' },
    { title: 'About This Site', url: 'https://github.com/Thomaswaldick/thomas-waldick-portfolio' },
  ]
  const [activeWindows, setActiveWindows] = useState<WindowInfo[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [startMenuOpened, setStartMenuOpened] = useState(false);

  useEffect(() => {
    if (window.screen.width < 800 || window.screen.height < 600) {
      setIsSmallScreen(true)
    }
    const userAgent = navigator.userAgent;
    if (/Mobi|Android/i.test(userAgent)) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [])
  useEffect(() => {
    const toggleStartMenuButton = (e: KeyboardEvent) => {
      if (!isSmallScreen && (e.code == "OSLeft" || e.code == "OSRight" || e.code == "MetaLeft")) {
        setStartMenuOpened(prev => !prev)
      }
    }
    window.addEventListener('click', closeStartMenu)
    window.addEventListener('keydown', toggleStartMenuButton)
    return () => {
      window.removeEventListener('click', closeStartMenu)
      window.removeEventListener('keydown', toggleStartMenuButton)
    }
  }, [isSmallScreen])

  const closeStartMenu = () => {
    setStartMenuOpened(false)
  }
  const closeWindow = (windowInfo: WindowInfo) => {
    setActiveWindows(prevWindows => prevWindows.filter((w) => w.title !== windowInfo.title))
  }
  const openWindow = (windowInfo: WindowInfo) => {
    if (startMenuOpened) {
      setStartMenuOpened(false)
    }
    const siteLink = siteLinks.find((site) => site.title === windowInfo.title)
    if (siteLink) {
      window.open(siteLink.url, "_blank")
    } else if ((isSmallScreen || isMobile) && windowInfo.title === "My CV") {
      window.open("/Thomas Waldick CV.pdf", "_blank")
    } else if (!isSmallScreen) {
      const windowAlreadyOpen = activeWindows.find((w) => w.title === windowInfo.title)
      if (!windowAlreadyOpen) {
        setActiveWindows(prevWindows => [{ icon: windowInfo.icon, title: windowInfo.title, zIndex: prevWindows.length + 1 }, ...prevWindows])
      }
    }
  }
  const toggleStartMenu = () => {
    setStartMenuOpened(prev => !prev)
  }

  return (
    <div className={styles.page} style={{
      backgroundImage: `url(${desktopPic.src})`,
    }}>
      {activeWindows.map((window) =>
        <Window closeWindow={closeWindow} windowInfo={window} key={window.title} />
      )}
      <Desktop closeStartMenu={closeStartMenu} isSmallScreen={isSmallScreen} openWindow={openWindow} startMenuOpened={startMenuOpened} />
      <StartMenu openWindow={openWindow} startMenuOpened={startMenuOpened} />
      <Taskbar activeWindows={activeWindows} isSmallScreen={isSmallScreen} startMenuOpened={startMenuOpened} toggleStartMenu={toggleStartMenu} />
    </div>
  );
}
