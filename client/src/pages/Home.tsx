import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import techPic from '../assets/tech.jpg';
import { useState } from "react";


const Home = () => {

  const [showFrontendTech, setShowFrontendTech] = useState(false);
  const frontendTech = ["React", "HTML", "CSS / Tailwind", "JavaScript"];
  const techColors = ["#61DBFB", "#E34F26", "#264DE4", "#F0DB4F"]; 
  const techLogos = [
    "/logos/react.png",    
    "/logos/html.png",
    "/logos/css.png",
    "/logos/javascript.png",
  ];

  return (
    <div className={styles.home}>
      <section className={styles.banner}>
        <div className={styles.presentation}>
          <h1>Développeuse Web Full-Stack </h1>
          <p>
            Je suis développeuse spécialisée en <strong>Front-end</strong>{" "}
            et <strong>Back-end</strong>.
            Je vous accompagne dans la création de sites web et d'applications sur mesure,
            Je donne vie à vos idées.
          </p>
        </div>

        {/* <div
    className={styles.bannerImage}
    style={{
      backgroundImage: `url(${techPic})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '50%',
      minHeight: '100vh',
    }}
  ></div> */}



      </section>



      <div className={styles.cubeContainer}>
        <div
          className={`${styles.cube} ${styles.frontend}`}
          onMouseEnter={() => setShowFrontendTech(true)}
          onMouseLeave={() => setShowFrontendTech(false)}
        >
          <div className={styles.cube_side}>FrontEnd</div>
          <div className={styles.cube_side}></div>
          <div className={styles.cube_side}></div>
          <div className={styles.cube_side}></div>
          <div className={styles.cube_side}></div>
          <div className={styles.cube_side}></div>

          {showFrontendTech && (
            <div className={styles.techBubblesWrapper}>
              {frontendTech.map((tech, index) => (
                <div
                  key={index}
                  className={styles.techBubble}
                  // style={{
                  //   top: `${50 + index * 120}px`, // plus d'espacement vertical
                  //   left: index % 2 === 0 ? "-200px" : "250px", // plus éloigné du cube
                  //   backgroundColor: techColors[index % techColors.length], // couleur différente
                  // }}
                >
                  <img src={techLogos[index]} alt={tech} className={styles.techLogo} />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          )}
        </div>




        <div className={`${styles.cube} ${styles.backend}`}>
          <div className={styles.cube_side}>Backend</div>
          <div className={styles.cube_side}></div>
          <div className={styles.cube_side}></div>
          <div className={styles.cube_side}></div>
          <div className={styles.cube_side}></div>
          <div className={styles.cube_side}></div>
        </div>

        <div className={`${styles.cube} ${styles.design}`}>
          <div className={styles.cube_side}>Design</div>
          <div className={styles.cube_side}></div>
          <div className={styles.cube_side}></div>
          <div className={styles.cube_side}></div>
          <div className={styles.cube_side}></div>
          <div className={styles.cube_side}></div>
        </div>

        <div className={`${styles.cube} ${styles.seo}`}>
          <div className={styles.cube_side}>SEO</div>
          <div className={styles.cube_side}></div>
          <div className={styles.cube_side}></div>
          <div className={styles.cube_side}></div>
          <div className={styles.cube_side}></div>
          <div className={styles.cube_side}></div>
        </div>
      </div>






      <section className={styles.stacks}>
        <h2>Mes compétences</h2>
        <div className={styles.stackList}>
          <span>⚛️ React</span>
          <span>🟩 Node.js</span>
          <span>🛢️ MySQL</span>
          <span>🎨 CSS / Tailwind</span>
          <span>🌐 SEO</span>
        </div>
      </section>

      <section className={styles.cards}>
        <div className={styles.card}>
          <h3>💼 Services</h3>
          <p>Découvrez ce que je propose</p>
          <Link to="/services">Voir plus</Link>
        </div>
        <div className={styles.card}>
          <h3>📂 Projets</h3>
          <p>Un aperçu de mes réalisations</p>
          <Link to="/projects">Voir plus</Link>
        </div>
        <div className={styles.card}>
          <h3>📩 Contact</h3>
          <p>Discutons de votre projet</p>
          <Link to="/contact">Me contacter</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
