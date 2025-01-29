import styles from "./component.module.css";
// ---------- Types ----------
interface Props {
  styleInfo: object;
  text: string;
}
export default function Tooltip({styleInfo, text}:Props) {
  // ---------- Return ----------
  return (
    <div className={styles.container} style={styleInfo}>{text}</div>
  )
}