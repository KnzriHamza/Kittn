import React, { useEffect, useState } from "react";

import {
  Text,
  Box,
  Radio,
  CheckIcon,
  Divider,
  FormControl,
  Heading,
  Input,
  Link,
  Select,
  TextArea,
  VStack,
  IconButton,
  HStack,
  Flex,
  Checkbox,
  Container,
  Button,
  Center,
  Alert,
  Slide,
  Spinner,
  Spacer,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import axiosClient from "../../axios-client";
import PopUpSlide from "./cards/popUpSlide";
import { router } from "expo-router";

const AddCategory = () => {
  const [isOpenTop, setIsOpenTop] = useState(false);
  const [isLoading, SetIsLoading] = useState(false);
  const [buttonLoading, SetButtonLoading] = useState(false);
  const [slideType, SetSlideType] = useState("");
  const [errorForm, setErrorForm] = useState("");

  const [newCategory, setNewCategory] = useState({
    categoryTitle: "", // Initialize to an empty string
    categoryColor: "", // Initialize to an empty string
    categoryIcon: "", // Initialize to an empty string
  });

  const setPopUp = () => {
    setIsOpenTop(true);
    setTimeout(() => {
      setIsOpenTop(false);
    }, 4500);
  };

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

  const resetForm = () => {
    console.log("testt");
    handleCategoryTitleChange("");
    handleCategoryColorChange("");
    handleCategoryIconChange("");
    setNewCategory({
      categoryTitle: "",
      categoryColor: "",
      categoryIcon: "",
    });
  };

  const submitNewCategory = () => {
    SetButtonLoading(true);
    // Access newCategory to get the category title and color
    const payload = {
      categoryName: newCategory.categoryTitle,
      categoryColor: newCategory.categoryColor,
      categoryIcon: newCategory.categoryIcon,
    };

    if (
      payload.categoryName === "" ||
      payload.categoryColor === "" ||
      payload.categoryIcon === ""
    ) {
      setErrorForm("Please fill all the inputs");
      SetButtonLoading(false);
      return;
    }

    axiosClient
      .post("/todoCategories", payload)
      .then(() => {
        SetSlideType("success");
        setPopUp();
        SetButtonLoading(false);
        resetForm();
        router.push("/categories");
      })
      .catch(function (error) {
        SetSlideType("error");
        setPopUp();
        SetButtonLoading(false);
        console.log(error);
      });

    console.log("New Category:", newCategory);
  };

  return (
    <Box width="100%">
      <PopUpSlide isOpenTop={isOpenTop} slideType={slideType}></PopUpSlide>
      <Box
        rounded="8"
        overflow="hidden"
        borderWidth="1"
        borderColor="coolGray.300"
        maxW="96"
        shadow="3"
        bg="coolGray.100"
        p="5"
      >
        <VStack space="6" width="100%">
          <Heading size="md">Add a Category</Heading>
          <Divider />
          <HStack>
            <Text color="red.500">Tessf</Text>
            <Spacer></Spacer>
            <Link
              _text={{
                fontSize: "md",
              }}
              href=""
              onPress={resetForm}
              isUnderlined
            >
              Clear Form
            </Link>
          </HStack>

          <FormControl>
            <FormControl.Label>Category name *</FormControl.Label>
            <Input
              isRequired
              onChangeText={handleCategoryTitleChange}
              defaultValue={newCategory.categoryTitle}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Select a Color *</FormControl.Label>
            <Container>
              <VStack space="8" alignItems="center">
                <Radio.Group>
                  <HStack alignItems="center" space="4" width="100%">
                    {[
                      "red",
                      "green",
                      "fuchsia",
                      "yellow",
                      "orange",
                      "indigo",
                      "black",
                    ].map((variant) => (
                      <Box
                        key={variant}
                        padding="1"
                        borderWidth="2"
                        borderColor={variant + ".500"}
                      >
                        <Radio
                          size="md"
                          colorScheme={variant}
                          borderColor={variant}
                          value={variant}
                          key={variant}
                          onPress={() => handleCategoryColorChange(variant)}
                        ></Radio>
                      </Box>
                    ))}
                  </HStack>
                </Radio.Group>
              </VStack>
            </Container>
          </FormControl>

          <FormControl>
            <FormControl.Label>Select an Icon *</FormControl.Label>
            <Center>
              <VStack space="3">
                <HStack space={4} alignItems="center">
                  {[
                    "stepbackward",
                    "forward",
                    "banckward",
                    "caretright",
                    "caretleft",
                    "caretdown",
                  ].map((variant) => (
                    <IconButton
                      onPress={() => handleCategoryIconChange(variant)}
                      colorScheme="indigo"
                      key={variant}
                      variant="outline"
                      _icon={{
                        as: AntDesign,
                        name: variant,
                      }}
                    />
                  ))}
                </HStack>
                <HStack space={4} alignItems="center">
                  {[
                    "link",
                    "form",
                    "picture",
                    "table",
                    "filter",
                    "stepforward",
                  ].map((variant) => (
                    <IconButton
                      onPress={() => handleCategoryIconChange(variant)}
                      colorScheme="indigo"
                      key={variant}
                      variant="outline"
                      _icon={{
                        as: AntDesign,
                        name: variant,
                      }}
                    />
                  ))}
                </HStack>
              </VStack>
            </Center>
          </FormControl>
          <FormControl>
            {/* ... (your existing JSX) */}
            <Button onPress={submitNewCategory} disabled={buttonLoading}>
              {buttonLoading ? (
                <HStack space={2} justifyContent="center">
                  <Spinner accessibilityLabel="Loading posts" />
                  <Heading color="primary.500" fontSize="md">
                    Loading
                  </Heading>
                </HStack>
              ) : (
                "Create a Category"
              )}
            </Button>
          </FormControl>
        </VStack>
      </Box>
    </Box>
  );
};

export default AddCategory;
