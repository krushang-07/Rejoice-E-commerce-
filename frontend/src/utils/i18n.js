import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    fallbackLng: "en", // Default language
    lng: "en", // Initial language
    interpolation: { escapeValue: false }, // React handles escaping
    backend: {
      loadPath: "/locals/{{lng}}/translation.json", // Path to translation files
    },
  });

export default i18n;
