import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import styles from './Project.module.css';

interface Project {
  ID: number;
  title: string;
  summary: string;
  description: string;
  image: string;
  technologies: string[];
  link_demo: string;
  link_github: string;
  created_at: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8000/projects/all');
        const data: Project[] = response.data.map((proj: any) => ({
          ...proj,
          technologies:
            typeof proj.technologies === 'string'
              ? proj.technologies.split(',').map((t: string) => t.trim())
              : proj.technologies,
        }));
        setProjects(data);
      } catch (err) {
        setError('Erreur lors de la récupération des projets.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Chargement des projets...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.projectsPage}>
      <div className={styles.projectsIntro}>
        <h1>Mes projets</h1>
        <p>Découvrez quelques réalisations web modernes et soignées.</p>
      </div>

      <div className={styles.projectsContainer}>
        {projects.map((proj) => (
          <div key={proj.ID} className={styles.projectCard}>
            <div className={styles.imageContainer}>
              <img src={proj.image} alt={proj.title} />
              <div className={styles.overlay}>
                <p>{proj.description}</p>
              </div>
            </div>

            <div className={styles.projectContent}>
              <h2>{proj.title}</h2>
              <div className={styles.projectLinks}>
                {proj.link_github && (
                  <a
                    href={proj.link_github}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Voir sur GitHub"
                  >
                    <FaGithub />
                  </a>
                )}
                {proj.link_demo && (
                  <a
                    href={proj.link_demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Voir la démo"
                  >
                    <FaExternalLinkAlt />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
