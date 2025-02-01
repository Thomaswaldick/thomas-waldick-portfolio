import { ReactNode, useRef, useState } from "react";
import styles from "./component.module.css";
// ---------- Components ----------
import Tooltip from "../Tooltip/Tooltip";
// ---------- Types ----------
interface Props {
  children: ReactNode;
  text: string;
}

export default function TooltipContainer({children, text}:Props) {
  const openTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutId = useRef<NodeJS.Timeout | null>(null);
  // ---------- States ----------
  const [styleInfo, setStyleInfo] = useState({});
  const [tooltipVisible, setTooltipVisible] = useState(false);
  // ---------- Functions ----------
  // Closes tooltip and clears and current timeouts
  const closeTooltip = () => {
    setTooltipVisible(false)
    setStyleInfo({})
    if (closeTimeoutId.current) {
      clearTimeout(closeTimeoutId.current);
    }
    closeTimeoutId.current = null
    if (openTimeoutId.current) {
      clearTimeout(openTimeoutId.current);
      openTimeoutId.current = null
    }
  }
  // When a mouse enters, start a timeout for 1.5 seconds, then opens tooltip
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    openTimeoutId.current = setTimeout(() => {
      openTooltip(e);
    }, 1500);
  }
  // When a mouse leaves, closes the tooltip
  const handleMouseLeave = () => {
    closeTooltip()
  }
  // Opens the tooltip near the mouse cursor, the creates a timeout to close the tooltip after 5 seconds
  const openTooltip = (e: React.MouseEvent<HTMLElement>) => {
    const currentX = e.pageX;
    const currentY = e.pageY;
    setStyleInfo({
      left: `${currentX+10}px`,
      top: `${currentY-10}px`,
    })
    setTooltipVisible(true)
    closeTimeoutId.current = setTimeout(() => {
      closeTooltip()
    }, 5000);
  }
  // ---------- Return ----------
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.container} aria-label="Tooltip container">
      {children}
      {tooltipVisible ? <Tooltip text={text} styleInfo={styleInfo} /> : null}
    </div>
  )
}