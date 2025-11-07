import { FaGithub, FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.css';
import { SiLinkedin, SiMailboxdotorg, SiGithub} from "react-icons/si";



const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>

      <ul>
        <h2>Liens Utiles</h2>
        <li><a href="https://www.linkedin.com/in/maryam-dri/" target="_blank" rel="noopener noreferrer"><FaLinkedin size={20} color="#0A66C2" />LinkedIn </a></li>
        <li><a href="https://github.com/maryam597" target="_blank" rel="noopener noreferrer"><FaGithub size={20} color="#e3e8edff" /> GitHub</a></li>
        <li><a href="mailto:maryam.dri@hotmail.fr"><SiMailboxdotorg size={20} color="#ea5873ff" />Envoyer un Email</a></li>
      </ul>

      <ul>
        <h2>Pages</h2>
        <li><a href="/">Accueil</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/projects">Projets</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>

      <ul>
        <h2>Informations</h2>
        <li>📍 Lille, France</li>
        <li>📞 07.50.47.46.23</li>
        <li>📧 maryam.dri@hotmail.fr</li>
      </ul>
    </div>
    <p>© 2025 Maryam Portfolio</p>

  </footer>
);

export default Footer;
