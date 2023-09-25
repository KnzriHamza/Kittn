import { createContext, useContext, useEffect, useState } from "react";
import { useSegments, useRouter, useRootNavigationState } from "expo-router";
import SecureStore from "@react-native-async-storage/async-storage/src"; // Corrected import order

const AuthContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

export const useAuth = () => useContext(AuthContext);

function useProtectedRoute(user, token) { // Pass both user and token as parameters
    const segments = useSegments();
    const router = useRouter();
    const navigationState = useRootNavigationState();





    useEffect(() => {
        if (!navigationState?.key) return;
        const inAuthGroup = segments[0] === "(auth)";
        if (
            (!user || !token) &&
            !inAuthGroup
        ) {
            // Redirect to the sign-in page.
            SecureStore.removeItem("ACCESS_TOKEN");
            router.replace("/login");

        } else if (user && token && inAuthGroup) {
            // Redirect away from the sign-in page.
                SecureStore.setItem("ACCESS_TOKEN", token);
                router.replace("/");

        }
    }, [user, token, segments, navigationState]);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    useProtectedRoute(user, token); // Pass both user and token

    const authContext = {
        user,
        token,
        setUser,
        setToken,
    };

    return <AuthContext.Provider value={{
        setUser,
        setToken,
        user,
        token,

    }}>{children}</AuthContext.Provider>;
}
