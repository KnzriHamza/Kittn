import {useEffect, useState} from "react";
import {Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {Link, Stack, useRouter} from "expo-router";
import {COLORS, SIZES} from "../constants";
import {
    Alert,
    Avatar, Badge, Box, Button, Center, CheckIcon, Divider,
    Fab, Flex, FormControl,

    Heading, Hidden, HStack,
    Icon, IconButton,
    Input, Menu, Modal, Pressable, Select, Slide, Spacer, Spinner, TextArea, useColorMode, useDisclose, useToast,
    VStack, WarningOutlineIcon
} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";
import {useAuth} from "../context/ContextProvider";
import axiosClient from "../axios-client";
import AddCategory from "../components/common/AddCategory";






const UserProfile = () =>{

    //Modal

    const {user,token, setUser, setToken } = useAuth();

    const router = useRouter();
    const {
        colorMode,

    } = useColorMode();
    const userName = user ? user.name : '';
    const [initials, setInitials] = useState([]);
    const [selectedTodo, setSelectedTodo] = useState([]);
    const [newForm, setNew] = useState(false);


    const logout = async () => {
        setToken(null)
        setUser()

    };

    useEffect(() => {
        formControl()
    }, [newForm]);


    useEffect(() => {

        getCategories()
    }, []);


    const formControl = () => {
        if (newForm){
            console.log("new todo")
        }else {
            console.log("newNote")
        }
    };
    const getCategories = () => {

        axiosClient
            .get(`/todoCategories`)
            .then(({ data }) => {
                setCategories(data)

            })
            .catch(() => {
                console.log("route errors")
            });
    };


    const {
        isOpen,
        onToggle
    }= useDisclose();







    return(
        <SafeAreaView style={{flex:1, backgroundColor: COLORS.lightWhite}} >
            <Stack.Screen
                options={{
                    headerTransparent: false,
                    headerStyle: { backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerTitle: ""
                }}

            />


            <VStack  space={2.5} w="100%" px="4" bg={colorMode === "dark" ? "coolGray.800" : "warmGray.50"} paddingTop="16">



                <Box>
                    <VStack height="100%" space="3" >

                        <Center>
                            <Avatar size="48" marginRight="4" bg="amber.500" source={{
                                uri: "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
                            }}>{initials}</Avatar>



                            <Box safeArea>
                                <Heading><Text>{userName}</Text></Heading>
                            </Box>

                        </Center>


                    </VStack>
                </Box>
            </VStack>
        </SafeAreaView>
    )
}


export default UserProfile;