import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>

      <ul>
        <h2>Liens Utiles</h2>
        <li><a href="https://www.linkedin.com/in/maryam-dri/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        <li><a href="https://github.com/maryam-dri" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        <li><a href="mailto:maryam.dri@hotmail.fr">Envoyer un Email</a></li>
      </ul>

      <ul>
        <h2>Pages</h2>
        <li><a href="#home">Accueil</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#projects">Projets</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <ul>
        <h2>Informations</h2>
        <li>📍 Villeneuve d’Ascq</li>
        <li>📞 07.50.47.46.23</li>
        <li>📧 maryam.dri@hotmail.fr</li>
      </ul>
    </div>
    <p>© 2025 Maryam Portfolio</p>

  </footer>
);

export default Footer;
