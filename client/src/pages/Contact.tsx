import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Contact.module.css';

const Contact = () => {
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
        <h1>Nous contacter</h1>
        <p>Pour toute question ou projet, notre équipe est disponible pour vous répondre rapidement.</p>
      </header>

      <div className={styles.contactInfoContainer}>
      <section className={styles.contactInfo}>
        {/* <div className={styles.infoCard}>
          <p>☎️ Joignable par téléphone 7/7J de 9h à 21h</p>
          <p className={styles.fastAnswer}>Réponse rapide !</p>
        </div> */}

        <ul className={styles.generalContact}>
          <li>📞 07.50.47.46.23</li>
          <li>📧 maryam.dri@hotmail.fr</li>
          <li>📍 Villeneuve d’Ascq</li>
          {isSmallScreen && <li>DL Motors</li>}
        </ul>
      </section>

      <section className={styles.contactFormSection}>
        <h2>Formulaire de contact</h2>

        {isEmailSent && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <p>Votre message a été envoyé avec succès !</p>
              <button className={styles.okButton} onClick={handleReload}>OK</button>
            </div>
          </div>
        )}

        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <input
              type="text"
              name="name"
              placeholder="Nom"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Adresse Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Sujet"
            value={formData.subject}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
          />
          <button type="submit" className={styles.submitBtn}>Envoyer</button>
        </form>
      </section>
      </div>
    </div>
  );
};

export default Contact;
