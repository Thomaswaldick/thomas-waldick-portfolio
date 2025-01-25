import styles from "./component.module.css";
import Image from "next/image";
import { StaticImageData } from "next/image"
import TooltipContainer from "../TooltipContainer/TooltipContainer";
import { WindowInfo } from "@/app/types/WindowInfo";

interface ItemInfo {
  image: StaticImageData;
  subtext: string;
  tooltip: string;
  text: string;
}

interface Props {
  bold: boolean;
  isFavorite: boolean;
  itemInfo: ItemInfo;
  openWindow: (windowInfo: WindowInfo) => void;
}
export default function StartMenuItem({ bold, isFavorite, itemInfo, openWindow }:Props) {
  const handleClick = () => {
    openWindow({icon: itemInfo.image, title: itemInfo.text, zIndex: 0})
  }
  return (
    <TooltipContainer text={itemInfo.tooltip}>
      {isFavorite ? (
        <div className={styles.item} onClick={handleClick}>
          <Image src={itemInfo.image} className={styles.favoriteIcon} alt={itemInfo.text} draggable={false} />
          <div className={styles.favoriteContainer}>
            <div className={`${styles.text} ${styles.bold}`}>{itemInfo.text}</div>
            <div className={styles.subtext}>{itemInfo.subtext}</div>
          </div>
        </div>) : (<div>
          <div className={styles.item} onClick={handleClick}>
            <Image src={itemInfo.image} className={styles.icon} alt={itemInfo.text} draggable={false} />
            <div className={`${styles.text} ${styles.blue} ${bold ? styles.bold : ''}`}>{itemInfo.text}</div>
          </div>
        </div>)}
    </TooltipContainer>
  )
}