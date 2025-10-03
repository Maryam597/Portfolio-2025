import { useState, useEffect } from 'react';
import axios from 'axios';
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
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:8000/projects/all');
                const data: Project[] = response.data.map((proj: any) => ({
                    ...proj,
                    technologies: typeof proj.technologies === 'string'
                        ? proj.technologies.split(',').map((t: string) => t.trim())
                        : proj.technologies,
                }));
                setProjects(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Erreur lors de la récupération des projets.');
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) return <p>Chargement des projets...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles['projects-page']}>
            <div className={styles['projects-intro']}>
                <h1>Nos projets</h1>
                <p>Découvrez nos projets récents, mettant en avant notre expertise et notre créativité.</p>
            </div>
            <div className={styles['projects-container']}>
                {projects.map((proj) => (
                    <div key={proj.ID} className={styles['project-card']}>
                        <h2>{proj.title}</h2>
                        <p><strong>Résumé :</strong> {proj.summary}</p>
                        <p><strong>Description :</strong> {proj.description}</p>
                        {proj.image && <img src={proj.image} alt={proj.title} />}
                        {proj.link_demo && (
                            <p>
                                <strong>Démo :</strong>{' '}
                                <a href={proj.link_demo} target="_blank" rel="noopener noreferrer">
                                    {proj.link_demo}
                                </a>
                            </p>
                        )}
                        {proj.link_github && (
                            <p>
                                <strong>GitHub :</strong>{' '}
                                <a href={proj.link_github} target="_blank" rel="noopener noreferrer">
                                    {proj.link_github}
                                </a>
                            </p>
                        )}
                        <ul>
                            {proj.technologies.map((tech, idx) => (
                                <li key={idx}>{tech}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
