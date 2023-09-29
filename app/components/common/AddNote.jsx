import React, {useEffect, useState} from 'react'
import {ScrollView} from 'react-native'

import {
    Box,
    Button,
    CheckIcon,
    Divider,
    FormControl,
    Heading,
    HStack,
    Input,
    Select,
    Spinner, Text,
    TextArea,
    VStack
} from "native-base";
import axiosClient from "../../axios-client";
import PopUpSlide from "./cards/popUpSlide";
import {useRouter} from "expo-router";
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";

const AddNote = () => {
    const [isOpenTop, setIsOpenTop] = useState(false);
    const [isLoading, SetIsLoading] = useState(false);
    const [buttonLoading, SetButtonLoading] = useState(false);
    const [slideType, SetSlideType] = useState("")
    const [errorForm, setErrorForm] = useState("");

    const [categories, setCategories] = useState([]);


    const [newNote, setNewNote] = useState({
        title: '', // Initialize to an empty string
        description: '', // Initialize to an empty string
        category: 0, // Initialize to an empty string
        dueDate: "",
        priority:""
    });
    const [date, setDate] = useState(new Date(1598051730000));
    const [formattedTime, setFormattedTime] = useState("HH:MM")
    const [formattedDate, setFormattedDate] = useState("DD-MM-YY")
    const onChange = (event, selectedDate) => {
        setDate(selectedDate);
    };
    useEffect(() => {
        getCategories()

    }, []);





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

    const showTimepicker = () => {
        showMode('time');
    };


    const setPopUp = () => {
        setIsOpenTop(true);
        setTimeout(() => {
            setIsOpenTop(false);
        }, 4500);
    };



    const getCategories = () => {
        axiosClient
            .get(`/todoCategories`)
            .then(({ data }) => {
                setCategories(data.data)
            })
            .catch(() => {
                console.log("route errors")
            });
    };








        const reformatDate = (value) => {
            if (value.getHours()<10){
                setFormattedTime( "0"+value.getHours()+":"+value.getMinutes())
            }else {
                setFormattedTime( value.getHours()+":"+value.getMinutes())
            }
            console.log(value.getHours())
            setFormattedDate(value.getFullYear()+"-"+value.getMonth()+"-"+value.getDate())



    };
        // Function to decompose and reformat the date
    useEffect(() => {
        reformatDate(date)


    }, [date]);



    const router = useRouter();


    const onNewNoteSubmit = () => {


        //SetButtonLoading(true)
        // Access newCategory to get the category title and color


        const payload = {
            todoTitle: newNote.title,
            todoMessage: newNote.description,
            //todoDate: selectedDatetime.format("YYYY-MM-DD HH:mm:d"),
            todoDate: formattedDate+" "+formattedTime ,
            todoPriority: newNote.priority,
            category_id: newNote.category,

        };

        if (payload.todoTitle === '' || payload.todoMessage === '' || payload.todoDate === '' || payload.todoPriority === '' || payload.category_id === '') {
            setErrorForm('Please fill all the inputs');
            SetButtonLoading(false)
            return;
        }

        console.log(payload)
        axiosClient
            .post("/todos", payload)
            .then(() => {
                SetSlideType("success")
                setPopUp()
                SetButtonLoading(false)
                router.push('/');
            })
            .catch(function (error) {
                SetSlideType("error")
                setPopUp()
                SetButtonLoading(false)
                console.log(error);
            });

    };

    return (

        <ScrollView>
            <Box width="100%">
                <PopUpSlide isOpenTop={isOpenTop} slideType={slideType}></PopUpSlide>
                <Box  rounded="8" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg="coolGray.100" p="5">
                    <VStack space="3" width="100%">
                        <Heading size="md">Add a New Note</Heading>
                        <Divider   />
                        <Text color="red.500">{errorForm}</Text>
                        <FormControl>
                            <FormControl.Label>Note Title</FormControl.Label>
                            <Input flex={1} onChangeText={newTitle =>setNewNote((prevState) => ({
                                ...prevState,
                                title: newTitle,
                            }

                            ))}
                                   value={newNote.title}  placeholder="Add Task" />

                        </FormControl>
                        <FormControl mt="3">
                            <FormControl.Label>Note Description</FormControl.Label>

                            <TextArea width="100%" // for android and ios
                                      w="100%" onChangeText={newDescription =>setNewNote((prevState) => ({
                                ...prevState,
                                description: newDescription,
                            }))} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Note Categorie</FormControl.Label>
                            <Box>
                                <Select
                                    onValueChange={newCategory => {

                                        setNewNote((prevState) => ({
                                            ...prevState,
                                            category: newCategory,
                                        }))

                                    }}
                                    minWidth="200"
                                    accessibilityLabel="Choose Service"
                                    placeholder="Choose Service"
                                    _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5"   />
                                }} mt={1} >
                                    <Select.Item label="Uncategorized" value="0" />
                                    {categories.map((item) => (
                                        <Select.Item label={item.categoryName} value={item.id} />
                                    ))}
                                </Select>
                            </Box>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Due Date</FormControl.Label>
                            <HStack space="2">
                                <Input width="75%" value={formattedDate} placeholder={formattedDate} onFocus={showDatepicker} />
                                <Input width="25%" value={formattedTime} placeholder={formattedTime}  onFocus={showTimepicker} />
                            </HStack>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Priority</FormControl.Label>
                            <Select
                                onValueChange={newPriority => {
                                    console.log('Selected prio:', newPriority);
                                    setNewNote((prevState) => ({
                                        ...prevState,
                                        priority: newPriority,
                                    }))
                                }}
                                minWidth="200"
                                accessibilityLabel="Choose Service"
                                placeholder="Choose Service"
                                _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5"/>
                            }} mt={1} >
                                <Select.Item label="Lowest" value="Lowest" />
                                <Select.Item label="Low" value="Low" />
                                <Select.Item label="Medium" value="Medium" />
                                <Select.Item label="High" value="High" />
                                <Select.Item label="Highest" value="Highest" />
                            </Select>
                        </FormControl>
                        <FormControl>
                            {/* ... (your existing JSX) */}
                            <Button onPress={onNewNoteSubmit} disabled={buttonLoading}>
                                {buttonLoading ? (
                                    <HStack space={2} justifyContent="center">
                                        <Spinner accessibilityLabel="Loading posts" />
                                        <Heading color="primary.500" fontSize="md">
                                            Loading
                                        </Heading>
                                    </HStack>
                                ) : (
                                    'Create a Note'
                                )}
                            </Button>


                        </FormControl>
                    </VStack>
                </Box>
            </Box>
        </ScrollView>
    )
}

export default AddNote