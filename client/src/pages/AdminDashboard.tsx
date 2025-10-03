// AdminDashboard.tsx
import React, { useState } from "react";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("services");

  return (
    <div className={styles.dashboard}>
      <h1>Admin Dashboard</h1>

      {/* Onglets */}
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

      {/* Contenu selon l'onglet */}
      <div className={styles.tabContent}>
        {activeTab === "services" && (
          <form className={styles.form}>
            <h2>Ajouter un service</h2>
            <input type="text" placeholder="Titre du service" />
            <textarea placeholder="Description du service" />
            <button type="submit">Enregistrer</button>
          </form>
        )}

        {activeTab === "projects" && (
          <form className={styles.form}>
            <h2>Ajouter un projet</h2>
            <input type="text" placeholder="Titre du projet" />
            <textarea placeholder="Résumé" />
            <textarea placeholder="Description complète" />
            <input type="text" placeholder="Lien GitHub" />
            <input type="text" placeholder="Lien Démo" />
            <input type="text" placeholder="Technologies (séparées par des ,)" />
            <button type="submit">Enregistrer</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
