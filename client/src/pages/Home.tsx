import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import techPic from '../assets/tech.jpg';


const Home = () => {
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
  <div className={`${styles.cube} ${styles.frontend}`}>
    <div className={styles.cube_side}></div>
    <div className={styles.cube_side}></div>
    <div className={styles.cube_side}></div>
    <div className={styles.cube_side}></div>
    <div className={styles.cube_side}></div>
    <div className={styles.cube_side}></div>
  </div>

  <div className={`${styles.cube} ${styles.backend}`}>
    <div className={styles.cube_side}></div>
    <div className={styles.cube_side}></div>
    <div className={styles.cube_side}></div>
    <div className={styles.cube_side}></div>
    <div className={styles.cube_side}></div>
    <div className={styles.cube_side}></div>
  </div>

  <div className={`${styles.cube} ${styles.design}`}>
    <div className={styles.cube_side}></div>
    <div className={styles.cube_side}></div>
    <div className={styles.cube_side}></div>
    <div className={styles.cube_side}></div>
    <div className={styles.cube_side}></div>
    <div className={styles.cube_side}></div>
  </div>

  <div className={`${styles.cube} ${styles.seo}`}>
    <div className={styles.cube_side}></div>
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
