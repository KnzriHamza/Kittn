import { Stack } from 'expo-router'
import {useCallback} from "react";
import {useFonts} from "expo-font";
import * as SplashScreen from 'expo-splash-screen'
import {AuthProvider} from "./context/ContextProvider";
import { NativeBaseProvider } from "native-base";

const Layout = () => {
    const [fontsLoaded] = useFonts({
        DMBold : require('./assets/fonts/DMSans-Bold.ttf'),
        DMMedium : require('./assets/fonts/DMSans-Medium.ttf'),
        DMRegular : require('./assets/fonts/DMSans-Regular.ttf'),
    })

    const onLayoutRootView = useCallback(async() =>{
        if (fontsLoaded){
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded])

    if (!fontsLoaded) return null;

    return (

                    <AuthProvider>
                        <NativeBaseProvider >
                        <Stack>
                            <Stack.Screen
                                name="(mainScreen)"
                                options={{
                                    headerShown: false,
                                }}
                            />
                        </Stack>
                            </NativeBaseProvider>
                    </AuthProvider>
    )
}

export default Layout;