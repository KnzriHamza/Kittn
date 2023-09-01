import {useSegments, useRouter, useRootNavigationState} from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext({
    user: null,
    setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

function useProtectedRoute(user) {
    const segments = useSegments();
    const router = useRouter();
    const navigationState = useRootNavigationState();
    useEffect(() => {

        //the was that react loads the login page before loading the main layout this fixes it

        if (!navigationState?.key) return;

        //
        const inAuthGroup = segments[0] === "(auth)";

        if (
            // If the user is not signed in and the initial segment is not anything in the auth group.
            !user &&
            !inAuthGroup
        ) {
            // Redirect to the sign-in page.
            router.replace("/login");
        } else if (user && inAuthGroup) {
            // Redirect away from the sign-in page.
            router.replace("/");
        }
    }, [user, segments, navigationState]);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useProtectedRoute(user);

    const authContext = {
        user,
        setUser,
    };

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}
