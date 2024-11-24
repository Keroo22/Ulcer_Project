import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext(null);

// eslint-disable-next-line react/prop-types
function Context({ children }) {
  const url = "http://localhost:3000";
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  async function getProfileData() {
    setIsLoading(true);
    try {
      const res = await axios.get(`${url}/user/profile`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setProfileData(res.data.data);
      }
    } catch {
      toast.error("Error");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProfileData();
  }, []);

  const data = {
    url,
    profileData,
    isLoading,
    setProfileData,
    getProfileData,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}

export default Context;
