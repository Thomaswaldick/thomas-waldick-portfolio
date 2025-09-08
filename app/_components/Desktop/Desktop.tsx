import styles from "./component.module.css";
import { useEffect, useMemo, useState } from "react";
// ------------------------------------------------------------
// Assets
// ------------------------------------------------------------
import recyclePic from "@/public/recycle_bin.ico";
import resumePic from "@/public/resume.ico";
import helpAndSupport from "@/public/helpAndSupport.ico";
import linkedIn from "@/public/linkedIn.png";
import github from "@/public/github.png";
import codecademy from "@/public/codecademy.ico";
// ------------------------------------------------------------
// Components
// ------------------------------------------------------------
import DesktopShortcut from "../DesktopShortcut/DesktopShortcut";
// ------------------------------------------------------------
// Types
// ------------------------------------------------------------
import { WindowInfo } from "@/app/types/WindowInfo";
interface Props {
  closeStartMenu: () => void;
  mobileFeatures: boolean;
  openWindow: (windowInfo: WindowInfo) => void;
  screenSettingsSet: boolean;
  startMenuOpened: boolean;
}

export default function Desktop({ closeStartMenu, mobileFeatures, screenSettingsSet, openWindow, startMenuOpened }: Props) {
  // ------------------------------------------------------------
  // States
  // ------------------------------------------------------------
  const [selectedShortcut, setSelectedShortcut] = useState('')
  // ------------------------------------------------------------
  // Memos
  // ------------------------------------------------------------
  const desktopShortcuts = useMemo(() => {
    const shortcuts = [
      { icon: recyclePic, name: 'Recycle Bin', tooltip: 'Contains the files and folders that you have deleted.' },
      { icon: codecademy, name: 'Codecademy', tooltip: "Opens my Codecademy profile in a new tab." },
      { icon: github, name: 'GitHub', tooltip: "Opens my GitHub profile in a new tab." },
      { icon: linkedIn, name: 'LinkedIn', tooltip: "Opens my LinkedIn profile in a new tab." },
      { icon: helpAndSupport, name: 'About This Site', tooltip: "Details about this portfolio website." },
      { icon: resumePic, name: 'My CV', tooltip: "PDF of Thomas Waldick's CV" },
    ]
    if (screenSettingsSet && mobileFeatures) {
      return shortcuts.filter((shortcut) => shortcut.name !== "Recycle Bin");
    }
    return shortcuts;
  }, [mobileFeatures])
  // ------------------------------------------------------------
  // Effects
  // ------------------------------------------------------------
  // Runs on initial load, creating event listener to clear selected shortcut when clicking on desktop
  useEffect(() => {
    const clearShortcut = () => {
      setSelectedShortcut('')
    }
    window.addEventListener('click', clearShortcut)
    return () => {
      window.removeEventListener('click', clearShortcut)
    }
  }, [])
  // ------------------------------
  // When screen settings are set on initial load, open CV if not on mobile
  useEffect(() => {
    if (screenSettingsSet && !mobileFeatures) {
      openWindow({ icon: resumePic, state: "open", title: "My CV", zIndex: 0 })
    }
  }, [mobileFeatures, screenSettingsSet])
  // ------------------------------
  // Whenever start menu is opened, clear out selected shortcut
  useEffect(() => {
    if (startMenuOpened) {
      setSelectedShortcut('')
    }
  }, [startMenuOpened])
  // ------------------------------------------------------------
  // Functions
  // ------------------------------------------------------------
  // When a shortcut is clicked, select shortcut and close start menu if opened
  const handleClick = (e: React.MouseEvent<HTMLElement>, iconName: string) => {
    e.stopPropagation();
    setSelectedShortcut(iconName)
    if (startMenuOpened) {
      closeStartMenu()
    }
  }
  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  return (
    <main className={styles.desktop} aria-label="Desktop">
      {screenSettingsSet && desktopShortcuts.map((desktopShortcut) =>
        <DesktopShortcut key={desktopShortcut.name} shortcut={desktopShortcut}
          isSelected={selectedShortcut === desktopShortcut.name}
          onClick={handleClick} openWindow={openWindow} />
      )}
    </main>
  );
}