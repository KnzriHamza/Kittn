import {Stack, Tabs} from 'expo-router'
import React, {useCallback} from "react";
import { FontAwesome } from "@expo/vector-icons";
import {View, Text} from "react-native";
import {COLORS} from "../constants";


const Layout = () => {


    return (
        <Tabs
            initialRouteName="index"
            screenOptions={{

                headerShown: false,
            }}
        >
                <Tabs.Screen

                    name="index"
                    options={{
                        unmountOnBlur: true,
                        href: "/",
                        title: "",
                        headerShown:true,
                        tabBarIcon: ({ color }) => (
                            <View
                                style={{

                                    flexDirection: "column",
                                    alignItems: "center",
                                    marginTop: 8,
                                    backgroundColor: "transparent",
                                }}
                            >
                                <FontAwesome name="sticky-note" color={color} size={28}  />
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="categories"
                    options={{
                        unmountOnBlur: true,
                        title: "",
                        headerShown: true,
                        href: {
                            pathname: "/categories",
                        },
                        tabBarIcon: ({ color }) => (
                            <View
                                style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    marginTop: 8,
                                    backgroundColor: "transparent",
                                }}
                            >
                                <FontAwesome name="id-card" color={color} size={28} />
                            </View>
                        ),
                    }}
                />

            <Tabs.Screen
                name="userProfile"
                options={{

                    title: "",
                    headerShown: true,
                    href: null,
                    tabBarIcon: ({ color }) => (
                        <View
                            style={{
                                flexDirection: "column",
                                alignItems: "center",
                                marginTop: 8,
                                backgroundColor: "transparent",
                            }}
                        >
                            <FontAwesome name="gear" color={color} size={28} />
                        </View>
                    ),
                }}
            />


            <Tabs.Screen
                name="newCategory"
                options={{
                    title: "",
                    headerShown: true,
                    href: null,
                    tabBarIcon: ({ color }) => (
                        <View
                            style={{
                                flexDirection: "column",
                                alignItems: "center",
                                marginTop: 8,
                                backgroundColor: "transparent",
                            }}
                        >
                            <FontAwesome name="gear" color={color} size={28} />
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name="newNote"
                options={{
                    title: "",
                    headerShown: true,
                    href: null,
                    tabBarIcon: ({ color }) => (
                        <View
                            style={{
                                flexDirection: "column",
                                alignItems: "center",
                                marginTop: 8,
                                backgroundColor: "transparent",
                            }}
                        >
                            <FontAwesome name="gear" color={color} size={28} />
                        </View>
                    ),
                }}
            />
        </Tabs>
    )
}

export default Layout;