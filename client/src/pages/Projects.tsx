import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import styles from './Project.module.css';
import { useTranslation } from "react-i18next";

interface Project {
    id: number;
    title: string;
    summaryEn: string;
    summaryFr: string;
    descriptionEn: string;
    descriptionFr: string;
    images: string[];          // MUST be an array in DB
    url: string | null;
    github: string | null;
    category: string;
}

const Projects = () => {
    const { t, i18n } = useTranslation();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

useEffect(() => {
    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:8000/projects/all');

            const mapped = response.data.map((proj: any) => ({
                id: proj.id,
                title: proj.title,

                summaryEn: proj.summary_en,
                summaryFr: proj.summary_fr,

                descriptionEn: proj.description_en,
                descriptionFr: proj.description_fr,

                images: proj.image ? [proj.image] : [],

                github: proj.link_github,
                url: proj.link_demo,

                technologies:
                    typeof proj.technologies === "string"
                        ? JSON.parse(proj.technologies)
                        : proj.technologies
            }));


            setProjects(mapped);
        } catch (err) {
            console.error(err);
            setError(t("projects.error"));
        } finally {
            setLoading(false);
        }
    };

    fetchProjects();
}, [t]);



    if (loading) return <p>{t("projects.loading")}</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles.projectsPage}>
            
            <div className={styles.projectsIntro}>
                <h1>{t("projects.title")}</h1>
                <p>{t("projects.subtitle")}</p>
            </div>

            <div className={styles.projectsContainer}>
                {projects.map((proj) => {

                    const summary =
                        i18n.language === "fr" ? proj.summaryFr : proj.summaryEn;

                    const description =
                        i18n.language === "fr" ? proj.descriptionFr : proj.descriptionEn;

                    return (
                        <div key={proj.id} className={styles.projectCard}>

                            {/* IMAGE */}
                            <div className={styles.imageContainer}>
                                {proj.images?.length > 0 && (
                                    <img
                                        src={`http://localhost:8000${proj.images[0]}`}
                                        alt={proj.title}
                                    />
                                )}

                                <div className={styles.overlay}>
                                    <p>{description}</p>
                                </div>
                            </div>

                            {/* CONTENT */}
                            <div className={styles.projectContent}>
                                <h2>{proj.title}</h2>
                                <p className={styles.summary}>{summary}</p>

                                <div className={styles.projectLinks}>
                                    
                                    {/* GITHUB */}
                                    {proj.github && (
                                        <a
                                            href={proj.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={t("projects.github")}
                                        >
                                            <FaGithub />
                                        </a>
                                    )}

                                    {proj.url && (
                                        <a
                                            href={proj.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={t("projects.demo")}
                                        >
                                            <FaExternalLinkAlt />
                                        </a>
                                    )}
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Projects;
