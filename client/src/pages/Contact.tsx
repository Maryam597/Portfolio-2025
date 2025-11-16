import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Contact.module.css';
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/email/send-email', formData);
      setIsEmailSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleReload = () => window.location.reload();

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.contactPage}>
      <header className={styles.contactHeader}>
        <h1>{t("contact.title")}</h1>
        <p>{t("contact.subtitle")}</p>
      </header>

      <div className={styles.contactInfoContainer}>
        <section className={styles.contactInfo}>
          <ul className={styles.generalContact}>
            <li>📞 {t("contact.phone")}</li>
            <li>📧 {t("contact.email")}</li>
            <li>📍 {t("contact.location")}</li>
            {isSmallScreen && <li>{t("contact.company")}</li>}
          </ul>
        </section>

        <section className={styles.contactFormSection}>
          <h2>{t("contact.form.title")}</h2>

          {isEmailSent && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <p>{t("contact.form.success")}</p>
                <button className={styles.okButton} onClick={handleReload}>
                  OK
                </button>
              </div>
            </div>
          )}

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <input
                type="text"
                name="name"
                placeholder={t("contact.form.name")}
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder={t("contact.form.email")}
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder={t("contact.form.subject")}
              value={formData.subject}
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder={t("contact.form.message")}
              value={formData.message}
              onChange={handleChange}
            />

            <button type="submit" className={styles.submitBtn}>
              {t("contact.form.send")}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
