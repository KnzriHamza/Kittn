import { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import {
    Badge,
    Box,
    Button,
    Center,
    Checkbox,
    CheckIcon,
    Flex,
    FormControl,
    HStack,
    Icon,
    Input,
    Modal,
    Pressable,
    Select,
    Skeleton,
    Spacer,
    Spinner,
    TextArea,
    Text,
    useColorMode,
    VStack,
    Switch,
} from "native-base";
import axiosClient from "../../../axios-client";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import categories from "../../../(mainScreen)/categories";

const Note = ({ todo }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const router = useRouter();
    const [done, setDone] = useState(todo.todoDone);

    const setTodoDone = (newStatus) => {
        const payload = {
            todoDone: newStatus,
        };
        axiosClient
            .put("/todos/" + todo.id, payload)
            .then(function (response) {
                setDone(newStatus);
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <Center w="100%">
            <HStack
                w="100%"
                maxW="400"
                borderWidth="0"
                space={8}
                rounded="md"
                _dark={{
                    borderColor: todo.categoryColor + ".500",
                }}
                _light={{
                    borderColor: todo.categoryColor + ".500",
                }}
                p="4"
            >
                <VStack flex="1" space="2">
                    <Box
                        padding="2"
                        borderWidth="0"
                        bgColor={todo.categoryColor + ".500"}
                        rounded="md"
                    >
                        <Text fontSize="md" bold color="white">
                            {todo.todoTitle}
                        </Text>
                    </Box>
                    <Text>{todo.todoDate}</Text>
                    <HStack space="2" alignItems="center">
                        <Box
                            size="5"
                            rounded="full"
                            bgColor={todo.categoryColor + ".500"}
                        />
                        <Text fontSize="md">{todo.categoryName}</Text>
                        <Spacer></Spacer>
                        <Switch
                            onToggle={() => setTodoDone(done == 0 ? 1 : 0)}
                            isChecked={done == 1}
                            offTrackColor={todo.categoryColor + ".100"}
                            onTrackColor={todo.categoryColor + ".200"}
                            onThumbColor={todo.categoryColor + ".500"}
                            offThumbColor={todo.categoryColor + ".50"}
                        />
                    </HStack>
                    <Box startColor="amber.300">
                        <Text fontSize="md">{todo.todoMessage}</Text>
                    </Box>
                </VStack>
            </HStack>
        </Center>
    );
};

export default Note;
