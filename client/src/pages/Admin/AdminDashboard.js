import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { useTranslation } from "react-i18next";
const AdminDashboard = () => {
  const [auth] = useAuth();
  const {t} = useTranslation();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3> {t("adminDashboard:AdminName")}: {auth?.user?.name}</h3>
              <h3> {t("adminDashboard:AdminEmail")} : {auth?.user?.email}</h3>
              <h3> {t("adminDashboard:AdminContact")} : {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;