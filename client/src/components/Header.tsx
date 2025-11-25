import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import styles from './Header.module.css';

const Header = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  // Fermer le menu quand on clique sur un lien
  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <header className={styles.header}>
      {/* BOUTON BURGER */}
      <button className={styles.burger} onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* NAVBAR */}
      <nav className={`${styles.nav} ${open ? styles.open : ''}`}>
        {/* CROIX */}
        <button className={styles.close} onClick={() => setOpen(false)}>
          &times;
        </button>

        {/* LIENS */}
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link to="/" onClick={handleLinkClick}>{t("header.home")}</Link>
          </li>
          <li className={styles.li}>
            <Link to="/services" onClick={handleLinkClick}>{t("header.services")}</Link>
          </li>
          <li className={styles.li}>
            <Link to="/projects" onClick={handleLinkClick}>{t("header.projects")}</Link>
          </li>
          <li className={styles.li}>
            <Link to="/contact" onClick={handleLinkClick}>{t("header.contact")}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
