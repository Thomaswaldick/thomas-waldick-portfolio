import styles from "./component.module.css";
import Image from "next/image";
import { StaticImageData } from "next/image"
// ---------- Components ----------
import TooltipContainer from "../TooltipContainer/TooltipContainer";
// ---------- Types ----------
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

export default function StartMenuItem({ bold, isFavorite, itemInfo, openWindow }: Props) {
  // ---------- Functions ----------
  // Opens a window based on the start menu item info
  const handleClick = () => {
    openWindow({ icon: itemInfo.image, title: itemInfo.text, zIndex: 0 })
  }
  // ---------- Return ----------
  return (
    <TooltipContainer text={itemInfo.tooltip}>
      {isFavorite ? (
        // Favorite Start Menu Item
        <div className={styles.item} onClick={handleClick} aria-label="Favorited start menu program">
          <Image src={itemInfo.image} className={styles.favoriteIcon} alt={`${itemInfo.text} program icon`} draggable={false} aria-label="Program icon" />
          <div className={styles.favoriteContainer} aria-label="Text container">
            <div className={`${styles.text} ${styles.bold}`} aria-label={`${itemInfo.text} text`}>{itemInfo.text}</div>
            <div className={styles.subtext} aria-label={`${itemInfo.text} subtext`}>{itemInfo.subtext}</div>
          </div>
        </div>
      ) : (
        // Normal Start Menu Item
        <div className={styles.item} onClick={handleClick} aria-label="Start menu program">
          <Image src={itemInfo.image} className={styles.icon} alt={`${itemInfo.text} program icon`} draggable={false} aria-label="Program icon" />
          <div className={`${styles.text} ${styles.blue} ${bold ? styles.bold : ''}`} aria-label={`${itemInfo.text} text`}>{itemInfo.text}</div>
        </div>
      )}
    </TooltipContainer>
  )
}