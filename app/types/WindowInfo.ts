import { StaticImageData } from "next/image"
export type WindowState = "open" | "minimized" | "maximized";
export interface WindowInfo {
  icon: StaticImageData;
  title: string;
  state: WindowState;
  zIndex: number;
}