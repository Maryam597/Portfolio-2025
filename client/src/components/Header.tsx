import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li className={styles.li}><Link to="/">Accueil</Link></li>
        <li className={styles.li}><Link to="/services">Services</Link></li>
        <li className={styles.li}><Link to="/projects">Projets</Link></li>
        <li className={styles.li}><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;