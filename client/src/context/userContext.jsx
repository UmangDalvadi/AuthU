import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState("");
    const [userId, setUserId] = useState("");
    const [userRole, setUserRole] = useState("");

    return <UserContext.Provider
        value={{
            isAuth,
            setIsAuth,
            userId,
            setUserId,
            userRole,
            setUserRole
        }}
    >{children}</UserContext.Provider>
};

const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined)
        throw new Error(
            "useUserContext must be within a UserContextProvider. Make sure the component is wrapped in UserContextProvider"
        );

    return context;
}

export {
    UserContextProvider,
    useUserContext
};