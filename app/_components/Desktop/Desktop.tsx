import styles from "./component.module.css";
import { useEffect, useMemo, useState } from "react";

import DesktopShortcut from "../DesktopShortcut/DesktopShortcut";

import recyclePic from "@/public/recycle_bin.ico";
import resumePic from "@/public/resume.ico";
import helpAndSupport from "@/public/helpAndSupport.ico";
import linkedIn from "@/public/linkedIn.png";
import github from "@/public/github.png";
import codecademy from "@/public/codecademy.ico";
import { WindowInfo } from "@/app/types/WindowInfo";
interface Props {
  closeStartMenu: () => void;
  isMobile: boolean;
  isSmallScreen: boolean;
  openWindow: (windowInfo: WindowInfo) => void;
  startMenuOpened: boolean;
}
export default function Desktop({ closeStartMenu, isMobile, isSmallScreen, openWindow, startMenuOpened }:Props) {
  const [selectedShortcut, setSelectedShortcut] = useState('')
  const desktopShortcuts = useMemo(() => {
    const shortcuts = [
      { icon: recyclePic, name: 'Recycle Bin', tooltip: 'Contains the files and folders that you have deleted.' },
      { icon: resumePic, name: 'My CV', tooltip: "PDF of Thomas Waldick's CV" },
      { icon: helpAndSupport, name: 'About This Site', tooltip: "Details about this portfolio website." },
      { icon: linkedIn, name: 'LinkedIn', tooltip: "Opens my LinkedIn profile in a new tab." },
      { icon: github, name: 'GitHub', tooltip: "Opens my GitHub profile in a new tab." },
      { icon: codecademy, name: 'Codecademy', tooltip: "Opens my Codecademy profile in a new tab." },
    ]
    if (isSmallScreen || isMobile) {
      return shortcuts.filter((shortcut) => shortcut.name !== "Recycle Bin");
    }
    return shortcuts;
  }, [isMobile, isSmallScreen])

  useEffect(() => {
    const clearShortcut = () => {
      setSelectedShortcut('')
    }
    if (!isSmallScreen && isMobile) {
      openWindow({icon: resumePic, title: "My CV", zIndex: 0})
    }
    window.addEventListener('click', clearShortcut)
    return () => {
      window.removeEventListener('click', clearShortcut)
    }
  }, [isMobile, isSmallScreen])
  useEffect(() => {
    if (startMenuOpened) {
      setSelectedShortcut('')
    }
  }, [startMenuOpened])

  const handleClick = (e: React.MouseEvent<HTMLElement>, iconName: string) => {
    e.stopPropagation();
    setSelectedShortcut(iconName)
    if (startMenuOpened) {
      closeStartMenu()
    }
  }

  return (
    <div className={styles.desktop}>
      {desktopShortcuts.map((desktopShortcut) =>
        <DesktopShortcut key={desktopShortcut.name} shortcut={desktopShortcut}
          isSelected={selectedShortcut === desktopShortcut.name}
          onClick={handleClick} openWindow={openWindow} />
      )}
    </div>
  );
}