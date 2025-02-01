import { useRef } from "react";
import styles from "./component.module.css";
import Image from "next/image";
// ---------- Components ----------
import TooltipContainer from "../TooltipContainer/TooltipContainer";
// ---------- Types ----------
import { Shortcut } from "@/app/types/Shortcut";
import { WindowInfo } from "@/app/types/WindowInfo";
interface Props {
  isSelected: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>, iconName: string) => void;
  openWindow: (window: WindowInfo) => void;
  shortcut: Shortcut;
}

export default function DesktopShortcut({ isSelected, onClick, openWindow, shortcut }: Props) {
  const doubleClickTimeout = useRef<NodeJS.Timeout | null>(null)
  // ---------- Functions ----------
  // When a shortcut is clicked, run onClick prop function and start to listen for double click to open window
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    onClick(e, shortcut.name)
    if (!doubleClickTimeout.current) {
      doubleClickTimeout.current = setTimeout(() => {
        doubleClickTimeout.current = null
      }, 500)
    } else {
      openWindow({icon: shortcut.icon, title: shortcut.name, zIndex: 0})
    }
  }
  // ---------- Return ----------
  return (
    <TooltipContainer text={shortcut.tooltip}>
      <div onClick={handleClick} className={isSelected ? [styles.desktopShortcut, styles.selectedShortcut].join(' ') : styles.desktopShortcut} aria-label={`${shortcut.name} desktop shortcut`}>
        <Image src={shortcut.icon} alt={`${shortcut.name} shortcut icon`} className={styles.desktopIcon} draggable={false} />
        <div className={isSelected ? [styles.desktopText, styles.selectedText].join(' ') : styles.desktopText} aria-label={`${shortcut.name} shortcut text`}>{shortcut.name}</div>
      </div>
    </TooltipContainer>
  );
}