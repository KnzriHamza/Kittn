import {View, SafeAreaView, ScrollView} from 'react-native';
import {Stack, useRouter} from "expo-router";
import {COLORS, icons,images,SIZES} from "../constants";
import {ScreenHeaderBtn,Welcome} from '../components'

const Home = () =>{
    const router = useRouter();

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
                        <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
                    ),
                    headerTitle: ""
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    flex: 1,
                    padding :SIZES.medium
                }}>
                    <Welcome></Welcome>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


export default Home;