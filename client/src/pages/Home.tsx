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
  SiSketch,
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import React from "react";

type CubeName = "frontend" | "backend" | "design" | "tools";

const Home: React.FC = () => {
  const [activeCube, setActiveCube] = useState<CubeName | null>(null);
  const [hoverCube, setHoverCube] = useState<CubeName | null>(null);

  const handleCubeClick = (cube: CubeName) => {
    setActiveCube((prev) => (prev === cube ? null : cube));
  };

  const frontendTech = [
    { icon: <SiReact />, name: "React", color: "#61DBFB" },
    { icon: <SiHtml5 />, name: "HTML5", color: "#E34F26" },
    { icon: <SiCss3 />, name: "CSS3", color: "#264DE4" },
    { icon: <SiJavascript />, name: "JavaScript", color: "#F0DB4F" },
    { icon: <SiAngular />, name: "Angular", color: "#DD0031" },
    { icon: <SiVuedotjs />, name: "Vue.js", color: "#41B883" },
    { icon: <SiTypescript />, name: "TypeScript", color: "#3178C6" },
    { icon: <SiNextdotjs />, name: "Next.js", color: "#000000" },
    { icon: <SiTailwindcss />, name: "Tailwind", color: "#38BDF8" },
  ];

  const backendTech = [
    { icon: <SiSpringboot />, name: "Spring Boot", color: "#6DB33F" },
    { icon: <SiPhp />, name: "PHP", color: "#777BB4" },
    { icon: <SiNodedotjs />, name: "Node.js", color: "#68A063" },
    { icon: <DiJava />, name: "Java", color: "#E76F00" },
    { icon: <SiExpress />, name: "Express", color: "#828282" },
  ];

  const designTech = [
    { icon: <SiFigma />, name: "Figma", color: "#F24E1E" },
    { icon: <SiBootstrap />, name: "Bootstrap", color: "#7952B3" },
    { icon: <SiCanva />, name: "Canva", color: "#00C4CC" },
    { icon: <SiAdobeillustrator />, name: "Illustrator", color: "#FF9A00" },
    { icon: <SiSketch />, name: "Sketch", color: "#F7B500" },
  ];

  const toolsTech = [
    { icon: <SiMysql />, name: "MySQL", color: "#4479A1" },
    { icon: <SiMongodb />, name: "MongoDB", color: "#47A248" },
    { icon: <SiPostman />, name: "Postman", color: "#FF6C37" },
    { icon: <SiDocker />, name: "Docker", color: "#2496ED" },
    { icon: <SiGit />, name: "Git", color: "#F1502F" },
  ];

  const renderTechBubbles = (cube: CubeName, techList: any[]) => {
    const wrapperClass =
      activeCube === cube
        ? styles.techBubblesBottom
        : hoverCube === cube && !activeCube
          ? styles.techBubblesTop
          : "";

    if (!wrapperClass) return null;

    return (
      <div className={wrapperClass}>
        {techList.map((tech, index) => (
          <div key={index} className={styles.techBubble} title={tech.name}>
            {React.cloneElement(tech.icon, { color: tech.color, size: "2rem" })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.home}>
      <section className={styles.banner}>
        <div className={styles.presentation}>
          <h1>Développeuse Web Full-Stack</h1>
          <p>
            Je suis développeuse spécialisée en <strong>Front-end</strong> et{" "}
            <strong>Back-end</strong>. Je vous accompagne dans la création de
            sites web et d'applications sur mesure, et je donne vie à vos idées.
          </p>
        </div>
      </section>

      <div className={styles.cubeContainer}>
        {/* FRONTEND */}
        <div className={styles.cubeWrapper}>
          <div
            className={`${styles.cube} ${styles.frontend}`}
            onMouseEnter={() => setHoverCube("frontend")}
            onMouseLeave={() =>
              setHoverCube((prev) => (prev === "frontend" ? null : prev))
            }
            onClick={() => handleCubeClick("frontend")}
          >
            <div className={styles.cube_side}>FrontEnd</div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
          </div>
          {renderTechBubbles("frontend", frontendTech)}
        </div>

        {/* BACKEND */}
        <div className={styles.cubeWrapper}>
          <div
            className={`${styles.cube} ${styles.backend}`}
            onMouseEnter={() => setHoverCube("backend")}
            onMouseLeave={() =>
              setHoverCube((prev) => (prev === "backend" ? null : prev))
            }
            onClick={() => handleCubeClick("backend")}
          >
            <div className={styles.cube_side}>Backend</div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
          </div>
          {renderTechBubbles("backend", backendTech)}
        </div>

        {/* DESIGN */}
        <div className={styles.cubeWrapper}>
          <div
            className={`${styles.cube} ${styles.design}`}
            onMouseEnter={() => setHoverCube("design")}
            onMouseLeave={() =>
              setHoverCube((prev) => (prev === "design" ? null : prev))
            }
            onClick={() => handleCubeClick("design")}
          >
            <div className={styles.cube_side}>Design</div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
          </div>
          {renderTechBubbles("design", designTech)}
        </div>

        {/* OUTILS */}
        <div className={styles.cubeWrapper}>
          <div
            className={`${styles.cube} ${styles.tools}`}
            onMouseEnter={() => setHoverCube("tools")}
            onMouseLeave={() =>
              setHoverCube((prev) => (prev === "tools" ? null : prev))
            }
            onClick={() => handleCubeClick("tools")}
          >
            <div className={styles.cube_side}>Outils</div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
          </div>
          {renderTechBubbles("tools", toolsTech)}
        </div>
      </div>

      <section className={styles.cards}>
        <div className={styles.card}>
          <h3>💼 Services</h3>
          <p>Découvrez ce que je propose</p>
          <Link to="/services" className={styles.cardBtn}>
            Voir plus
          </Link>
        </div>

        <div className={styles.card}>
          <h3>📂 Projets</h3>
          <p>Un aperçu de mes réalisations</p>
          <Link to="/projects" className={styles.cardBtn}>
            Voir plus
          </Link>
        </div>

        <div className={styles.card}>
          <h3>📩 Contact</h3>
          <p>Discutons de votre projet</p>
          <Link to="/contact" className={styles.cardBtn}>
            Me contacter
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
