import {useEffect, useState} from 'react'
import {FlatList, ScrollView, Text} from 'react-native'
import {useRouter} from "expo-router";
import {
    Badge,
    Box,
    Button, Checkbox,
    Flex,
    FormControl,
    HStack, Input,
    Modal,
    Pressable,
    Spacer,
    Spinner, TextArea,
    useColorMode,
    VStack
} from "native-base";
import axiosClient from "../../../axios-client";
import styles from "./welcome.style";
import {SIZES} from "../../../constants";
const jobTypes = ["Full-Time", "Part-Time", "Student-Job",]

const Note = ({todo }) => {
    const {
        colorMode,
        toggleColorMode
    } = useColorMode();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false)
    const [todayTodos, setTodayTodos] = useState([]);
    const [selectedTodo, setSelectedTodo] = useState(null); // Store the selected todo

    const setModal = () => {

    };
    useEffect(() => {
        setModal();
        getTodos();
    }, []);

    //When the presssable is pressed without the use effect it takes two presses to change, thereS a one press latency

    useEffect(() => {
        console.log(selectedTodo)
    }, [selectedTodo]);

    const getTodos = (sort_by = "todoDone", order_by = "asc") => {
        axiosClient
            .get(`/todos?sort_by=todoDone&order_by=asc`)
            .then(({ data }) => {
                setTodayTodos(data.data);
                setLoading(false)
            })
            .catch(() => {
            });
    };




    return <ScrollView
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
                        <Input  defaultValue={selectedTodo ? selectedTodo.todoTitle : ''}/>
                    </FormControl>
                    <FormControl mt="3">
                        <FormControl.Label>Todo Description</FormControl.Label>

                        <TextArea width="100%" defaultValue={selectedTodo ? selectedTodo.todoMessage : ''} onChange={e => setTextAreaValue(e.currentTarget.value)} // for web
                                  onChangeText={text => setTextAreaValue(text)} // for android and ios
                                  w="100%" maxW="300" />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Todo Categorie</FormControl.Label>
                        <Input  defaultValue={selectedTodo ? selectedTodo.categoryName : ''}/>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Due Date</FormControl.Label>
                        <Input  defaultValue={selectedTodo ? selectedTodo.todoDate : ''}/>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Priority</FormControl.Label>
                        <Input  defaultValue={selectedTodo ? selectedTodo.todoPriority : ''}/>
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
                        }}>
                            Save
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
            {loading ? ( // Use a conditional statement to render based on loading state
                 <VStack space={8} justifyContent="center">
        <Spinner color="emerald.500" />
        <Spinner color="warning.500" />
        <Spinner color="indigo.500" />
        <Spinner color="cyan.500" />
    </VStack>
            ) : (
                <VStack space={4}  px="4" bg={colorMode === "dark" ? "coolGray.800" : "warmGray.50"}>

                {todayTodos.map((item) => (

                        <Pressable onPress={() => {
                            setModalVisible(!modalVisible);
                            setSelectedTodo(item);

                        }} rounded="8" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg={colorMode === "dark" ? "coolGray.900" : "warmGray.50"} p="5">
                            <VStack  space={1.5} bg={colorMode === "dark" ? "coolGray.900" : "warmGray.50"}>
                                <HStack  alignItems="center" >
                                    <Badge colorScheme={item.categoryColor} _text={{
                                        color: "white"
                                    }} variant="solid" rounded="4">
                                        {item.todoTitle}
                                    </Badge>
                                    <Spacer />
                                    <Checkbox value="red" size="lg" defaultIsChecked={item.todoDone === 1 || item.todoDone === null}>

                                    </Checkbox>
                                </HStack>
                                <Text underline color={colorMode === "dark" ? "coolGray.900" : "warmGray.50"} mt="3" fontWeight="medium" fontSize="xl">
                                    {item.categoryName}
                                </Text>

                                <Text isTruncated  mt="2" fontSize="sm" color={colorMode === "dark" ? "coolGray.900" : "warmGray.50"}>
                                    {item.todoMessage}
                                </Text>
                                <Flex bg={colorMode === "dark" ? "coolGray.800" : "warmGray.50"}>
                                    <Text mt="2" fontSize={12} fontWeight="medium" >
                                        Read More
                                    </Text>
                                </Flex>
                            </VStack>
                        </Pressable>

                    ))}
                </VStack>
            )}


    </ScrollView>





}





export default Note