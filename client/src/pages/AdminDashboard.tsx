// AdminDashboard.tsx
import React, { useState } from "react";
import axios from "axios";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("services");

    // State pour service
    const [serviceData, setServiceData] = useState({
        title: "",
        price: "",
        description: "",
        features: "",
    });

    const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setServiceData({ ...serviceData, [e.target.name]: e.target.value });
    };

    const handleServiceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // transformer features (string) → tableau
            const payload = {
                ...serviceData,
                features: serviceData.features.split(",").map((f) => f.trim()),
            };
            await axios.post("http://localhost:8000/services/create", payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    withCredentials: true, // si ton back utilise les cookies
                });
            alert("✅ Service ajouté avec succès !");
            setServiceData({ title: "", price: "", description: "", features: "" });
        } catch (error) {
            console.error(error);
            alert("❌ Erreur lors de l'ajout du service");
        }
    };

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
                    <form className={styles.form} onSubmit={handleServiceSubmit}>
                        <h2>Ajouter un service</h2>
                        <input
                            type="text"
                            name="title"
                            placeholder="Titre du service"
                            value={serviceData.title}
                            onChange={handleServiceChange}
                            required
                        />
                        <input
                            type="text"
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
                            type="text"
                            name="features"
                            placeholder="Caractéristiques (séparées par des virgules)"
                            value={serviceData.features}
                            onChange={handleServiceChange}
                        />
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
