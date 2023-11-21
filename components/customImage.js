import React from 'react';
import {Image, StyleSheet} from 'react-native';

export default function CustomImage(imgSource) {
    const changeImage = () => {
        require(imgSource)
    }
return(
        <Image
            source={changeImage}
            style={ styles.imgBox }
        />
    )
}

const styles = StyleSheet.create({
    imgBox: {
        width: 200,
        height: 200,
    }
});