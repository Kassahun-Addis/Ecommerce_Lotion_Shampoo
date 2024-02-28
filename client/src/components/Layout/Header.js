import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import i18next from "i18next";
import { languages } from "../../Languages";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";
import classNames from "classnames";

const Header = () => {
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    document.title = t("app_title");
  }, [currentLanguage, t]);

  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <Link to="/" className="navbar-brand" style={{ color: "green" }}>
            🛒 {t("header:EcommerceApp")}
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  {t("header:Home")}
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  {t("header:Categories")}
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      {t("header:AllCategories")}
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c.slug}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item">
                <NavLink to="/blog" className="nav-link ">
                  {t("header:Blog")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/dropShippingProduct" className="nav-link ">
                  {t("header:DropShipping")}
                </NavLink>
              </li>

              {!auth?.user ? (
                <>
                  {/* <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                    {t("header:Register")}
                    </NavLink>
                  </li> */}
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      {t("header:Login")}
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          {t("header:Dashboard")}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          {t("header:Logout")}
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                    {t("header:Cart")}
                  </Badge>
                </NavLink>
              </li>
            </ul>
            <div
              className={classNames("dropdown", {
                open: isDropdownOpen,
              })}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="btn btn-link dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                onClick={toggleDropdown}
              >
                {t("translation")}
              </button>
              <ul
                className={classNames("dropdown-menu", {
                  show: isDropdownOpen,
                })}
                aria-labelledby="dropdownMenuButton1"
              >
                {languages.map(({ code, name, country_code }) => (
                  <li key={country_code}>
                    <a
                      href="#"
                      className={classNames("dropdown-item", {
                        disabled: currentLanguageCode === code,
                      })}
                      onClick={() => {
                        i18next.changeLanguage(code);
                        setDropdownOpen(false); // Close the dropdown after selecting
                      }}
                    >
                      <span
                        className={classNames(
                          "flag-icon",
                          `flag-icon-${country_code}`,
                          "mx-2"
                        )}
                        style={{
                          opacity: currentLanguageCode === code ? 0.5 : 1,
                        }}
                      ></span>
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
