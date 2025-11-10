import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("services");

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
      console.error("Erreur de chargement :", error);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchProjects();
  }, []);

  const handleServiceChange = (e: any) => {
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
      console.error("Erreur chargement projets :", error);
    }
  };

  const handleProjectChange = (e: any) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
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
      await axios.post("http://localhost:8000/projects", formData, {
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

  const handleDeleteProject = async (id: string) => {
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

  return (
    <div className={styles.dashboard}>
      <h1>Admin Dashboard</h1>

      <div className={styles.tabs}>
        <button
          className={activeTab === "services" ? styles.active : ""}
          onClick={() => setActiveTab("services")}
        >
          Services
        </button>
        <button
          className={activeTab === "projects" ? styles.active : ""}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>
      </div>

      {/* ----------- SERVICES ----------- */}
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
                <button onClick={() => handleDeleteService(s.id)}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------- PROJECTS ----------- */}
      {activeTab === "projects" && (
        <div className={styles.tabContent}>
          <form onSubmit={handleProjectSubmit} className={styles.form}>
            <h2>Ajouter un projet</h2>
            <input
              name="title"
              placeholder="Titre du projet"
              value={projectData.title}
              onChange={handleProjectChange}
              required
            />
            <input
              name="summary"
              placeholder="Résumé court"
              value={projectData.summary}
              onChange={handleProjectChange}
            />
            <textarea
              name="description"
              placeholder="Description complète"
              value={projectData.description}
              onChange={handleProjectChange}
              required
            />
            <input
              name="technologies"
              placeholder="Technologies (séparées par des virgules)"
              value={projectData.technologies}
              onChange={handleProjectChange}
            />
            <input
              name="link_demo"
              placeholder="Lien vers la démo"
              value={projectData.link_demo}
              onChange={handleProjectChange}
            />
            <input
              name="link_github"
              placeholder="Lien GitHub"
              value={projectData.link_github}
              onChange={handleProjectChange}
            />
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Prévisualisation"
                className={styles.previewImg}
              />
            )}
            <button type="submit">🚀 Ajouter</button>
          </form>

          <h3>📁 Projets existants</h3>
          <div className={styles.list}>
            {projects.map((p) => (
              <div key={p.ID} className={styles.card}>
                {p.image && (
                  <img
                    src={`http://localhost:8000${p.image}`}
                    alt={p.title}
                    className={styles.projectImg}
                  />
                )}
                <h4>{p.title}</h4>
                <p>{p.summary}</p>
                <button onClick={() => handleDeleteProject(p.ID)}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;









