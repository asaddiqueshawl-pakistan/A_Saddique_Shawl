"use client";

import axios from "axios";
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // const getCurrentUser = async () => {
    //     try {
    //         setLoading(true);

    //         const response = await fetch("/api/auth/me", {
    //             method: "GET",
    //             credentials: "include",
    //             cache: "no-store",
    //         });

    //         const data = await response.json();

    //         if (response.ok && data.success) {
    //             setUser(data.user);
    //         } else {
    //             setUser(null);
    //         }
    //     } catch (error) {
    //         console.error("Get current user error:", error);
    //         setUser(null);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const getCurrentUser = async () => {
        try {
            setLoading(true);

            const response = await axios.get("/api/auth/me", {
                withCredentials: true,
                cache: "no-store",
            });

            const data = response.data;

            if (data.success) {
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.log(
                "Get current user error:",
                error.response?.data || error.message
            );

            setUser(null);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getCurrentUser();
    }, []);

    //   const logout = async () => {
    //     try {
    //       const response = await fetch("/api/auth/logout", {
    //         method: "POST",
    //         credentials: "include",
    //       });

    //       const data = await response.json();

    //       if (response.ok && data.success) {
    //         setUser(null);
    //         return {
    //           success: true,
    //           message: data.message,
    //         };
    //       }

    //       return {
    //         success: false,
    //         message: data.message || "Logout failed",
    //       };
    //     } catch (error) {
    //       console.error("Logout error:", error);

    //       return {
    //         success: false,
    //         message: "Something went wrong",
    //       };
    //     }
    //   };

    const logout = async () => {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
                cache: "no-store",
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                console.error("Logout failed:", data);

                return {
                    success: false,
                    message: data.message || "Logout failed",
                };
            }

            // Immediately update frontend authentication state
            setUser(null);

            return {
                success: true,
                message: data.message,
            };
        } catch (error) {
            console.error("Logout request error:", error);

            return {
                success: false,
                message: "Something went wrong while logging out",
            };
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                logout,
                getCurrentUser,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthContextProvider"
        );
    }

    return context;
}