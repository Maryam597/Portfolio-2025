import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Services.module.css';

interface Service {
    ID: number;
    title: string;
    price: number;
    description: string;
    features: string[];
    created_at: string;
}

const Services = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:8000/services');
                // Convert features JSON string to array
                const data: Service[] = response.data.map((service: Service) => ({
                    ...service,
                    features: typeof service.features === 'string' ? JSON.parse(service.features) : service.features,
                }));
                setServices(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Erreur lors de la récupération des services.');
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) return <p>Chargement des services...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles['services-page']}>
            <h1>Nos Services</h1>
            <div className={styles['services-container']}>
                {services.map((service) => (
                    <div key={service.ID} className={styles['service-card']}>
                        <h2>{service.title}</h2>
                        <p><strong>Prix :</strong> {service.price}€</p>
                        <p>{service.description}</p>
                        <ul>
                            {service.features.map((feature: string, idx: number) => (
                                <li key={idx}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>


    );
};

export default Services;
