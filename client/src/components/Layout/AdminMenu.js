import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaPlus, FaList, FaFileAlt, FaTags, FaNewspaper, FaBox, FaClipboardList, FaUsers } from 'react-icons/fa';
import "../../styles/AdminMenu.css";

const AdminMenu = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <div className="list-group dashboard-menu">
        <h4>{t("AdminMenu:AdminPanel")}</h4>
        <NavLink
          to="/dashboard/admin/create-dropshippingProduct"
          className="list-group-item list-group-item-action"
        >
          <FaPlus className="icon" />
          <span className="text">{t("AdminMenu:createDropShippingProducts")}</span>
        </NavLink>

        <NavLink
          to="/dashboard/admin/dropShippingProducts"
          className="list-group-item list-group-item-action"
        >
          <FaList className="icon" />
          <span className="text">{t("AdminMenu:dropShippingProducts")}</span>
        </NavLink>

        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action"
        >
          <FaFileAlt className="icon" />
          <span className="text">{t("AdminMenu:CreateProduct")}</span>
        </NavLink>

        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action"
        >
          <FaTags className="icon" />
          <span className="text">{t("AdminMenu:CreateCategory")}</span>
        </NavLink>
        
       

        <NavLink
          to="/dashboard/admin/create-post"
          className="list-group-item list-group-item-action"
        >
          <FaNewspaper className="icon" />
          <span className="text">{t("AdminMenu:CreatePost")}</span>
        </NavLink>

        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-action"
        >
          <FaBox className="icon" />
          <span className="text">{t("AdminMenu:products")}</span>
        </NavLink>

        <NavLink
          to="/dashboard/admin/posts"
          className="list-group-item list-group-item-action"
        >
          <FaClipboardList className="icon" />
          <span className="text">{t("AdminMenu:posts")}</span>
        </NavLink>

        <NavLink
          to="/dashboard/admin/orders"
          className="list-group-item list-group-item-action"
        >
          <FaClipboardList className="icon" />
          <span className="text">{t("AdminMenu:Orders")}</span>
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action"
        >
          <FaUsers className="icon" />
          <span className="text">{t("AdminMenu:users")}</span>
        </NavLink>
     
      </div>
    </div>
  );
};

export default AdminMenu;