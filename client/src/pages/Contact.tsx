import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <header className='contactheader'></header>

      <div className='contact'>
        <div className='contact1'>
          <div>
            <p> ☎️ Joignable par téléphone 7/7J de 9h à 21h</p>
          </div>
          <div className='answer'>
            <p> Réponse rapide ! </p>
          </div>
        </div>

        <div className='generalcontact'>
          <div className='contactinfo'>
            <li>📞 07.50.47.46.23</li>
            <li>📧 maryam.dri@hotmail.fr</li>
            <li> Villeneuve d’ascq</li>

            {isSmallScreen && (
              <div className='responsive-div1'>
                <p>DL Motors</p>
              </div>
            )}
          </div>


        </div>

        <div className='form'>
          <h2>Formulaire de contact</h2>

          {isEmailSent && (
            <div className="modal-overlay">
              <div className="modal">
                <p>Votre message a été envoyé avec succès!</p>
                <button onClick={handleReload} className='ok'>OK</button>
              </div>
            </div>
          )}

          <form className='contactform' onSubmit={handleSubmit}>
            <div className='line1'>
              <input
                type='text'
                name='name'
                placeholder='Nom'
                className='form1'
                id='name'
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type='email'
                name='email'
                placeholder='Adresse Email'
                className='form1'
                id='email'
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <input
              type='text'
              name='subject'
              placeholder='Sujet'
              className='line2'
              value={formData.subject}
              onChange={handleChange}
            />

            <textarea
              name='message'
              placeholder='Message'
              className='line3'
              value={formData.message}
              onChange={handleChange}
            />

            <button type='submit' className='formBtn'>
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
