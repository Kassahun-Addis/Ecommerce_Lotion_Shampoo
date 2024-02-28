import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import ForgotPasssword from "./pages/Auth/ForgotPasssword";

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ar"],
    fallbackLng: "en",
    debug: false,
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    ns: [ "translation" ,
         "register",
        "header",
       "search",
       "AdminMenu",
       "forgotPassword",
       "login",
       "indexPage",
      "indexPost",
      "createDropShippingProduct",
      "createProduct",
      "about",
      "adminDashboard",
      "catagoryType",
      "createCategory",
      "form",
      "createDropShippingProduct",
     "updateProduct",
     "cart",
     "createBlog"
      ],
    backend: {
      loadPath: "/assets/locals/{{lng}}/{{ns}}.json", //
      allowMultiLoading: true, //
    },
  });

export default i18next;
