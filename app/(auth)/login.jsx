import { useAuth } from "../context/ContextProvider";

import {
    Avatar,

    Box,
    Button,
    Center,
    Text,
    FormControl, Heading, HStack,
    Icon,
    Input,
    VStack,
    WarningOutlineIcon
} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";
import {useRef, useState} from "react";
import {Link, Stack} from "expo-router";
import axios from "axios";
import axiosClient from "../axios-client";


export default function Login() {
    const { setUser, setToken } = useAuth();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [errors, setErrors] = useState(null);
    const [username, setUserName] = useState(null);

    const onSubmit = async () => {
        const payload = {
            email: "a@admin.com",
            password: "q@123456789"
        };

        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user)
                setToken(data.token)
                //console.log("login token",data.token)
            })
            .catch((err) => {
                console.error("Login request failed:", err);

            });
    };



    return (
        <Center>
            <Stack.Screen
                options={{
                    headerShown:false,
                    headerShadowVisible: false,

                }}
            />
            <Box safeArea marginTop="16" p="2" py="8" w="90%" maxW="290">
                <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                    color: "warmGray.50"
                }}>
                    Welcome
                </Heading>
                <Heading mt="1" _dark={{
                    color: "warmGray.200"
                }} color="coolGray.600" fontWeight="medium" size="xs">
                    Sign in to continue!
                </Heading>

                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>Email ID</FormControl.Label>
                        <Input />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input type="password" />
                        <Link _text={{
                            fontSize: "xs",
                            fontWeight: "500",
                            color: "indigo.500"
                        }} alignSelf="flex-end" mt="1" href="">
                            Forget Password?
                        </Link>
                    </FormControl>
                    <Button onPress={onSubmit} Login mt="2" colorScheme="indigo">
                        Sign in
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Text fontSize="sm" color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }}>
                            I'm a new user.{" "}
                        </Text>
                        <Link _text={{
                            color: "indigo.500",
                            fontWeight: "medium",
                            fontSize: "sm"
                        }} href="/register">
                            Sign Up
                        </Link>
                    </HStack>
                </VStack>
            </Box>
        </Center>


    );
}