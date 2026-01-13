import { createContext, useState, useEffect } from "react";
import userService from "../services/UserService";
import { authService } from "../services/AuthService";
import Cookies from "js-cookie";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLogout, setIsLogout] = useState(false);
    useEffect(() => {
        async function loadUser() {
            try {
                const token = Cookies.get("token");
                if (!token) {
                    console.log("No token, aborting");
                    setUser(null);
                    return;
                }

                const userData = await userService.getMe();
                setUser(userData);
            } catch (e) {
                console.error("Error loading user", e);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, []);

    function logout() {
        authService.logout();
        setLoading(true);
        setIsLogout(true);
        setUser(null);
        setTimeout(() => {
            setLoading(false);
        }, 800);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                isAuthenticated: !!user,
                logout,
                isLogout,
                setIsLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
