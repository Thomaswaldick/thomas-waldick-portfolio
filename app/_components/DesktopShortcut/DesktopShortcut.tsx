import { useRef } from "react";
import styles from "./component.module.css";
import Image from "next/image";
import TooltipContainer from "../TooltipContainer/TooltipContainer";

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
  return (
    <TooltipContainer text={shortcut.tooltip}>
      <div onClick={handleClick} className={isSelected ? [styles.desktopShortcut, styles.selectedShortcut].join(' ') : styles.desktopShortcut}>
        <Image src={shortcut.icon} alt={shortcut.name} className={styles.desktopIcon} draggable={false} />
        <div className={isSelected ? [styles.desktopText, styles.selectedText].join(' ') : styles.desktopText}>{shortcut.name}</div>
      </div>
    </TooltipContainer>
  );
}