import {Link, Stack} from "expo-router";
import { useAuth } from "../context/ContextProvider";
import {
    Avatar,
    Box,
    Button,
    Center,
    Container,
    FormControl, Heading, HStack,
    Icon,
    Input, Text,
    VStack,
    WarningOutlineIcon
} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";
import axiosClient from "../axios-client";
import {useState} from "react";

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState()



    const { setUser, setToken } = useAuth();

    const onSubmit = () => {
        if (email === '' || password === '') {
            console.error('Error', 'Please fill all fields');
            return;
        }

        if (password !== passwordConfirmation) {
            console.error('Error', 'Passwords do not match');
            return;
        }

        const payload = {

            email: email,
            name: name,
            password: password,
            password_confirmation:passwordConfirmation
        };

        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                console.log("connected")
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(err)
                }
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
            <Box safeArea marginTop="16" p="2" w="90%" maxW="290" py="8">
                <Heading size="lg" color="coolGray.800" _dark={{
                    color: "warmGray.50"
                }} fontWeight="semibold">
                    Welcome
                </Heading>
                <Heading mt="1" color="coolGray.600" _dark={{
                    color: "warmGray.200"
                }} fontWeight="medium" size="xs">
                    Sign up to continue!
                </Heading>
                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>Name</FormControl.Label>
                        <Input
                            defaultValue={name}
                            placeholder="Enter Your Name"
                            onChangeText={(newEmail) => setName(newEmail)}
                            type="name"
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input
                            defaultValue={email}
                            placeholder="Enter Email"
                            onChangeText={(newEmail) => setEmail(newEmail)}
                            type="email"
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input
                            defaultValue={password}
                            placeholder="Enter Password"
                            onChangeText={(newPassword) => setPassword(newPassword)}
                            type="password" />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Confirm Password</FormControl.Label>
                        <Input
                            defaultValue={passwordConfirmation}
                            placeholder="Enter Password Confirmation"
                            onChangeText={newPasswordConfirmation => setPasswordConfirmation(newPasswordConfirmation)}
                            type="password" />
                    </FormControl>
                    <Button mt="2" colorScheme="indigo" onPress={onSubmit}>
                        Sign up
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Text fontSize="sm" color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }}>
                            I already have an account.{" "}
                        </Text>
                        <Link _text={{
                            color: "indigo.500",
                            fontWeight: "medium",
                            fontSize: "sm"
                        }} href="/login">
                            Login
                        </Link>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    );
}