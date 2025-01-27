import Image from "next/image";
import { StaticImageData } from "next/image"

import styles from "./component.module.css";
import TooltipContainer from "../TooltipContainer/TooltipContainer";
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
  const generateText = (text: string, characterIndex: number) => {
    if (characterIndex === -1) {
      return text
    } else {
      return (
        <div className={styles.text}>
          {text.slice(0, characterIndex)}<span className={styles.underline}>{text.slice(characterIndex, characterIndex + 1)}</span>{text.slice(characterIndex + 1)}
        </div>)
    }
  }
  const handleClick = () => {
    openWindow({icon: buttonInfo.image, title: buttonInfo.text, zIndex: 0})
  }
  return (
    <TooltipContainer text={buttonInfo.tooltip}>
      <div onClick={handleClick} className={styles.button}>
        <Image src={buttonInfo.image} className={styles.icon} alt={buttonInfo.text} draggable={false} />
        {generateText(buttonInfo.text, buttonInfo.underlineIndex)}
      </div>
    </TooltipContainer>
  );
}