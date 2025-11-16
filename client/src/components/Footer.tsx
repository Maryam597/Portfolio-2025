import { FaGithub, FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.css';
import { SiMailboxdotorg } from "react-icons/si";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>

        <ul>
          <h2>{t("footer.usefulLinks.title")}</h2>
          <li>
            <a
              href="https://www.linkedin.com/in/maryam-dri/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={20} color="#0A66C2" />
              {t("footer.usefulLinks.linkedin")}
            </a>
          </li>

          <li>
            <a
              href="https://github.com/maryam597"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={20} color="#e3e8edff" />
              {t("footer.usefulLinks.github")}
            </a>
          </li>

          <li>
            <a href="mailto:maryam.dri@hotmail.fr">
              <SiMailboxdotorg size={20} color="#ea5873ff" />
              {t("footer.usefulLinks.email")}
            </a>
          </li>
        </ul>

        <ul>
          <h2>{t("footer.pages.title")}</h2>
          <li><a href="/">{t("footer.pages.home")}</a></li>
          <li><a href="/services">{t("footer.pages.services")}</a></li>
          <li><a href="/projects">{t("footer.pages.projects")}</a></li>
          <li><a href="/contact">{t("footer.pages.contact")}</a></li>
        </ul>

        <ul>
          <h2>{t("footer.informations.title")}</h2>
          <li>📍 {t("footer.informations.location")}</li>
          <li>📞 {t("footer.informations.phone")}</li>
          <li>📧 {t("footer.informations.email")}</li>
        </ul>
      </div>

      <p>© 2025 Maryam Portfolio</p>
    </footer>
  );
};

export default Footer;
