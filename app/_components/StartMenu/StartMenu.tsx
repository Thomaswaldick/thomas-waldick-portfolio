import styles from "./component.module.css";
import Image from "next/image";
// ---------- Assets ----------
import myProfilePic from "@/public/myProfilePic.png";
import logOffPic from "@/public/logOff.ico";
import powerPic from "@/public/power.ico";
import internetExplorer from "@/public/internetExplorer.ico";
import outlook from "@/public/outlook.ico";
import recentDocuments from "@/public/recentDocuments.ico";
import myDocuments from "@/public/myDocuments.ico";
import myPictures from "@/public/myPictures.ico";
import myMusic from "@/public/myMusic.ico";
import myComputer from "@/public/myComputer.ico";
import controlPanel from "@/public/controlPanel.ico";
import programAccess from "@/public/programAccess.ico";
import printersAndFax from "@/public/printersAndFax.ico";
import helpAndSupport from "@/public/helpAndSupport.ico";
import search from "@/public/search.ico";
import run from "@/public/run.ico";
import resumePic from "@/public/resume.ico";
import linkedIn from "@/public/linkedIn.png";
import github from "@/public/github.png";
import codecademy from "@/public/codecademy.ico";
// ---------- Components ----------
import SystemButton from "../SystemButton/SystemButton";
import StartMenuItem from "../StartMenuItem/StartMenuItem";
// ---------- Types ----------
import { WindowInfo } from "@/app/types/WindowInfo";
interface Props {
  openWindow: (windowInfo: WindowInfo) => void;
  startMenuOpened: boolean;
}

export default function StartMenu({ startMenuOpened, openWindow }: Props) {
  const favoritePrograms = [
    {
      bold: false,
      image: internetExplorer,
      subtext: 'Internet',
      text: 'Internet Explorer',
      tooltip: 'Opens your internet browser.'
    },
    {
      bold: false,
      image: outlook,
      subtext: 'Outlook Express',
      text: 'E-mail',
      tooltip: 'Opens your e-mail program so you can send or read a message.'
    }
  ]
  const recentPrograms = [
    { bold: false, image: codecademy, subtext: '', text: 'Codecademy', tooltip: "Opens my Codecademy profile in a new tab." },
    { bold: false, image: github, subtext: '', text: 'GitHub', tooltip: "Opens my GitHub profile in a new tab." },
    { bold: false, image: linkedIn, text: 'LinkedIn', subtext: '', tooltip: "Opens my LinkedIn profile in a new tab." },
    { bold: false, image: helpAndSupport, subtext: '', text: 'About This Site', tooltip: "Details about this portfolio website." },
    { bold: false, image: resumePic, subtext: '', text: 'My CV', tooltip: "PDF of Thomas Waldick's CV" },
  ]
  const defaultProgramsTop = [
    {
      bold: true,
      image: myDocuments,
      subtext: '',
      text: 'My Documents',
      tooltip: 'Opens the My Documents folder, where you can store letters, reports, notes, and other kinds of documents.'
    },
    {
      bold: true,
      image: recentDocuments,
      subtext: '',
      text: 'My Recent Documents',
      tooltip: 'Opens recently opened documents.'
    },
    {
      bold: true,
      image: myPictures,
      subtext: '',
      text: 'My Pictures',
      tooltip: 'Opens the My Pictures folder, where you can store digital photos, images, and graphic files.'
    },
    {
      bold: true,
      image: myMusic,
      subtext: '',
      text: 'My Music',
      tooltip: 'Opens the My Music folder, where you can store music and other audio files.'
    },
    {
      bold: true,
      image: myComputer,
      subtext: '',
      text: 'My Computer',
      tooltip: 'Gives access to, and information about, the disc drives, cameras, scanners, and other hardware connected to your computer.'
    },
  ]
  const defaultProgramsMiddle = [
    {
      bold: false,
      image: controlPanel,
      subtext: '',
      text: 'Control Panel',
      tooltip: 'Provides options for you to customize the appearance and functionality of your computer, add or remove programs, and set up network connections and user accounts.'
    },
    {
      bold: false,
      image: programAccess,
      subtext: '',
      text: 'Set Program Access and Defaults',
      tooltip: 'Choose default programs for certain activities, such as Web browsing or sending e-mail, and specifies which programs are accessible from the Start menu, desktop, and other location.'
    },
    {
      bold: false,
      image: printersAndFax,
      subtext: '',
      text: 'Printers and Faxes',
      tooltip: 'Shows installed printers and fax printers and helps you add new ones.'
    },
  ]
  const defaultProgramsBottom = [
    {
      bold: false,
      image: helpAndSupport,
      subtext: '',
      text: 'Help and Support',
      tooltip: 'Opens a central location for Help topics, tutorials, troubleshooting, and other support services.'
    },
    {
      bold: false,
      image: search,
      subtext: '',
      text: 'Search',
      tooltip: 'Opens a window where you can pick search options and work with search results.'
    },
    {
      bold: false,
      image: run,
      subtext: '',
      text: 'Run...',
      tooltip: 'Opens a program, folder, document, or Web site.'
    },
  ]
  const systemButtons = [
    {
      image: logOffPic,
      text: 'Log Off',
      tooltip: 'Provides options for closing your programs and logging off, or for leaving your programs running and switching to another user.',
      underlineIndex: 0
    },
    {
      image: powerPic,
      text: 'Turn off Computer',
      tooltip: 'Provides options for turning off or restarting your computer, or for activating Stand By or Hibernate modes.',
      underlineIndex: 1
    }
  ]
  // ---------- Functions ----------
  // Runs when start menu is clicked and stops propagation to prevent it being closed
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  }
  // ---------- Return ----------
  return (
    startMenuOpened ? <section className={styles.startMenu} onClick={handleClick}>
      {/* Profile picture and username row */}
      <header className={styles.avatarRow}>
        <Image src={myProfilePic} className={styles.avatar} alt="Profile Picture" draggable={false} />
        <div className={styles.username}>Thomas Waldick</div>
      </header>
      <div className={styles.container}>
        <div className={styles.orangeDivider}></div>
        <div className={styles.innerContainer}>
          <div className={styles.leftContainer}>
            {/* Favorite Programs */}
            {favoritePrograms.map((program) => <StartMenuItem bold={false} isFavorite={true} itemInfo={program} key={program.text} openWindow={openWindow} />)}
            <div className={styles.dividerContainer}>
              <div className={styles.leftDivider}></div>
            </div>
            {/* Recent Programs */}
            {recentPrograms.map((program) => <StartMenuItem bold={program.bold} isFavorite={false} itemInfo={program} key={program.text} openWindow={openWindow} />)}
          </div>
          <div className={styles.rightContainer}>
            {/* Default Programs Top */}
            {defaultProgramsTop.map((program) => <StartMenuItem bold={program.bold} isFavorite={false} itemInfo={program} key={program.text} openWindow={openWindow} />)}
            <div className={styles.dividerContainer}>
              <div className={styles.rightDivider}></div>
            </div>
            {/* Default Programs Middle */}
            {defaultProgramsMiddle.map((program) => <StartMenuItem bold={program.bold} isFavorite={false} itemInfo={program} key={program.text} openWindow={openWindow} />)}
            <div className={styles.dividerContainer}>
              <div className={styles.rightDivider}></div>
            </div>
            {/* Default Programs Bottom */}
            {defaultProgramsBottom.map((program) => <StartMenuItem bold={program.bold} isFavorite={false} itemInfo={program} key={program.text} openWindow={openWindow} />)}
          </div>
        </div>
        <footer className={styles.systemButtonContainer}>
          {systemButtons.map((button) => <SystemButton buttonInfo={button} key={button.text} openWindow={openWindow} />)}
        </footer>
      </div>
    </section> : null
  );
}