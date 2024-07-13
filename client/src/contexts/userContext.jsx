import { createContext, useContext, useState, useEffect } from "react";
import { getUserDetails } from "../services/authServices.jsx";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails();
        console.log(response);
        if (response) {
          setIsAuth(true);
          setUserId(response.user.id);
          setUserRole(response.user.role);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [
    isAuth,
    userId,
    userRole,
  ]);

  return (
    <UserContext.Provider
      value={{
        isAuth,
        setIsAuth,
        userId,
        setUserId,
        userRole,
        setUserRole,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error(
      "useUserContext must be within a UserContextProvider. Make sure the component is wrapped in UserContextProvider"
    );

  return context;
};

export { UserContextProvider, useUserContext };
