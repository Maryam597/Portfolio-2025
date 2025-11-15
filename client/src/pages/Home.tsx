import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
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
  const { t, i18n } = useTranslation();
  const [activeCube, setActiveCube] = useState<CubeName | null>(null);
  const [hoverCube, setHoverCube] = useState<CubeName | null>(null);

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
          <h1>{t("home.title")}</h1>

{/* <p dangerouslySetInnerHTML={{ __html: t("home.intro") }} />  */}

<p>
  <Trans
    i18nKey="home.intro"
    components={[
      <strong />,  // <0> = <strong>
      <strong />   // <1> = <strong>
    ]}
  />
</p>



        </div>
      </section>

      <div className={styles.cubeContainer}>
        <div className={styles.cubeWrapper}>
          <div
            className={`${styles.cube} ${styles.frontend}`}
            onMouseEnter={() => setHoverCube("frontend")}
            onMouseLeave={() =>
              setHoverCube((prev) => (prev === "frontend" ? null : prev))
            }
            onClick={() => handleCubeClick("frontend")}
          >
            <div className={styles.cube_side}>{t("home.cube.frontend")}</div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
            <div className={styles.cube_side}></div>
          </div>
          {renderTechBubbles("frontend", frontendTech)}
        </div>

        <div className={styles.cubeWrapper}>
          <div
            className={`${styles.cube} ${styles.backend}`}
            onMouseEnter={() => setHoverCube("backend")}
            onMouseLeave={() =>
              setHoverCube((prev) => (prev === "backend" ? null : prev))
            }
            onClick={() => handleCubeClick("backend")}
          >
            <div className={styles.cube_side}>{t("home.cube.backend")}</div>
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
            <div className={styles.cube_side}>{t("home.cube.design")}</div>
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
            <div className={styles.cube_side}>{t("home.cube.tools")}</div>
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
          <h3>{t("home.cards.services.title")}</h3>
          <p>{t("home.cards.services.desc")}</p>
          <Link to="/services" className={styles.cardBtn}>
            {t("home.cards.services.cta")}
          </Link>
        </div>

        <div className={styles.card}>
          <h3>{t("home.cards.projects.title")}</h3>
          <p>{t("home.cards.projects.desc")}</p>
          <Link to="/projects" className={styles.cardBtn}>
            {t("home.cards.projects.cta")}
          </Link>
        </div>

        <div className={styles.card}>
          <h3>{t("home.cards.contact.title")}</h3>
          <p>{t("home.cards.contact.desc")}</p>
          <Link to="/contact" className={styles.cardBtn}>
            {t("home.cards.contact.cta")}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
