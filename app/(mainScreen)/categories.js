import { useEffect, useRef, useState } from "react";
import { SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import { COLORS, SIZES } from "../constants";
import {
  Avatar,
  Badge,
  Box,
  Button,
  CheckIcon,
  Fab,
  Container,
  Radio,
  Flex,
  FormControl,
  ScrollView,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Menu,
  Modal,
  Pressable,
  Select,
  Spacer,
  TextArea,
  useColorMode,
  useDisclose,
  VStack,
  Text,
  Divider,
  Center,
  Skeleton,
  AlertDialog,
} from "native-base";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/ContextProvider";
import axiosClient from "../axios-client";

const Categories = () => {
  //Modal
  const [modalVisible, setModalVisible] = useState(false);

  const { user, token, setUser, setToken } = useAuth();

  const router = useRouter();
  const { colorMode } = useColorMode();
  const userName = user ? user.name : "";
  const [initials, setInitials] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState();
  const cancelRef = useRef();

  const logout = async () => {
    setToken(null);
    setUser();
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    axiosClient
      .get(`/todoCategories`)
      .then(({ data }) => {
        setCategories(data.data);
        console.error(categories);
      })
      .catch(() => {
        console.log("route errors");
      });
  };

  const deleteCategory = (id) => {
    console.log(`the id is ` + id);
    axiosClient
      .delete("/todoCategories/" + id)
      .then(() => {
        console.log("deleted");
        getCategories();
        setIsOpen(!isOpen);
      })
      .catch();
  };

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <IconButton
              marginLeft="4"
              size={"md"}
              variant="solid"
              _icon={{
                as: MaterialIcons,
                name: "menu",
              }}
            />
          ),
          headerRight: () => (
            <Menu
              w="190"
              trigger={(triggerProps) => {
                return (
                  <Pressable
                    accessibilityLabel="More options menu"
                    {...triggerProps}
                  >
                    <Avatar
                      marginRight="4"
                      bg="amber.500"
                      source={{
                        uri: "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png",
                      }}
                    >
                      {initials}
                    </Avatar>
                  </Pressable>
                );
              }}
            >
              <Menu.Item
                onPress={() => {
                  router.push("/userProfile");
                }}
              >
                Profile
              </Menu.Item>
              <Menu.Item onPress={logout}>Logout</Menu.Item>
            </Menu>
          ),
          headerTitle: "",
        }}
      />

      <VStack
        safeArea
        space={2.5}
        w="100%"
        px="4"
        bg={colorMode === "dark" ? "coolGray.800" : "warmGray.50"}
        paddingTop="16"
      >
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Delete Category</AlertDialog.Header>
            <AlertDialog.Body>
              This will delete the category. This action cannot be reversed.
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="danger"
                  onPress={() => {
                    console.log(activeCategory);
                    deleteCategory(activeCategory);
                    onClose();
                  }}
                >
                  Delete
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>

        <Heading>
          <Text>Categories</Text>
        </Heading>

        <ScrollView height="90%">
          <VStack space="6">
            {categories.map((item) => (
              <Center key={item.id} w="100%">
                <HStack
                  w="100%"
                  maxW="400"
                  borderWidth="0.5"
                  space={8}
                  rounded="md"
                  _dark={{
                    borderColor: item.categoryColor + ".500",
                  }}
                  _light={{
                    borderColor: item.categoryColor + ".500",
                  }}
                  p="4"
                >
                  <Icon
                    as={AntDesign}
                    name={item.categoryIcon}
                    color="coolGray.300"
                    size="24"
                    _dark={{
                      color: "warmGray.50",
                    }}
                  />
                  <VStack flex="3" space="4">
                    <Box
                      padding="2"
                      borderWidth="0"
                      bgColor={item.categoryColor + ".500"}
                      rounded="md"
                    >
                      <Text
                        bold
                        color="white"
                        textAlign="left"
                        paddingLeft="4"
                        fontSize="sm"
                      >
                        {item.categoryName}
                      </Text>
                    </Box>
                    <HStack space="2" alignItems="center">
                      <Box
                        size="5"
                        rounded="full"
                        bgColor={item.categoryColor + ".500"}
                      />
                      <Text>{item.todos_count}</Text>
                      <Text>Notes Linked</Text>
                    </HStack>
                    <HStack alignContent="left" space={4} alignItems="center">
                      <Spacer />

                      <IconButton
                        onPress={() => {
                          setActiveCategory(item.id);
                          setIsOpen(!isOpen);
                        }}
                        colorScheme={item.categoryColor}
                        variant="ghost"
                        _icon={{
                          as: AntDesign,
                          name: "delete",
                        }}
                      />
                    </HStack>
                  </VStack>
                </HStack>
              </Center>
            ))}
          </VStack>
        </ScrollView>
      </VStack>
      <Fab
        renderInPortal={false}
        onPress={() => {
          router.push("/newCategory");
        }}
        shadow={2}
        size="sm"
        icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
      />
    </SafeAreaView>
  );
};

export default Categories;
