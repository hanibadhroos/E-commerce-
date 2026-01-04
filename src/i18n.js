import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend) // تحميل ملفات الترجمة
//   .use(LanguageDetector) // كشف لغة المتصفح
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    supportedLngs: ["en", "ar"],
    load: "languageOnly",
    interpolation: {
      escapeValue: false, // React يحمي من XSS
    },
  });

export default i18n;
