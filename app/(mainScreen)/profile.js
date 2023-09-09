import {useState} from "react";
import {Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {Link, Stack, useRouter} from "expo-router";
import {COLORS} from "../constants";
import {
    Avatar,
    Fab,

    Heading,
    Icon, IconButton,
    Input, Menu,  Pressable, useColorMode, useDisclose,
    VStack
} from "native-base";
import {AntDesign, MaterialIcons} from "@expo/vector-icons";
import {useAuth} from "../context/ContextProvider";
import Note from "../components/home/welcome/Note";
import SecureStore from "@react-native-async-storage/async-storage/src";
import Categories from "../components/home/welcome/Categories";






const Profile = () =>{

    //Modal
    const [modalVisible, setModalVisible] = useState(false);

    const {user,token, setUser, setToken } = useAuth();

    const router = useRouter();
    const {
        colorMode,

    } = useColorMode();
    const userName = user ? user.name : '';
    const [initials, setInitials] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const logout = async () => {
        setToken(null)
        setUser()

    };

    const {
        isOpen,
        onToggle
    }= useDisclose();

    // this line Checks the token in use
    const changeToken = async () => {
        // if i change the token it stays logged in setToken("99|xaaux3YJgy4rNpY4SITxqTfgFl6IVgpxa2143Ne2");
        console.warn("Token Loaded ", token)
        console.error(await SecureStore.getItem('ACCESS_TOKEN'))

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
                <Categories></Categories>

                <Note ></Note>



            </VStack >
            <Fab  shadow={2} size="sm" icon={<Icon color="white" as={AntDesign} name="plus" size="sm" >

            </Icon>} />
        </SafeAreaView>
    )
}


export default Profile;