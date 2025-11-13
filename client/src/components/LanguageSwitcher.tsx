import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLang === "fr" ? "en" : "fr";
    i18n.changeLanguage(newLang);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999, // s'assure que rien ne passe au-dessus
        pointerEvents: "auto",
      }}
    >
      <button
        onClick={toggleLanguage}
        style={{
          backgroundColor: "#333",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "10px 16px",
          cursor: "pointer",
          fontSize: "1rem",
          lineHeight: "1.5",
          display: "inline-block",
        }}
      >
        {currentLang === "fr" ? "English" : "Français"}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
