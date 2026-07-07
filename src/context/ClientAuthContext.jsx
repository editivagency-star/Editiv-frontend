import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import API from "../config/api";

const ClientAuthContext = createContext();

export function ClientAuthProvider({ children }) {
  const [clientToken, setClientToken] = useState(() => localStorage.getItem("clientToken") || null);
  const [clientUser, setClientUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      if (!clientToken) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${API}/client/me`, {
          headers: { Authorization: `Bearer ${clientToken}` },
        });
        setClientUser(res.data.client || res.data);
      } catch {
        setClientToken(null);
        setClientUser(null);
        localStorage.removeItem("clientToken");
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, [clientToken]);

  const clientLogin = (token) => {
    localStorage.setItem("clientToken", token);
    setClientToken(token);
  };

  const clientLogout = () => {
    localStorage.removeItem("clientToken");
    setClientToken(null);
    setClientUser(null);
  };

  const isClientAuthenticated = !!clientToken && !!clientUser;

  return (
    <ClientAuthContext.Provider
      value={{ clientUser, clientToken, clientLogin, clientLogout, isClientAuthenticated, loading }}
    >
      {children}
    </ClientAuthContext.Provider>
  );
}

export function useClientAuth() {
  return useContext(ClientAuthContext);
}
