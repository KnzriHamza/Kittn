import {View, Text,  TextInput} from "react-native";
import { useAuth } from "../context/ContextProvider";

import {
    Avatar,

    Box,
    Button,
    Center,
    Container, Flex,
    FormControl,
    Heading,
    Icon,
    Input,
    Pressable,
    VStack,
    WarningOutlineIcon
} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";
import {useState} from "react";
import {Link, Stack} from "expo-router";
import {COLORS, icons, images} from "../constants";
import {ScreenHeaderBtn} from "../components";
export default function Login() {
    const { setUser } = useAuth();
    const [show, setShow] = useState(false);
    const login = () => {
        setUser({
            name: "John Doe",
        });
    }

    const toRegister = ({navigation}) => {
        navigation.navigate('Details')
    }

    return (
        <Center>
            <Stack.Screen
                options={{
                    headerShown:false,
                    headerShadowVisible: false,

                }}
            />
            <Container >
                <VStack space={2.5} w="100%" px="3" paddingTop="25%">


                       <Avatar bg="purple.600" alignSelf="center" size="2xl" source={{
                           uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
                       }}>
                           RB
                       </Avatar>
                       <FormControl  isInvalid w="75%" maxW="300px">

                           <VStack space={2.5}>
                               <Box>
                                   <FormControl.Label>Email</FormControl.Label>
                                   <Input w={{
                                       base: "100%",
                                       md: "25%"
                                   }} InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />} placeholder="Name" />
                                   <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                       Try different from previous passwords.
                                   </FormControl.ErrorMessage>
                               </Box>



                               <Box>
                                   <FormControl.Label>Password</FormControl.Label>
                                   <Input placeholder="Enter password" />
                                   <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                       Try different from previous passwords.
                                   </FormControl.ErrorMessage>

                               </Box>


                               <Button onPress={login}>Login</Button>
                               <Link href="/register">
                                   Click here to Register.
                               </Link>
                           </VStack>

                       </FormControl>


                </VStack>;
            </Container>
        </Center>


    );
}