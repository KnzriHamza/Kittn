import React, {useState} from 'react'
import { View, Text } from 'react-native'
import {Alert, Slide} from "native-base";



const PopUpSlide = ( props ) => {
    let isOpenTop = props.isOpenTop;
    let slideType = props.slideType;
    console.log(slideType)


    return (
        <Slide in={isOpenTop} duration={2000} placement="top">
            <Alert justifyContent="center" status={slideType} safeAreaTop={8}>
                <Alert.Icon />
                <Text color="error.600" fontWeight="medium">
                    {slideType}
                </Text>
            </Alert>
        </Slide>
    )
}

export default PopUpSlide