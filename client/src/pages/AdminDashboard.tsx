import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AdminDashboard.module.css";

// ---------- COMPOSANT PRINCIPAL ----------
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<"services" | "projects">("services");

  // ---- SERVICES ----
  const [services, setServices] = useState<any[]>([]);
  const [serviceData, setServiceData] = useState({
    title: "",
    price: "",
    description: "",
    features: "",
  });

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:8000/services");
      setServices(res.data);
    } catch (error) {
      console.error("Erreur de chargement des services :", error);
    }
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setServiceData({ ...serviceData, [e.target.name]: e.target.value });
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...serviceData,
      features: serviceData.features
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f !== ""),
    };
    try {
      await axios.post("http://localhost:8000/services/create", payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("✅ Service ajouté !");
      setServiceData({ title: "", price: "", description: "", features: "" });
      fetchServices();
    } catch (error) {
      console.error(error);
      alert("❌ Erreur lors de l'ajout du service");
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!window.confirm("Supprimer ce service ?")) return;
    try {
      await axios.delete(`http://localhost:8000/services/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchServices();
    } catch (error) {
      console.error(error);
    }
  };

  // ---- PROJECTS ----
  const [projects, setProjects] = useState<any[]>([]);
  const [projectData, setProjectData] = useState({
    title: "",
    summary: "",
    description: "",
    technologies: "",
    link_demo: "",
    link_github: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:8000/projects/all");
      setProjects(res.data);
    } catch (error) {
      console.error("Erreur de chargement des projets :", error);
    }
  };

  const handleProjectChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setData: React.Dispatch<React.SetStateAction<any>>
  ) => {
    setData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", projectData.title);
    formData.append("summary", projectData.summary);
    formData.append("description", projectData.description);
    formData.append("technologies", projectData.technologies);
    formData.append("link_demo", projectData.link_demo);
    formData.append("link_github", projectData.link_github);
    formData.append("created_at", new Date().toISOString());
    if (imageFile) formData.append("image", imageFile);

    try {
      await axios.post("http://localhost:8000/projects/create", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Projet ajouté !");
      setProjectData({
        title: "",
        summary: "",
        description: "",
        technologies: "",
        link_demo: "",
        link_github: "",
      });
      setImageFile(null);
      setImagePreview(null);
      fetchProjects();
    } catch (error) {
      console.error(error);
      alert("❌ Erreur lors de l'ajout du projet");
    }
  };

  const handleUpdateProject = async (id: number, data: any, file: File | null) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("summary", data.summary);
    formData.append("description", data.description);
    formData.append("technologies", data.technologies);
    formData.append("link_demo", data.link_demo);
    formData.append("link_github", data.link_github);
    formData.append("created_at", new Date().toISOString());
    if (file) formData.append("image", file);

    try {
      await axios.put(`http://localhost:8000/projects/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Projet mis à jour !");
      fetchProjects();
    } catch (error) {
      console.error(error);
      alert("❌ Erreur lors de la mise à jour du projet");
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!window.confirm("Supprimer ce projet ?")) return;
    try {
      await axios.delete(`http://localhost:8000/projects/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  // ---- ACCORDÉON PROJECTS ----
  const [openProjectId, setOpenProjectId] = useState<number | null>(null);
  const toggleProjectAccordion = (id: number) => {
    setOpenProjectId(openProjectId === id ? null : id);
  };

  useEffect(() => {
    fetchServices();
    fetchProjects();
  }, []);

  // ---------- RENDER ----------
  return (
    <div className={styles.dashboard}>
      <h1>Admin Dashboard</h1>

      <div className={styles.tabs}>
        <button
          className={activeTab === "services" ? styles.active : ""}
          onClick={() => setActiveTab("services")}
          type="button"
        >
          Services
        </button>
        <button
          className={activeTab === "projects" ? styles.active : ""}
          onClick={() => setActiveTab("projects")}
          type="button"
        >
          Projects
        </button>
      </div>

      {/* ---------- SERVICES ---------- */}
      {activeTab === "services" && (
        <div className={styles.tabContent}>
          <form onSubmit={handleServiceSubmit} className={styles.form}>
            <h2>Ajouter un service</h2>
            <input
              name="title"
              placeholder="Titre du service"
              value={serviceData.title}
              onChange={handleServiceChange}
              required
            />
            <input
              name="price"
              placeholder="Prix (€)"
              value={serviceData.price}
              onChange={handleServiceChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={serviceData.description}
              onChange={handleServiceChange}
              required
            />
            <input
              name="features"
              placeholder="Caractéristiques (séparées par des virgules)"
              value={serviceData.features}
              onChange={handleServiceChange}
            />
            <button type="submit">💾 Enregistrer</button>
          </form>

          <h3>📋 Services existants</h3>
          <div className={styles.list}>
            {services.map((s) => (
              <div key={s.id} className={styles.card}>
                <h4>{s.title}</h4>
                <p>{s.description}</p>
                <button type="button" onClick={() => handleDeleteService(s.id)}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------- PROJECTS ---------- */}
      {activeTab === "projects" && (
        <div className={styles.tabContent}>
          <h2>Ajouter un projet</h2>
          <form onSubmit={handleProjectSubmit} className={styles.form}>
            <input
              name="title"
              placeholder="Titre du projet"
              value={projectData.title}
              onChange={(e) => handleProjectChange(e, setProjectData)}
              required
            />
            <input
              name="summary"
              placeholder="Résumé court"
              value={projectData.summary}
              onChange={(e) => handleProjectChange(e, setProjectData)}
            />
            <textarea
              name="description"
              placeholder="Description complète"
              value={projectData.description}
              onChange={(e) => handleProjectChange(e, setProjectData)}
              required
            />
            <input
              name="technologies"
              placeholder="Technologies (séparées par des virgules)"
              value={projectData.technologies}
              onChange={(e) => handleProjectChange(e, setProjectData)}
            />
            <input
              name="link_demo"
              placeholder="Lien vers la démo"
              value={projectData.link_demo}
              onChange={(e) => handleProjectChange(e, setProjectData)}
            />
            <input
              name="link_github"
              placeholder="Lien GitHub"
              value={projectData.link_github}
              onChange={(e) => handleProjectChange(e, setProjectData)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setImageFile, setImagePreview)}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Prévisualisation" className={styles.previewImg} />
            )}
            <button type="submit">🚀 Ajouter</button>
          </form>

          <h3>📁 Projets existants</h3>
          <div className={styles.list}>
            {projects.map((proj) => (
              <ProjectAccordion
                key={proj.ID}
                proj={proj}
                openProjectId={openProjectId}
                toggleProjectAccordion={toggleProjectAccordion}
                handleUpdateProject={handleUpdateProject}
                handleDeleteProject={handleDeleteProject}
                handleProjectChange={handleProjectChange}
                handleFileChange={handleFileChange}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ---------- ACCORDÉON PROJET ----------
interface ProjectAccordionProps {
  proj: any;
  openProjectId: number | null;
  toggleProjectAccordion: (id: number) => void;
  handleUpdateProject: (id: number, data: any, file: File | null) => void;
  handleDeleteProject: (id: number) => void;
  handleProjectChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setData: React.Dispatch<React.SetStateAction<any>>
  ) => void;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => void;
}

const ProjectAccordion: React.FC<ProjectAccordionProps> = ({
  proj,
  openProjectId,
  toggleProjectAccordion,
  handleUpdateProject,
  handleDeleteProject,
  handleProjectChange,
  handleFileChange,
}) => {
  const [editData, setEditData] = useState({ ...proj });
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editPreview, setEditPreview] = useState(
    proj.image ? `http://localhost:8000${proj.image}` : null
  );

  return (
    <div className={styles.card}>
      <div
        className={styles.accordionHeader}
        onClick={(e) => {
          e.preventDefault();
          toggleProjectAccordion(proj.ID);
        }}
        style={{ cursor: "pointer" }}
      >
        <h4>{proj.title}</h4>
        <span>{openProjectId === proj.ID ? "▲" : "▼"}</span>
      </div>

      {openProjectId === proj.ID && (
        <div className={styles.accordionContent}>
          {editPreview && (
            <img src={editPreview} alt={editData.title} className={styles.projectImg} />
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateProject(proj.ID, editData, editFile);
            }}
            className={styles.form}
          >
            <input
              name="title"
              value={editData.title}
              onChange={(e) => handleProjectChange(e, setEditData)}
              required
            />
            <input
              name="summary"
              value={editData.summary}
              onChange={(e) => handleProjectChange(e, setEditData)}
            />
            <textarea
              name="description"
              value={editData.description}
              onChange={(e) => handleProjectChange(e, setEditData)}
              required
            />
            <input
              name="technologies"
              value={editData.technologies}
              onChange={(e) => handleProjectChange(e, setEditData)}
            />
            <input
              name="link_demo"
              value={editData.link_demo}
              onChange={(e) => handleProjectChange(e, setEditData)}
            />
            <input
              name="link_github"
              value={editData.link_github}
              onChange={(e) => handleProjectChange(e, setEditData)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setEditFile, setEditPreview)}
            />
            <button type="submit">💾 Modifier</button>
            <button type="button" onClick={() => handleDeleteProject(proj.ID)}>🗑️ Supprimer</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
