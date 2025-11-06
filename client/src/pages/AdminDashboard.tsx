import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("services");
    const [services, setServices] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [serviceData, setServiceData] = useState({
        title: "",
        price: "",
        description: "",
        features: "",
    });

    // Charger tous les services
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
    }, []);

    // Gérer les changements dans le formulaire
    const handleServiceChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setServiceData({ ...serviceData, [e.target.name]: e.target.value });
    };

    // Envoi (ajout ou modification)
    const handleServiceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            ...serviceData,
            features: serviceData.features
                .split(",")
                .map((f) => f.trim())
                .filter((f) => f !== ""),
        };

        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            };

            if (editingId) {
                await axios.put(
                    `http://localhost:8000/services/${editingId}`,
                    payload,
                    { headers }
                );
                alert("✅ Service modifié avec succès !");
            } else {
                await axios.post("http://localhost:8000/services/create", payload, {
                    headers,
                });
                alert("✅ Service ajouté avec succès !");
            }

            setServiceData({ title: "", price: "", description: "", features: "" });
            setEditingId(null);
            fetchServices();
        } catch (error) {
            console.error(error);
            alert("❌ Erreur lors de la sauvegarde du service");
        }
    };

    // Modifier un service existant
    const handleEdit = (service: any) => {
        setEditingId(service.id);
        setServiceData({
            title: service.title,
            price: service.price,
            description: service.description,
            features: service.features.join(", "),
        });
    };

    // Supprimer un service
    const handleDelete = async (id: string) => {
        if (!window.confirm("Supprimer ce service ?")) return;
        try {
            await axios.delete(`http://localhost:8000/services/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            alert("🗑️ Service supprimé !");
            fetchServices();
        } catch (error) {
            console.error(error);
            alert("❌ Erreur lors de la suppression");
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

            <div className={styles.tabContent}>
                {activeTab === "services" && (
                    <>
                        {/* Formulaire d'ajout / édition */}
                        <form className={styles.form} onSubmit={handleServiceSubmit}>
                            <h2>{editingId ? "Modifier le service" : "Ajouter un service"}</h2>
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
                            <button type="submit">
                                {editingId ? "Mettre à jour" : "Enregistrer"}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingId(null);
                                        setServiceData({
                                            title: "",
                                            price: "",
                                            description: "",
                                            features: "",
                                        });
                                    }}
                                >
                                    Annuler
                                </button>
                            )}
                        </form>

                        {/* Liste des services */}
                        <h3>📋 Services existants</h3>
                        <ul className={styles.serviceList}>
                            {services.map((service) => (
                                <li key={service.id} className={styles.serviceItem}>
                                    <div>
                                        <strong>{service.title}</strong> — {service.price} €
                                    </div>
                                    <div className={styles.actions}>
                                        <button onClick={() => handleEdit(service)}>✏️ Modifier</button>
                                        <button onClick={() => handleDelete(service.id)}>🗑️ Supprimer</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {activeTab === "projects" && (
                    <p>Section projets à implémenter plus tard</p>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
