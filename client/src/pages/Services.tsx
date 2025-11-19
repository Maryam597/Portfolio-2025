import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Services.module.css';
import { useTranslation } from "react-i18next";

interface Service {
    id: number;
    titleFr: string;
    titleEn: string;
    price: number;
    descriptionFr: string;
    descriptionEn: string;
    featuresFr: string;  // JSON string from DB
    featuresEn: string;  // JSON string from DB
    createdAt: string;
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
                    const title =
                        i18n.language === "fr"
                            ? service.titleFr || t("services.untitled")
                            : service.titleEn || t("services.untitled");

                    const description =
                        i18n.language === "fr"
                            ? service.descriptionFr || t("services.noDescription")
                            : service.descriptionEn || t("services.noDescription");

                    const features =
                        i18n.language === "fr"
                            ? service.featuresFr
                                ? JSON.parse(service.featuresFr)
                                : []
                            : service.featuresEn
                                ? JSON.parse(service.featuresEn)
                                : [];

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
