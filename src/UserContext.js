import React, { useEffect } from "react";
import { useState } from "react";

export const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {

    const [loggedinUser, setLoggedinUser] = useState("");
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/check-auth`, {
          method: 'GET',
          credentials: 'include', // include cookies
        });
        if (res.ok) {
          const data = await res.json();
          console.log("data", data)
          setLoggedinUser(data);
        } else {
          setLoggedinUser(null);
        }
      } catch (err) {
        setLoggedinUser(null);
      } finally {
        setLoading(false); // auth check finished
      }
    };
    checkLogin();
  }, []);
  console.log("loggedinuser context", loggedinUser)

    return <UserContext.Provider value={{ loggedinUser, setLoggedinUser, loading }}>
        {children}
    </UserContext.Provider>
}