import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
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
