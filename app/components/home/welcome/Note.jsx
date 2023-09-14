import {useEffect, useState} from 'react'
import {FlatList, ScrollView, Text} from 'react-native'
import {useRouter} from "expo-router";
import {
    Badge,
    Box,
    Button, Checkbox, CheckIcon,
    Flex,
    FormControl,
    HStack, Icon, Input,
    Modal,
    Pressable, Select,
    Spacer,
    Spinner, TextArea,
    useColorMode,
    VStack
} from "native-base";
import axiosClient from "../../../axios-client";
import {MaterialCommunityIcons} from "@expo/vector-icons";



const Note = ({ todo } ) => {
    const {
        colorMode,
        toggleColorMode
    } = useColorMode();
    const router = useRouter();

    const [done, setDone] = useState(todo.todoDone);




    const  setTodoDone = () => {
        if(done === 0){
            setDone(1)
        }else{
            setDone(0)
        }

        console.log(done+"       done")
        console.log(todo.todoDone+"       todo.todoDone")




    };




    return <VStack  space={1.5} bg={colorMode === "dark" ? "coolGray.900" : "warmGray.50"}>
        <HStack  aligntodos="center">
            <Badge colorScheme={todo.categoryColor} _text={{
                color: "white"
            }} variant="solid" rounded="4">
                {todo.todoTitle}
            </Badge>
            <Spacer />
            <Checkbox defaultIsChecked={done} _checked={done}   onChange={ setTodoDone }  value={todo.id} colorScheme="dark" size="lg" icon={<Icon as={<MaterialCommunityIcons name="check" />}  /> }/>

        </HStack>
        <Text underline color={colorMode === "dark" ? "coolGray.900" : "warmGray.50"} mt="3" fontWeight="medium" fontSize="xl">
            {todo.categoryName}
        </Text>

        <Text isTruncated  mt="2" fontSize="sm" color={colorMode === "dark" ? "coolGray.900" : "warmGray.50"}>
            {todo.todoMessage}
        </Text>
        <Flex bg={colorMode === "dark" ? "coolGray.800" : "warmGray.50"}>
            <Text mt="2" fontSize={12} fontWeight="medium" >
                Read More
            </Text>
        </Flex>
    </VStack>




}





export default Note