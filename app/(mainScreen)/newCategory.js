import {useEffect, useState} from "react";
import {Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {Link, Stack, useRouter} from "expo-router";
import {COLORS, SIZES} from "../constants";
import {
    Alert,
    Avatar, Badge, Box, Button, CheckIcon, Divider,
    Fab, Flex, FormControl,

    Heading, Hidden, HStack,
    Icon, IconButton,
    Input, Menu, Modal, Pressable, Select, Slide, Spacer, Spinner, TextArea, useColorMode, useDisclose, useToast,
    VStack, WarningOutlineIcon
} from "native-base";
import {AntDesign, MaterialIcons} from "@expo/vector-icons";
import {useAuth} from "../context/ContextProvider";
import axiosClient from "../axios-client";
import AddCategory from "../components/common/AddCategory";






const NewCategory = () =>{

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
    const messageToast = useToast();

    const logout = async () => {
        setToken(null)
        setUser()

    };




    useEffect(() => {
        getCategories()

    }, []);



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
                    headerTransparent: true,
                    headerStyle: { backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerLeft:()=>(
                        <IconButton marginLeft="4" size={"md"} variant="solid" _icon={{
                            as: MaterialIcons,
                            name: "menu"
                        }} />
                    ),
                    headerRight:()=>(

                        <Menu w="190" trigger={triggerProps => {
                            return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                                <Avatar marginRight="4" bg="amber.500" source={{
                                    uri: "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
                                }}>{initials}</Avatar>
                            </Pressable>;
                        }}>
                            <Menu.Item onPress={()=>{router.push('/userProfile')}}>Profile</Menu.Item>

                            <Menu.Item onPress={logout}>Logout</Menu.Item>

                        </Menu>

                    ),
                    headerTitle: ""
                }}

            />


            <VStack safeArea  space={2.5} w="100%" px="4" bg={colorMode === "dark" ? "coolGray.800" : "warmGray.50"} paddingTop="16">


                <Heading >
                    <Text>Welcome Back {userName}</Text>
                </Heading>
                <Divider/>


                    <VStack height="100%" space="5">

                            <Box width="100%">
                                <ScrollView >
                                <AddCategory></AddCategory>
                                </ScrollView>
                            </Box>



                    </VStack>


            </VStack>

        </SafeAreaView>
    )
}


export default NewCategory;