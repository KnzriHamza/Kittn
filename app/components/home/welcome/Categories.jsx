import {useEffect, useState} from 'react'
import {FlatList} from 'react-native'
import {useRouter} from "expo-router";
import {Box, Button, useColorMode} from "native-base";
import axiosClient from "../../../axios-client";
import {SIZES} from "../../../constants";

const Categories = () => {
    const {
        colorMode,
        toggleColorMode
    } = useColorMode();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false)
    const [categories, setCategories] = useState([]);
    const [activeCategories, setActiveCategories] = useState([]);




    //When the presssable is pressed without the use effect it takes two presses to change, thereS a one press latency

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = (sort_by = "todoDone", order_by = "asc") => {
        axiosClient
            .get(`/todoCategories`)
            .then(({ data }) => {
                setCategories(data.data);
                console.log(data)
                setLoading(false)
            })
            .catch(() => {
                console.error("tssdafsdgadg")
            });
    };




    return <Box safeAreaBottom >

            <FlatList   data={categories}
                        renderItem={({item}) => (
                            <Button  alignItems="center" size="sm" colorScheme={item.categoryColor}
                                     color="white"

                            >

                                {item.categoryName}
                            </Button >
                        )}
                        keyExtractor={item => item}
                        contentContainerStyle={{columnGap:SIZES.small}}
                        horizontal
                        showsHorizontalScrollIndicator={false}

            />
    </Box>





}





export default Categories