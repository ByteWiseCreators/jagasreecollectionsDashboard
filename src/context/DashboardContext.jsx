/* eslint-disable no-unused-vars */
import { createContext, useCallback, useEffect, useId, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import useNotification from "../hooks/useNotifications";

import { resourceURL } from "../constants.js";
import { getCookie } from "../Utils/index.js";

export const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
  const [userLoged, setUserLoged] = useState(() => {
    return getCookie("current_theam");
  });

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [policies, setPolicies] = useState({
    privacyPolicy: "",
    shoppingPolicy: "",
  });
  const [about, setAbout] = useState("");
  const [offersImgArr, setOffersImgArr] = useState([]);
  const [socials, setSocials] = useState({});

  const { notify, NotificationContainer } = useNotification({
    position: "top-right",
    ttl: 2000,
  });

  const navigate = useNavigate();

  const fetchSomething = useCallback(async (url, defaultValue) => {
    try {
      const { data } = await axios.get(url);
      return data?.data || defaultValue;
    } catch (error) {
      console.error(`Error in fetching '${url}': `, error);
      return defaultValue;
    }
  }, []);

  useEffect(() => {
    if (!userLoged) navigate("/auth");
  }, [navigate, userLoged]);

  useEffect(() => {
    (async function () {
      const [products, policies, aboutContent, offers, socialMedias, users] =
        await Promise.all([
          fetchSomething(`${resourceURL}/api/jc/products`, []),
          fetchSomething(`${resourceURL}/api/jc/policy`, ""),
          fetchSomething(`${resourceURL}/api/jc/about`, ""),
          fetchSomething(`${resourceURL}/api/jc/offers`, []),
          fetchSomething(`${resourceURL}/api/jc/socials`, {}),
          fetchSomething(`${resourceURL}/api/jc/users`, []),
        ]);
      setProducts(products.reverse());
      setPolicies({
        privacyPolicy: policies?.policy || "",
        shoppingPolicy: policies?.shopping || "",
      });
      setAbout(aboutContent);
      setOffersImgArr(offers);
      setSocials(socialMedias);
      setUsers(users);
    })();
  }, [fetchSomething]);

  const contextValues = {
    userLoged,
    setUserLoged,
    products,
    setProducts,
    users,
    policies,
    about,
    offersImgArr,
    socials,
    notify,
  };

  return (
    <DashboardContext.Provider value={contextValues}>
      {children}
      {NotificationContainer()}
    </DashboardContext.Provider>
  );
};

DashboardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardProvider;
