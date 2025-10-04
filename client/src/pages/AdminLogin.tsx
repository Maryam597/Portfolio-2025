import { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:8000/auth/admin/login",
                { email, password },
                { withCredentials: true } 
            );

            localStorage.setItem('token', res.data.token);
            window.location.href = "/admin/dashboard";
        } catch (err) {
            alert("Identifiants invalides !");
            console.error(err);
        }
    };


    return (
        <form onSubmit={handleLogin}>
            <h2>Admin Login</h2>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
            <button type="submit">Se connecter</button>
        </form>
    );
};

export default AdminLogin;
