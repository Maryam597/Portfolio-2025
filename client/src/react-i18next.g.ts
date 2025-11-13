import "react-i18next";
import type translationFr from "./locales/fr/translation.json";

declare module "react-i18next" {
  interface Resources {
    translation: typeof translationFr;
  }
}
