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

export default function Register() {
    const { setUser } = useAuth();

    const register = () => {
        setUser({
            name: "John Doe",
        });
    }

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
                        <FormControl.Label>Email</FormControl.Label>
                        <Input />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input type="password" />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Confirm Password</FormControl.Label>
                        <Input type="password" />
                    </FormControl>
                    <Button mt="2" colorScheme="indigo">
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