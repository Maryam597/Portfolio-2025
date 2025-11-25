import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.css";

const Header = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>

      <button 
        className={styles.burger} 
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

<nav className={`${styles.nav} ${open ? styles.open : ""}`}>
  <button className={styles.close} onClick={() => setOpen(false)}>
    &times;
  </button>
  <ul className={styles.ul}>
    <li className={styles.li}><Link to="/">{t("header.home")}</Link></li>
    <li className={styles.li}><Link to="/services">{t("header.services")}</Link></li>
    <li className={styles.li}><Link to="/projects">{t("header.projects")}</Link></li>
    <li className={styles.li}><Link to="/contact">{t("header.contact")}</Link></li>
  </ul>
</nav>

    </header>
  );
};

export default Header;
