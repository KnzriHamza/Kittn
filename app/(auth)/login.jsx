import { Link } from "expo-router";
import {View, Text, Button, TextInput} from "react-native";
import { useAuth } from "../context/ContextProvider";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../components/home/welcome/welcome.style";
export default function Login() {
    const { setUser } = useAuth();

    const login = () => {
        setUser({
            name: "John Doe",
        });
    }
    const toRegister = ({navigation}) => {
        navigation.navigate('Details')
    }

    return (
        <View>
            <View >
                <TouchableOpacity onPress={login}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
            <View >
                <TouchableOpacity style={styles.Btn} onPress={()=>{}}>
                    <Text>ttttt</Text>
                </TouchableOpacity>
            </View>

        </View>


    );
}