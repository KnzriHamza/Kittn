import {useEffect, useState} from 'react'
import {FlatList} from 'react-native'
import {useRouter} from "expo-router";
import {Box, Button, useColorMode} from "native-base";
import axiosClient from "../../../axios-client";
import {SIZES} from "../../../constants";

const Categories = ({categories}) => {
    const {

    } = useColorMode();
    const router = useRouter();



    useEffect(() => {
        //console.error(categories)
    }, []);
    //When the presssable is pressed without the use effect it takes two presses to change, thereS a one press latency






    return <Box >
        <FlatList   data={categories.data}
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