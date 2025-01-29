import Image from "next/image";
import styles from "./component.module.css";
// ---------- Assets ----------
import warningSymbol from "@/public/warning.png";
// ---------- Types ----------
import { WindowInfo } from "@/app/types/WindowInfo";
interface Props {
  isDragging: boolean;
  windowInfo: WindowInfo;
}

export default function WindowContent({ isDragging, windowInfo }: Props) {
  // ---------- Functions ----------
  // Displays content based on whether it's CV or not
  const getContent = () => {
    if (windowInfo.title === 'My CV') {
      return (<iframe src="/Thomas Waldick CV.pdf" className={styles.cv} style={isDragging ? { pointerEvents: 'none' } : {}}></iframe>)
    } else {
      return (
        <div className={styles.defaultContainer}>
          <Image src={warningSymbol} className={styles.warning} alt="Warning Symbol" draggable={false} />
          <div className={styles.textContainer}>
            <div>{windowInfo.title} is under development and currently unavailable.</div>
            <div>Please check back at a later time for updates!</div>
          </div>
        </div>)
    }
  }
  // ---------- Return ----------
  return (
    <div className={styles.container}>{getContent()}</div>
  )
}