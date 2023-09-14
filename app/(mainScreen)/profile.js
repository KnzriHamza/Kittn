import {useEffect, useState} from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {Link, Stack, useRouter} from "expo-router";
import {COLORS, SIZES} from "../constants";
import {
    Avatar, Badge, Box, Button, CheckIcon,
    Fab, Flex, FormControl,

    Heading, HStack,
    Icon, IconButton,
    Input, Menu, Modal, Pressable, Select, Spacer, TextArea, useColorMode, useDisclose,
    VStack,Text
} from "native-base";
import {AntDesign, MaterialIcons} from "@expo/vector-icons";
import {useAuth} from "../context/ContextProvider";
import Note from "../components/home/welcome/Note";
import SecureStore from "@react-native-async-storage/async-storage/src";
import Categories from "../components/home/welcome/Categories";
import axiosClient from "../axios-client";






const Profile = () =>{

    //Modal
    const [modalVisible, setModalVisible] = useState(false);

    const {user,token, setUser, setToken } = useAuth();

    const router = useRouter();
    const {
        colorMode,

    } = useColorMode();
    const userName = user ? user.name : '';
    const [initials, setInitials] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);

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
                setCategories(data.data)
                console.error(categories)
            })
            .catch(() => {
                console.log("route errors")
            });
    };


    const {
        isOpen,
        onToggle
    }= useDisclose();

    // this line Checks the token in use
    const changeToken = async () => {
        // if i change the token it stays logged in setToken("99|xaaux3YJgy4rNpY4SITxqTfgFl6IVgpxa2143Ne2");
        console.warn("Token Loaded ", token)
        console.error(await SecureStore.getItem('ACCESS_TOKEN'))

    };





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
                            <Menu.Item ><Link href="/profile">Profile</Link></Menu.Item>
                            <Menu.Item onPress={logout}>Logout</Menu.Item>

                        </Menu>

                    ),
                    headerTitle: ""
                }}

            />


            <VStack safeArea  space={2.5} w="100%" px="4" bg={colorMode === "dark" ? "coolGray.800" : "warmGray.50"} paddingTop="16">

                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                    <Modal.Content>
                        <Modal.CloseButton />
                        <Modal.Header>Edit Todo</Modal.Header>
                        <Modal.Body >
                            <FormControl>
                                <FormControl.Label>Todo Title</FormControl.Label>
                                <Input
                                    defaultValue={selectedCategory ? selectedCategory.todoTitle : ''}
                                    onChangeText={newTitle =>setSelectedCategory((prevState) => ({
                                        ...prevState,
                                        todoTitle: newTitle,
                                    }))}/>
                            </FormControl>
                            <FormControl mt="3">
                                <FormControl.Label>Todo Description</FormControl.Label>

                                <TextArea width="100%" defaultValue={selectedCategory ? selectedCategory.todoMessage : ''} // for android and ios
                                          w="100%" maxW="300" onChangeText={
                                    newMessage =>setSelectedCategory((prevState) => ({
                                        ...prevState,
                                        todoMessage: newMessage,
                                    }))}/>
                            </FormControl>




                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                    setModalVisible(false);
                                }}>
                                    Cancel
                                </Button>
                                <Button onPress={() => {
                                    setModalVisible(false);
                                    onModalSubmit();
                                }}>
                                    Save
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>

                <Heading >
                    <Text>Categories</Text>
                </Heading>

                <ScrollView>
                    <VStack space="6">
                        {categories.map((item) => (
                            <Pressable onPress={() => console.log(item.id)} rounded="8" overflow="hidden" borderWidth="1"  maxW="96" shadow="3" bg={item.categoryColor} p="5">
                                <Box height="24">
                                    <HStack alignItems="center">
                                        <IconButton size="lg"  variant="outline" colorScheme={item.categoryColor}  _icon={{
                                            as: AntDesign,
                                            name: "delete"
                                        }} />
                                        <IconButton size="lg" colorScheme={item.categoryColor} onPress={()=>{
                                            setModalVisible(!modalVisible);

                                        }} _icon={{
                                            as: AntDesign,
                                            name: "edit"
                                        }} />
                                        <Spacer />

                                            <VStack>
                                                <HStack>
                                                    <Text  fontSize="xl" bold >
                                                        {item.categoryName.toUpperCase()}
                                                    </Text>


                                                </HStack>
                                                <HStack>
                                                    <IconButton alignItems="left" size="sm" variant="outline" colorScheme={item.categoryColor} onPress={()=>{
                                                        setModalVisible(!modalVisible);

                                                    }} _icon={{
                                                        as: AntDesign,
                                                        name: "edit"
                                                    }} />
                                                    <IconButton alignItems="right" size="sm"  variant="outline" colorScheme={item.categoryColor}  _icon={{
                                                        as: AntDesign,
                                                        name: "delete"
                                                    }} />
                                                </HStack>
                                            </VStack>

                                    </HStack>


                                </Box>
                            </Pressable>



                        ))}

                    </VStack>
                </ScrollView>
            </VStack>
        </SafeAreaView>
    )
}


export default Profile;