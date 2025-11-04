import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { useState } from "react";
import {
  SiReact,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiAngular,
  SiTailwindcss,
  SiSpringboot,
  SiPhp,
  SiNodedotjs,
  SiFigma,
  SiBootstrap,
  SiCanva,
  SiMysql,
  SiPostman,
  SiDocker,
  SiGit,
  SiVuedotjs,
  SiNextdotjs,
  SiTypescript,
  SiExpress,
  SiMongodb,
  SiAdobeillustrator,
  SiSketch
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import React from "react";

const Home = () => {
  const [showFrontendTech, setShowFrontendTech] = useState(false);
  const [frontendClicked, setFrontendClicked] = useState(false);

  const [showBackendTech, setShowBackendTech] = useState(false);
  const [backendClicked, setBackendClicked] = useState(false);

  const [showDesignTech, setShowDesignTech] = useState(false);
  const [designClicked, setDesignClicked] = useState(false);

  const [showToolsTech, setShowToolsTech] = useState(false);
  const [toolsClicked, setToolsClicked] = useState(false);

  const frontendTech = [
    { icon: <SiReact />, name: "React" },
    { icon: <SiHtml5 />, name: "HTML5" },
    { icon: <SiCss3 />, name: "CSS3" },
    { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <SiAngular />, name: "Angular" },
    { icon: <SiVuedotjs />, name: "Vue.js" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiTailwindcss />, name: "Tailwind" },
  ];

  const backendTech = [
    { icon: <SiSpringboot />, name: "Spring Boot" },
    { icon: <SiPhp />, name: "PHP" },
    { icon: <SiNodedotjs />, name: "Node.js" },
    { icon: <DiJava />, name: "Java" },
    { icon: <SiExpress />, name: "Express" },
  ];

  const designTech = [
    { icon: <SiFigma />, name: "Figma" },
    { icon: <SiBootstrap />, name: "Bootstrap" },
    { icon: <SiCanva />, name: "Canva" },
    { icon: <SiAdobeillustrator />, name: "Illustrator" },
    { icon: <SiSketch />, name: "Sketch" },
  ];

  const toolsTech = [
    { icon: <SiMysql />, name: "MySQL" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiPostman />, name: "Postman" },
    { icon: <SiDocker />, name: "Docker" },
    { icon: <SiGit />, name: "Git" },
  ];

  const techColors = [
    "#61DBFB", "#E34F26", "#264DE4", "#F0DB4F",
    "#DD0031", "#41B883", "#3178C6", "#000000", "#38BDF8"
  ];

  return (
    <div className={styles.home}>
      <section className={styles.banner}>
        <div className={styles.presentation}>
          <h1>Développeuse Web Full-Stack</h1>
          <p>
            Je suis développeuse spécialisée en <strong>Front-end</strong> et <strong>Back-end</strong>.
            Je vous accompagne dans la création de sites web et d'applications sur mesure,
            et je donne vie à vos idées.
          </p>
        </div>
      </section>

      <div className={styles.cubeContainer}>
        {/* FRONTEND */}
        <div className={styles.cubeWrapper}>
          <div
            className={`${styles.cube} ${styles.frontend}`}
            onMouseEnter={() => setShowFrontendTech(true)}
            onMouseLeave={() => !frontendClicked && setShowFrontendTech(false)}
            onClick={() => {
              setFrontendClicked(!frontendClicked);
              setShowFrontendTech(true);
            }}
          >
            <div className={styles.cube_side}>FrontEnd</div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
          </div>

          {(showFrontendTech || frontendClicked) && (
            <div className={styles.techBubblesWrapper}>
              {frontendTech.map((tech, index) => (
                <div key={index} className={styles.techBubble} title={tech.name}>
                  {React.cloneElement(tech.icon, { color: techColors[index], size: "2rem" })}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BACKEND */}
        <div className={styles.cubeWrapper}>
          <div
            className={`${styles.cube} ${styles.backend}`}
            onMouseEnter={() => setShowBackendTech(true)}
            onMouseLeave={() => !backendClicked && setShowBackendTech(false)}
            onClick={() => {
              setBackendClicked(!backendClicked);
              setShowBackendTech(true);
            }}
          >
            <div className={styles.cube_side}>Backend</div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
          </div>

          {(showBackendTech || backendClicked) && (
            <div className={styles.techBubblesWrapper}>
              {backendTech.map((tech, index) => (
                <div key={index} className={styles.techBubble} title={tech.name}>
                  {React.cloneElement(tech.icon, { color: techColors[index], size: "2rem" })}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DESIGN */}
        <div className={styles.cubeWrapper}>
          <div
            className={`${styles.cube} ${styles.design}`}
            onMouseEnter={() => setShowDesignTech(true)}
            onMouseLeave={() => !designClicked && setShowDesignTech(false)}
            onClick={() => {
              setDesignClicked(!designClicked);
              setShowDesignTech(true);
            }}
          >
            <div className={styles.cube_side}>Design</div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
          </div>

          {(showDesignTech || designClicked) && (
            <div className={styles.techBubblesWrapper}>
              {designTech.map((tech, index) => (
                <div key={index} className={styles.techBubble} title={tech.name}>
                  {React.cloneElement(tech.icon, { color: techColors[index], size: "2rem" })}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* OUTILS */}
        <div className={styles.cubeWrapper}>
          <div
            className={`${styles.cube} ${styles.tools}`}
            onMouseEnter={() => setShowToolsTech(true)}
            onMouseLeave={() => !toolsClicked && setShowToolsTech(false)}
            onClick={() => {
              setToolsClicked(!toolsClicked);
              setShowToolsTech(true);
            }}
          >
            <div className={styles.cube_side}>Outils</div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
          </div>

          {(showToolsTech || toolsClicked) && (
            <div className={styles.techBubblesWrapper}>
              {toolsTech.map((tech, index) => (
                <div key={index} className={styles.techBubble} title={tech.name}>
                  {React.cloneElement(tech.icon, { color: techColors[index], size: "2rem" })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* <section className={styles.cards}>
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
      </section> */}
    </div>
  );
};

export default Home;
