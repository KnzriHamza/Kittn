import {useEffect, useState} from "react";
import {Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {Link, Stack, useRouter} from "expo-router";
import {COLORS} from "../constants";
import {
    Avatar, Box, Button, Center, CheckIcon,
    Fab, FormControl,

    Heading, HStack,
    Icon, IconButton,
    Input, Menu, Modal, Pressable, Select, Spinner, Stagger, TextArea, useColorMode, useDisclose,
    VStack
} from "native-base";
import {AntDesign, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {useAuth} from "../context/ContextProvider";
import Note from "../components/home/welcome/Note";
import SecureStore from "@react-native-async-storage/async-storage/src";
import Categories from "../components/home/welcome/Categories";
import axiosClient from "../axios-client";






const Home = () =>{

    //Modal
    const [modalVisible, setModalVisible] = useState(false);

    const {user,token, setUser, setToken } = useAuth();

    const router = useRouter();
    const {
        colorMode,

    } = useColorMode();
    const userName = user ? user.name : '';
    const [initials, setInitials] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoriesBar, setCategoriesBar] = useState([]);
    const [todos, setTodos] = useState([]);
    const [selectedTodo, setSelectedTodo] = useState([]);
    const [isLoading, setLoading] = useState(true);


        const {
            isOpen,
            onToggle
        } = useDisclose();


    useEffect(() => {
        getCategories()
        getTodos()
    }, []);

    const logout = async () => {
        setToken(null)
        setUser()

    };



    const onModalSubmit = () => {
        setLoading(true)
        const payload = {
            todoTitle: selectedTodo.todoTitle,
            todoMessage: selectedTodo.todoMessage,

        };
        axiosClient
            .put("/todos/"+selectedTodo.id, payload)
            .then(function (response) {
                console.error("Submitted succeffly")
                getTodos();
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    // this line Checks the token in use
    const changeToken = async () => {
        // if i change the token it stays logged in setToken("99|xaaux3YJgy4rNpY4SITxqTfgFl6IVgpxa2143Ne2");
        console.warn("Token Loaded ", token)
        console.error(await SecureStore.getItem('ACCESS_TOKEN'))

    };


    const getTodos = () => {


        axiosClient
            .get(`/todos`)
            .then(({ data }) => {
                setTodos(data.data)
                setLoading(false)

            })
            .catch(() => {
            });
    };


    const getCategories = () => {
        axiosClient
            .get(`/todoCategories`)
            .then(({ data }) => {
                setCategories(data)
                setCategoriesBar(data.data)
                console.log(categoriesBAr)
            })
            .catch(() => {
                console.log("route errors")
            });
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



                    <Heading >
                        <Text>Welcome Back {userName}</Text>
                    </Heading>
                    <Input variant="rounded" w={{
                        base: "100%",
                        md: "100%"
                    }} InputRightElement={<Icon as={<MaterialIcons name="search" />} size={5} mr="2" color="muted.400" />} placeholder="Name" />
                    <Categories categories={categories}></Categories>

                    <ScrollView
                        contentContainerStyle={{ width: '100%' }}
                        showsVerticalScrollIndicator={true}
                    >
                            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                                <Modal.Content>
                                    <Modal.CloseButton />
                                    <Modal.Header>Edit Todo</Modal.Header>
                                    <Modal.Body >
                                        <FormControl>
                                            <FormControl.Label>Todo Title</FormControl.Label>
                                            <Input
                                                defaultValue={selectedTodo ? selectedTodo.todoTitle : ''}
                                                onChangeText={newTitle =>setSelectedTodo((prevState) => ({
                                                    ...prevState,
                                                    todoTitle: newTitle,
                                                }))}/>
                                        </FormControl>
                                        <FormControl mt="3">
                                            <FormControl.Label>Todo Description</FormControl.Label>

                                            <TextArea width="100%" defaultValue={selectedTodo ? selectedTodo.todoMessage : ''} // for android and ios
                                                      w="100%" maxW="300" onChangeText={
                                                newMessage =>setSelectedTodo((prevState) => ({
                                                    ...prevState,
                                                    todoMessage: newMessage,
                                                }))}/>
                                        </FormControl>
                                        <FormControl>
                                            <FormControl.Label>Todo Categorie</FormControl.Label>
                                            <Box maxW="300">
                                                <Select
                                                    minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                                                    bg: "teal.600",
                                                    endIcon: <CheckIcon size="5" />
                                                }} mt={1} >
                                                    <Select.Item label="Uncategorized" value="0" />
                                                    {categoriesBar.map((item) => (
                                                        <Select.Item label={item.categoryName} value={item.id} />
                                                    ))}
                                                </Select>
                                            </Box>
                                        </FormControl>
                                        <FormControl>
                                            <FormControl.Label>Due Date</FormControl.Label>
                                            <Input  defaultValue={selectedTodo ? selectedTodo.todoDate : ''}/>
                                        </FormControl>
                                        <FormControl>
                                            <FormControl.Label>Priority</FormControl.Label>
                                            <Select minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                                                bg: "teal.600",
                                                endIcon: <CheckIcon size="5" />
                                            }} mt={1} >
                                                <Select.Item label="Lowest" value="Lowest" />
                                                <Select.Item label="Low" value="Low" />
                                                <Select.Item label="Medium" value="Medium" />
                                                <Select.Item label="High" value="High" />
                                                <Select.Item label="Highest" value="Highest" />
                                            </Select>
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
                        {isLoading ? ( // Use a conditional statement to render based on loading state
                            <VStack space={8} justifyContent="center">
                                <Spinner color="emerald.500" />
                                <Spinner color="warning.500" />
                                <Spinner color="indigo.500" />
                                <Spinner color="cyan.500" />
                            </VStack>
                        ) : (
                            <VStack space={4}  px="4" bg={colorMode === "dark" ? "coolGray.800" : "warmGray.50"}>

                                {todos.map((todo) => (
                                    <Pressable onPress={() => {
                                        setModalVisible(!modalVisible);
                                        setSelectedTodo(todo)
                                        console.log(selectedTodo)

                                    }} rounded="8" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg={colorMode === "dark" ? "coolGray.900" : "warmGray.50"} p="5">
                                        <Note todo={todo}></Note>
                                    </Pressable>


                                ))}
                            </VStack>
                        )}


                    </ScrollView>




                </VStack >
                <Fab></Fab>
        </SafeAreaView>
    )
}


export default Home;