import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  SiReact, SiHtml5, SiCss3, SiJavascript, SiAngular, SiTailwindcss,
  SiSpringboot, SiPhp, SiNodedotjs, SiFigma, SiBootstrap, SiCanva,
  SiMysql, SiPostman, SiDocker, SiGit, SiVuedotjs, SiNextdotjs,
  SiTypescript, SiExpress, SiMongodb, SiAdobeillustrator, SiSketch
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import React from "react";

type CubeName = "frontend" | "backend" | "design" | "tools";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [activeCube, setActiveCube] = useState<CubeName | null>(null);
  const [hoverCube, setHoverCube] = useState<CubeName | null>(null);

  const cubeRefs = useRef<Array<HTMLDivElement | null>>([]);

useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (!cubeRefs.current.some(ref => ref?.contains(e.target as Node))) {
      setActiveCube(null);
    }
  };
  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);


  const handleCubeClick = (cube: CubeName) => {
    setActiveCube((prev) => (prev === cube ? null : cube));
  };

  const frontendTech = [
    { icon: <SiReact />, name: t("tech.React"), color: "#61DBFB" },
    { icon: <SiHtml5 />, name: t("tech.HTML5"), color: "#E34F26" },
    { icon: <SiCss3 />, name: t("tech.CSS3"), color: "#264DE4" },
    { icon: <SiJavascript />, name: t("tech.JavaScript"), color: "#F0DB4F" },
    { icon: <SiAngular />, name: t("tech.Angular"), color: "#DD0031" },
    { icon: <SiVuedotjs />, name: t("tech.Vue.js"), color: "#41B883" },
    { icon: <SiTypescript />, name: t("tech.TypeScript"), color: "#3178C6" },
    { icon: <SiNextdotjs />, name: t("tech.Next.js"), color: "#000000" },
    { icon: <SiTailwindcss />, name: t("tech.Tailwind"), color: "#38BDF8" }
  ];

  const backendTech = [
    { icon: <SiSpringboot />, name: t("tech.Spring Boot"), color: "#6DB33F" },
    { icon: <SiPhp />, name: t("tech.PHP"), color: "#777BB4" },
    { icon: <SiNodedotjs />, name: t("tech.Node.js"), color: "#68A063" },
    { icon: <DiJava />, name: t("tech.Java"), color: "#E76F00" },
    { icon: <SiExpress />, name: t("tech.Express"), color: "#828282" }
  ];

  const designTech = [
    { icon: <SiFigma />, name: t("tech.Figma"), color: "#F24E1E" },
    { icon: <SiBootstrap />, name: t("tech.Bootstrap"), color: "#7952B3" },
    { icon: <SiCanva />, name: t("tech.Canva"), color: "#00C4CC" },
    { icon: <SiAdobeillustrator />, name: t("tech.Illustrator"), color: "#FF9A00" },
    { icon: <SiSketch />, name: t("tech.Sketch"), color: "#F7B500" }
  ];

  const toolsTech = [
    { icon: <SiMysql />, name: t("tech.MySQL"), color: "#4479A1" },
    { icon: <SiMongodb />, name: t("tech.MongoDB"), color: "#47A248" },
    { icon: <SiPostman />, name: t("tech.Postman"), color: "#FF6C37" },
    { icon: <SiDocker />, name: t("tech.Docker"), color: "#2496ED" },
    { icon: <SiGit />, name: t("tech.Git"), color: "#F1502F" }
  ];

  const renderTechBubbles = (cube: CubeName, techList: any[]) => {
    const isDesktop = window.innerWidth > 768;
    const show =
      (isDesktop && hoverCube === cube) || (!isDesktop && activeCube === cube);

    if (!show) return null;

    return (
      <div className={isDesktop ? styles.techBubblesTop : styles.techBubblesRight}>
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
          <h1>{t("home.title")}</h1>
          <p dangerouslySetInnerHTML={{ __html: t("home.intro") }} />
        </div>
      </section>

      <div className={styles.cubeContainer}>
        {["frontend", "backend", "design", "tools"].map((cube, index) => {
          const cubeClass = styles[cube as CubeName];
          const cubeTech = {
            frontend: frontendTech,
            backend: backendTech,
            design: designTech,
            tools: toolsTech
          }[cube as CubeName];

          return (
            <div key={cube} className={styles.cubeWrapper}>
              <div
                className={`${styles.cube} ${cubeClass}`}
                onMouseEnter={() => setHoverCube(cube as CubeName)}
                onMouseLeave={() =>
                  setHoverCube((prev) => (prev === cube ? null : prev))
                }
                onClick={() => handleCubeClick(cube as CubeName)}
                ref={(el) => { cubeRefs.current[index] = el; }}
              >
                <div className={styles.cube_side}>{t(`home.cube.${cube}`)}</div>
                <div className={styles.cube_side}></div>
                <div className={styles.cube_side}></div>
                <div className={styles.cube_side}></div>
                <div className={styles.cube_side}></div>
                <div className={styles.cube_side}></div>
              </div>
              {renderTechBubbles(cube as CubeName, cubeTech)}
            </div>
          );
        })}
      </div>

      <section className={styles.cards}>
        {["services", "projects", "contact"].map((card) => (
          <div key={card} className={styles.card}>
            <h3>{t(`home.cards.${card}.title`)}</h3>
            <p>{t(`home.cards.${card}.desc`)}</p>
            <Link to={`/${card}`} className={styles.cardBtn}>
              {t(`home.cards.${card}.cta`)}
            </Link>
          </div>                  
        ))}
      </section>
    </div>
  );
};

export default Home;
