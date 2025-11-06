import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("services");
  const [services, setServices] = useState<any[]>([]);
  const [editingService, setEditingService] = useState<any | null>(null);

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

  // Envoi (ajout)
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
      await axios.post("http://localhost:8000/services/create", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("✅ Service ajouté !");
      setServiceData({ title: "", price: "", description: "", features: "" });
      fetchServices();
    } catch (error) {
      console.error(error);
      alert("❌ Erreur lors de l'ajout du service");
    }
  };

  // Ouvrir la modale d'édition
  const openEditModal = (service: any) => {
    setEditingService(service);
    setServiceData({
      title: service.title,
      price: service.price,
      description: service.description,
      features: Array.isArray(service.features)
        ? service.features.join(", ")
        : service.features || "",
    });
  };

  // Enregistrer les modifications
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingService) return;

    const payload = {
      ...serviceData,
      features: serviceData.features
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f !== ""),
    };

    try {
      await axios.put(
        `http://localhost:8000/services/${editingService.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("✅ Service modifié !");
      setEditingService(null);
      fetchServices();
    } catch (error) {
      console.error(error);
      alert("❌ Erreur lors de la modification");
    }
  };

  // Supprimer
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
            {/* Formulaire d'ajout */}
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

            {/* Liste des services */}
            <h3>📋 Services existants</h3>
            <div className={styles.serviceList}>
              {services.map((service) => (
                <div key={service.id} className={styles.serviceCard}>
                  <div>
                    <h4>{service.title}</h4>
                    <p className={styles.price}>{service.price} €</p>
                    <p className={styles.desc}>{service.description}</p>
                    {Array.isArray(service.features) && (
                      <ul>
                        {service.features.map((f: string, i: number) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className={styles.actions}>
                    <button
                      className={styles.editBtn}
                      onClick={() => openEditModal(service)}
                    >
                      ✏️ Modifier
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(service.id)}
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {activeTab === "projects" && <p>Section projets à venir</p>}
      </div>

      {/* Modale d'édition */}
      {editingService && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditingService(null);
          }}
        >
          <div className={styles.modal}>
            <h3>Modifier le service</h3>
            <form onSubmit={handleUpdate} className={styles.form}>
              <input
                type="text"
                name="title"
                value={serviceData.title}
                onChange={handleServiceChange}
                required
              />
              <input
                type="text"
                name="price"
                value={serviceData.price}
                onChange={handleServiceChange}
                required
              />
              <textarea
                name="description"
                value={serviceData.description}
                onChange={handleServiceChange}
                required
              />
              <input
                type="text"
                name="features"
                value={serviceData.features}
                onChange={handleServiceChange}
              />
              <div className={styles.modalActions}>
                <button type="submit" className={styles.saveBtn}>
                  💾 Enregistrer
                </button>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setEditingService(null)}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
