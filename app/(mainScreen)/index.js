import {useEffect, useState} from "react";
import {SafeAreaView, Text} from 'react-native';
import {Link, router, Stack, useRouter} from "expo-router";
import {COLORS} from "../constants";
import {
    AlertDialog,
    Avatar,
    Box,
    Button,
    Center,
    CheckIcon,
    Fab,
    Flex,
    FormControl,
    Heading, HStack,
    Icon,
    IconButton,
    Input,
    Menu,
    Modal,
    Pressable,
    ScrollView,
    Select,
    Spinner,
    TextArea,
    Toast,
    useColorMode,
    VStack
} from "native-base";
import {AntDesign, Entypo, MaterialIcons} from "@expo/vector-icons";
import {useAuth} from "../context/ContextProvider";
import Note from "../components/home/welcome/Note";
import SecureStore from "@react-native-async-storage/async-storage/src";
import CategoriesBar from "../components/home/welcome/categoriesBar";
import axiosClient from "../axios-client";
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";


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
    const [deletedTodo, setDeletedTodo] = useState([]);
    const [error, setError] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [date, setDate] = useState(new Date(1598051730000));

    const onChange = (event, selectedDate) => {
        setDate(selectedDate);
    };



    useEffect(() => {
        getCategories()
        getTodos()
    }, []);

    const logout = async () => {
        setToken(null)
        setUser()

    };
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => setIsOpen(false);


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
                console.log(todos)

            })
            .catch(() => {
                setLoading(false)
                errorMessage("Failed to get the Notes, Check your internet Connection")
            });
    };


    const deleteTodo = (id) => {
        console.log(`the id is ` + id  );
        axiosClient.delete("/todos/" + id)
            .then(() => {
                onClose();
                getTodos();
            }).catch(()=>{
            errorMessage("Failed to Delete The Note")
        });

    };




    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };







    const errorMessage = (title) =>{
        Toast.show({
            title: title,
            placement: "top"
        })
    }

    const getCategories = () => {
        axiosClient
            .get(`/todoCategories`)
            .then(({ data }) => {

                setCategories(data)
                setCategoriesBar(data.data)

            })
            .catch((error) => {
                errorMessage("Failed to get the Categories, Check you internet connetion")

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
                                <Menu.Item onPress={()=>{router.push('/userProfile')}}>Profile</Menu.Item>
                                <Menu.Item onPress={logout}>Logout</Menu.Item>

                            </Menu>

                    ),
                    headerTitle: ""
                }}

            />


                <VStack safeArea  space={2.5} w="100%" px="4" bg={colorMode === "dark" ? "coolGray.800" : "warmGray.50"} paddingTop="16">
                    <AlertDialog leastDestructiveRef={""} isOpen={isOpen} onClose={onClose}>
                        <AlertDialog.Content>
                            <AlertDialog.CloseButton />
                            <AlertDialog.Header>Delete Customer</AlertDialog.Header>
                            <AlertDialog.Body>
                                This will remove all data relating to Alex. This action cannot be
                                reversed. Deleted data can not be recovered.
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button.Group space={2}>
                                    <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} >
                                        Cancel
                                    </Button>
                                    <Button colorScheme="danger" onPress={()=>{
                                        deleteTodo(deletedTodo)
                                        onClose();

                                    }}>

                                        Delete
                                    </Button>
                                </Button.Group>
                            </AlertDialog.Footer>
                        </AlertDialog.Content>
                    </AlertDialog>



                    <Heading >
                        <Text>Welcome Back {userName} </Text>


                    </Heading>
                    <CategoriesBar categories={categories}></CategoriesBar>


                        <ScrollView
                            h='95%'
                        >
                            <VStack space="6" h="90%" >
                                {isLoading ? ( // Us1 a conditional statement to render based on loading state
                                    <Box alignItems="center">
                                        <Box marginTop="24">
                                            <Spinner size="5xl" />
                                        </Box>

                                    </Box>
                                ) : (
                                    todos.length  ?
                                        ( // Use a conditional statement to render based on loading state


                                                    todos.map((todo) => (
                                                        <Flex>
                                                            <Pressable onPress={() => {
                                                                setModalVisible(!modalVisible);
                                                                setSelectedTodo(todo)
                                                                console.log(selectedTodo)

                                                            }} rounded="8" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg={colorMode === "dark" ? "coolGray.900" : "warmGray.50"} p="5">
                                                                <Note todo={todo}></Note>
                                                            </Pressable>
                                                            <IconButton onPress={() => {
                                                                setDeletedTodo(todo.id)
                                                                setIsOpen(!isOpen)
                                                            }} colorScheme="red"  variant="ghost" _icon={{
                                                                as: AntDesign,
                                                                name: "delete"
                                                            }} />
                                                        </Flex>


                                                    ))


                                        ) :(
                                            <Center>
                                                <Center _text={{
                                                    color: "primary.400",

                                                }} height="500" width="500">
                                                    <Box alignItems="center">

                                                        <IconButton icon={<Icon as={Entypo} name="plus" />} onPress={()=>{router.push('/newNote')}} borderRadius="full" _icon={{
                                                            color: "primary.500",
                                                            size: "6xl"
                                                        }} _hover={{
                                                            bg: "orange.600:alpha.20"
                                                        }} _pressed={{
                                                            bg: "primary.600:alpha.20",
                                                            _icon: {
                                                                name: "plus"
                                                            },

                                                        }} />
                                                        <Heading color="primary.500">
                                                            New Note
                                                        </Heading>
                                                    </Box>
                                                </Center>
                                            </Center>
                                        )


                                )}
                            </VStack>


                        </ScrollView>



                </VStack >
            <Fab renderInPortal={false} onPress={()=>{router.push('/newNote')}} shadow={2} size="sm" icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />} />


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
                            <SafeAreaView>
                                  <Text>selected: {date.toLocaleString()}</Text>
                            </SafeAreaView>
                            <Input onFocus={showDatepicker}  Value={selectedTodo ? selectedTodo.todoDate : ''}/>
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

        </SafeAreaView>
    )
}


export default Home;