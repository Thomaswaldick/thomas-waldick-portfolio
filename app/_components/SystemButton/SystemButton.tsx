import Image from "next/image";
import { StaticImageData } from "next/image"
import styles from "./component.module.css";
// ---------- Components ----------
import TooltipContainer from "../TooltipContainer/TooltipContainer";
// ---------- Types ----------
import { WindowInfo } from "@/app/types/WindowInfo";
interface ButtonInfo {
  image: StaticImageData;
  text: string;
  tooltip: string;
  underlineIndex: number;
}
interface Props {
  buttonInfo: ButtonInfo;
  openWindow: (windowInfo: WindowInfo) => void;
}

export default function SystemButton({ buttonInfo, openWindow }:Props) {
  // ---------- Functions ----------
  // Takes in text along with a index number and returns a div with the character at the index underlined
  const generateText = (text: string, characterIndex: number) => {
    if (characterIndex === -1) {
      return text
    } else {
      return (
        <div className={styles.text} aria-label="System button text">
          {text.slice(0, characterIndex)}<span className={styles.underline}>{text.slice(characterIndex, characterIndex + 1)}</span>{text.slice(characterIndex + 1)}
        </div>)
    }
  }
  // Opens a window based on the system button info
  const handleClick = () => {
    openWindow({icon: buttonInfo.image, title: buttonInfo.text, zIndex: 0})
  }
  // ---------- Return ----------
  return (
    <TooltipContainer text={buttonInfo.tooltip}>
      <div onClick={handleClick} className={styles.button} aria-label="System button container">
        <Image src={buttonInfo.image} className={styles.icon} alt={`${buttonInfo.text} icon`} draggable={false} aria-label="System button icon" />
        {generateText(buttonInfo.text, buttonInfo.underlineIndex)}
      </div>
    </TooltipContainer>
  );
}