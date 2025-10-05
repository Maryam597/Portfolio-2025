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
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {/* <header className={styles.contactheader}></header> */}
      <div className={styles['contact-intro']}>
        <h1>Nos projets</h1>
        <p>Découvrez nos projets récents, mettant en avant notre expertise et notre créativité.</p>
      </div>

      <div className={styles.contact}>
        <div className={styles.contact1}>
          <div>
            <p> ☎️ Joignable par téléphone 7/7J de 9h à 21h</p>
          </div>
          <div className={styles.answer}>
            <p> Réponse rapide ! </p>
          </div>
        </div>

        <div className={styles.generalcontact}>
          <div className={styles.contactinfo}>
            <li>📞 07.50.47.46.23</li>
            <li>📧 maryam.dri@hotmail.fr</li>
            <li>Villeneuve d’Ascq</li>

            {isSmallScreen && (
              <div className={styles['responsive-div1']}>
                <p>DL Motors</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.form}>
          <h2>Formulaire de contact</h2>

          {isEmailSent && (
            <div className={styles['modal-overlay']}>
              <div className={styles.modal}>
                <p>Votre message a été envoyé avec succès !</p>
                <button onClick={handleReload} className={styles.ok}>
                  OK
                </button>
              </div>
            </div>
          )}

          <form className={styles.contactform} onSubmit={handleSubmit}>
            <div className={styles.line1}>
              <input
                type='text'
                name='name'
                placeholder='Nom'
                className={styles.form1}
                id='name'
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type='email'
                name='email'
                placeholder='Adresse Email'
                className={styles.form1}
                id='email'
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <input
              type='text'
              name='subject'
              placeholder='Sujet'
              className={styles.line2}
              value={formData.subject}
              onChange={handleChange}
            />

            <textarea
              name='message'
              placeholder='Message'
              className={styles.line3}
              value={formData.message}
              onChange={handleChange}
            />

            <button type='submit' className={styles.formBtn}>
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
