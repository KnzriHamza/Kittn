import React, {useState} from 'react'
import { View, Text } from 'react-native'

import {
    Box,
    Radio,
    CheckIcon,
    Divider,
    FormControl,
    Heading,
    Input,
    Modal,
    Select,
    TextArea,
    VStack, IconButton, HStack, Flex, Checkbox, Container, Button, Center
} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import axiosClient from "../../axios-client";

const AddCategory = () => {
    const [newCategory, setNewCategory] = useState({
        categoryTitle: '', // Initialize to an empty string
        categoryColor: '', // Initialize to an empty string
        categoryIcon: '', // Initialize to an empty string
    });

    const handleCategoryIconChange = (text) => {
        // Update the categoryTitle when the input changes
        setNewCategory((prevState) => ({
            ...prevState,
            categoryIcon: text,
        }));
    };
    const handleCategoryTitleChange = (text) => {
        // Update the categoryTitle when the input changes
        setNewCategory((prevState) => ({
            ...prevState,
            categoryTitle: text,
        }));
    };


    const handleCategoryColorChange = (color) => {
        // Update the categoryColor when a radio button is selected
        setNewCategory((prevState) => ({
            ...prevState,
            categoryColor: color,
        }));
    };

    const submitNewCategory = () => {
        // Access newCategory to get the category title and color
        const payload = {
            categoryName: newCategory.categoryTitle,
            categoryColor: newCategory.categoryColor,
            categoryIcon: newCategory.categoryIcon,

        };
        axiosClient
            .post("/todoCategories", payload)
            .then(() => {
                console.log("successful")
            })
            .catch(function (error) {
                console.log(error);
            });

        console.log('New Category:', newCategory);
    };

    return (
        <Box width="100%">
            <Box  rounded="8" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg="coolGray.100" p="5">
                <VStack space="6" width="100%">
                    <Heading size="md">Add a new Note</Heading>
                    <Divider   />
                    <FormControl>
                        <FormControl.Label>Category name</FormControl.Label>
                        <Input onChangeText={handleCategoryTitleChange} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Select a Color</FormControl.Label>
                        <Container>
                            <VStack space="8" alignItems="center">
                                <Radio.Group>
                                    <HStack alignItems="center" space="6" width="100%">
                                        {['red', 'green', 'fuchsia', 'yellow', 'orange', 'indigo', 'black'].map(
                                            (variant) => (
                                                <Radio
                                                    colorScheme={variant}
                                                    borderColor={variant}
                                                    value={variant}
                                                    key={variant}
                                                    onPress={() => handleCategoryColorChange(variant)}
                                                >
                                                </Radio>
                                            )
                                        )}
                                    </HStack>
                                </Radio.Group>
                            </VStack>
                        </Container>
                    </FormControl>

                    <FormControl>
                        <FormControl.Label>Select an Icon</FormControl.Label>
                        <Center>
                            <VStack space="3">
                                <HStack space={4} alignItems="center">
                                    {[

                                        'stepbackward',
                                        'forward',
                                        'banckward',
                                        'caretright',
                                        'caretleft',
                                        'caretdown',
                                    ].map(variant => <IconButton onPress={() => handleCategoryIconChange(variant)} colorScheme="indigo" key={variant} variant="outline" _icon={{
                                        as: AntDesign,
                                        name: variant
                                    }} />)}
                                </HStack>
                                <HStack space={4} alignItems="center">
                                    {[
                                        'link',
                                        'form',
                                        'picture',
                                        'table',
                                        'filter',
                                        'stepforward',
                                    ].map(variant => <IconButton onPress={() => handleCategoryIconChange(variant)} colorScheme="indigo" key={variant} variant="outline" _icon={{
                                        as: AntDesign,
                                        name: variant
                                    }} />)}
                                </HStack>
                            </VStack>
                        </Center>
                    </FormControl>
                    <FormControl>
                        {/* ... (your existing JSX) */}
                        <Button onPress={submitNewCategory}>Create a Category</Button>
                    </FormControl>
                </VStack>
            </Box>
        </Box>
    )
}

export default AddCategory