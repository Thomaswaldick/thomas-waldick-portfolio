import styles from "./component.module.css";

interface Props {
  styleInfo: object;
  text: string;
}
export default function Tooltip({styleInfo, text}:Props) {
  return (
    <div className={styles.container} style={styleInfo}>{text}</div>
  )
}