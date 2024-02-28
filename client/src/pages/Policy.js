import React from "react";
import Layout from "./../components/Layout/Layout";
import { useTranslation } from "react-i18next";
const Policy = () => {
  const { t } = useTranslation();
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>{t("policy:policy1")}</p>
          <p>{t("policy:policy2")}</p>
          <p>{t("policy:policy3")}</p>
          <p>{t("policy:policy4")}</p>
          <p>{t("policy:policy5")}</p>
          <p>{t("policy:policy6")}</p>
          <p>{t("policy:policy7")}</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
