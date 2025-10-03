import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      {/* Bandeau présentation */}
      <section className={styles.banner}>
        <div className={styles.presentation}>
          <h1>Bienvenue sur mon portfolio 🚀</h1>
          <p>
            Je suis développeuse junior spécialisée en <strong>React</strong>,{" "}
            <strong>Node.js</strong> et <strong>MySQL</strong>. 
            Passionnée par la tech et la création de projets modernes, 
            j’aide à transformer vos idées en solutions concrètes. 
          </p>
        </div>

        {/* Déco à droite */}
        <div className={styles.decoration}>
          {/* Tu peux mettre une image, une illustration, ou un composant animé */}
          <img src="/images/deco.png" alt="Décoration" />
        </div>
      </section>

      {/* Stacks */}
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

      {/* Cards vers les autres pages */}
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
