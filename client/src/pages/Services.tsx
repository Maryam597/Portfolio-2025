import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Services.module.css';
import { useTranslation } from "react-i18next";

interface Service {
    id: number;
    price: number;
    created_at: string;
    title_fr: string;
    title_en: string;
    description_fr: string;
    description_en: string;
    features_fr: string;
    features_en: string;
}


const Services = () => {
    const { t, i18n } = useTranslation();

    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:8000/services');
                setServices(response.data);
            } catch (err) {
                console.error(err);
                setError(t("services.error"));
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [t]);

    if (loading) return <p>{t("services.loading")}</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles['services-page']}>
            <h1>{t("services.title")}</h1>

            <div className={styles['services-container']}>
                {services.map((service) => {
                    const title = i18n.language === "fr" ? service.title_fr : service.title_en;
                    const description = i18n.language === "fr" ? service.description_fr : service.description_en;

                    const features = i18n.language === "fr"
                        ? service.features_fr ? JSON.parse(service.features_fr) : []
                        : service.features_en ? JSON.parse(service.features_en) : [];


                    return (
                        <div key={service.id} className={styles['service-card']}>
                            <h2>{title}</h2>
                            <p>
                                <strong>{t("services.price")} : </strong> {service.price}€
                            </p>
                            <p>{description}</p>

                            <ul>
                                {features.map((f: string, idx: number) => (
                                    <li key={idx}>{f}</li>
                                ))}
                            </ul>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Services;
