import {useRef, useState} from "react";
import {View, Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {Link, Stack, useRouter} from "expo-router";
import {COLORS, icons,images,SIZES} from "../constants";
import {Nearbyjobs ,Popularjobs,ScreenHeaderBtn,Welcome} from '../components'
import {
    Avatar, Badge,
    Box,
    Button,
    Flex,
    FormControl,
    Heading,
    HStack,
    Icon,
    Input, Modal, Pressable, Spacer,
    VStack,
    WarningOutlineIcon
} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";
import styles from "../components/home/welcome/welcome.style";






const Home = () =>{

    //Modal
    const [modalVisible, setModalVisible] = useState(false);
    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const jobTypes = ["Full-Time", "Part-Time", "Student-Job",]
    const router = useRouter();
    const [activeJobType ,setActiveJobType] = useState('Full-Time')
    return(
        <SafeAreaView style={{flex:1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerLeft:()=>(
                        <ScreenHeaderBtn iconUrl={icons.profile} dimension="100%" />
                    ),
                    headerRight:()=>(
                        <Avatar marginRight="4" bg="amber.500" source={{
                            uri: "https://bit.ly/broken-link"
                        }}>
                            MR
                        </Avatar>
                    ),
                    headerTitle: ""
                }}
            />


                <VStack  space={2.5} w="100%" px="4">

                    <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
                        <Modal.Content>
                            <Modal.CloseButton />
                            <Modal.Header>Contact Us</Modal.Header>
                            <Modal.Body>
                                <FormControl>
                                    <FormControl.Label>Name</FormControl.Label>
                                    <Input ref={initialRef} />
                                </FormControl>
                                <FormControl mt="3">
                                    <FormControl.Label>Email</FormControl.Label>
                                    <Input />
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

                    <Heading >
                        <Text>Welome Back Hamza</Text>
                    </Heading>
                    <Input variant="rounded" w={{
                        base: "100%",
                        md: "25%"
                    }} InputRightElement={<Icon as={<MaterialIcons name="search" />} size={5} mr="2" color="muted.400" />} placeholder="Name" />
                    <FlatList  data={jobTypes}
                               renderItem={({item}) => (
                                   <TouchableOpacity
                                       style={styles.tab(activeJobType , item)}
                                       onPress={()=>{
                                           setActiveJobType(item);
                                           router.push(`/search/${item}`)
                                       }}
                                   >
                                       <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
                                   </TouchableOpacity>
                               )}
                               keyExtractor={item => item}
                               contentContainerStyle={{columnGap:SIZES.small}}
                               horizontal
                    />

                    <ScrollView
                        contentContainerStyle={{ width: '100%' }}
                        showsVerticalScrollIndicator={false}
                    >
                        <VStack space={4}  px="4">
                            <Pressable onPress={() => {
                                setModalVisible(!modalVisible);
                            }} rounded="8" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg="coolGray.100" p="5">
                                <Box>
                                    <HStack alignItems="center">
                                        <Badge colorScheme="darkBlue" _text={{
                                            color: "white"
                                        }} variant="solid" rounded="4">
                                            Business
                                        </Badge>
                                        <Spacer />
                                        <Text fontSize={10} color="coolGray.800">
                                            1 month ago
                                        </Text>
                                    </HStack>
                                    <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                                        Marketing License
                                    </Text>
                                    <Text mt="2" fontSize="sm" color="coolGray.700">
                                        Unlock powerfull time-saving tools for creating email delivery and
                                        collecting marketing data
                                    </Text>
                                    <Flex>
                                        <Text mt="2" fontSize={12} fontWeight="medium" color="darkBlue.600">
                                            Read More
                                        </Text>
                                    </Flex>
                                </Box>
                            </Pressable>
                            <Pressable onPress={() => {
                                setModalVisible(!modalVisible);
                            }} rounded="8" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg="coolGray.100" p="5">
                                <Box>
                                    <HStack alignItems="center">
                                        <Badge colorScheme="darkBlue" _text={{
                                            color: "white"
                                        }} variant="solid" rounded="4">
                                            Business
                                        </Badge>
                                        <Spacer />
                                        <Text fontSize={10} color="coolGray.800">
                                            1 month ago
                                        </Text>
                                    </HStack>
                                    <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                                        Marketing License
                                    </Text>
                                    <Text mt="2" fontSize="sm" color="coolGray.700">
                                        Unlock powerfull time-saving tools for creating email delivery and
                                        collecting marketing data
                                    </Text>
                                    <Flex>
                                        <Text mt="2" fontSize={12} fontWeight="medium" color="darkBlue.600">
                                            Read More
                                        </Text>
                                    </Flex>
                                </Box>
                            </Pressable>

                        </VStack>






                    </ScrollView>



                </VStack >

        </SafeAreaView>
    )
}


export default Home;