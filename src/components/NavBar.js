import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const [t, i18n] = useTranslation();

  const [currentUser, setCurrentUser] = useState(undefined);
  const [showClientBoard, setShowClientBoard] = useState(false);
  const [showAgentGuichetBoard, setShowAgentGuichetBoard] = useState(false);
  const [showAgentGuichetGetBoard, setShowAgentGuichetGetBoard] =
    useState(false);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowClientBoard(user.roles.includes("ROLE_CLIENT"));
      setShowAgentGuichetBoard(user.roles.includes("ROLE_AGENT_GUICHET"));
      setShowAgentGuichetGetBoard(
        user.roles.includes("ROLE_AGENT_GUICHET_GET")
      );
    }
  }, []);
  const logOut = () => {
    AuthService.logout();
    setShowClientBoard(false);
    setShowAgentGuichetBoard(false);
    setShowAgentGuichetGetBoard(false);
    setCurrentUser(undefined);
  };

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to={"/"} className="navbar-brand">
        {t("navbar.menu.logo.text")}
      </Link>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/home"} className="nav-link">
            {t("navbar.menu.home")}
          </Link>
        </li>
        {showAgentGuichetBoard | showAgentGuichetGetBoard && (
          <>
            <li className="nav-item">
              <Link to={"/manage_customers"} className="nav-link">
                {t("navbar.menu.customer_management")}
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/manage_bankaccounts"} className="nav-link">
                {t("navbar.menu.bank_account_management")}
              </Link>
            </li>
          </>
        )}
        {showClientBoard && (
          <>
            <li className="nav-item">
              <Link to={"/consult_account"} className="nav-link">
                {t("navbar.menu.bank_account_management")}
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add_wirer_transfer"} className="nav-link">
                {t("navbar.menu.wired_transfer")}
              </Link>
            </li>
          </>
        )}
        {currentUser && (
          <li className="nav-item">
            <Link to={"/profile"} className="nav-link">
              {t("navbar.menu.profile")}
            </Link>
          </li>
        )}
      </div>
      {currentUser ? (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/profile"} className="nav-link">
              {currentUser.username}
            </Link>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-link" onClick={logOut}>
              {t("navbar.menu.logout")}
            </a>
          </li>
        </div>
      ) : (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              {t("navbar.menu.login")}
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              {t("navbar.menu.signup")}
            </Link>
          </li>
        </div>
      )}
      <div className="navbar-nav mr-auto">
        <button onClick={() => changeLang("en")} className="m-2">
          en
        </button>
        <button onClick={() => changeLang("fr")} className="m-2">
          fr
        </button>
      </div>
    </nav>
  );
};
export default NavBar;
