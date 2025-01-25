import { ReactNode, useRef, useState } from "react";
import styles from "./component.module.css";
import Tooltip from "../Tooltip/Tooltip";

interface Props {
  children: ReactNode;
  text: string;
}
export default function TooltipContainer({children, text}:Props) {
  const [styleInfo, setStyleInfo] = useState({});
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const openTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutId = useRef<NodeJS.Timeout | null>(null);

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
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    openTimeoutId.current = setTimeout(() => {
      openTooltip(e);
    }, 1500);
  }
  const handleMouseLeave = () => {
    closeTooltip()
  }
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

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.container}>
      {children}
      {tooltipVisible ? <Tooltip text={text} styleInfo={styleInfo} /> : null}
    </div>
  )
}