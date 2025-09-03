import styles from "./component.module.css";
// ------------------------------------------------------------
// Types
// ------------------------------------------------------------
interface Props {
  styleInfo: object;
  text: string;
}
export default function Tooltip({styleInfo, text}:Props) {
  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  return (
    <aside className={styles.container} style={styleInfo} aria-label="Tooltip text">{text}</aside>
  )
}