import React from "react";
import Layout from "./../components/Layout/Layout";
import { useTranslation } from "react-i18next";
const About = () => {
  const { t } = useTranslation();
  return (
   
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          {t("about:aboutus")}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
