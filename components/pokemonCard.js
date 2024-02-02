import {View, Image, Text, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {useNavigation} from "@react-navigation/native";

export default function PokemonCard({name, url}) {
    const navigation = useNavigation();
    const id = url.split('/')[url.split('/').length - 2];
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    function capitalizeFirstLetter(string) {
        if (string === undefined)
            return '';

        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Pokemon', {
            id: id
        })} style={styles.card}>
            <Image style={styles.image} source={{uri: image}}/>
            <View style={styles.titleDiv}>
                <Text style={styles.title}>{capitalizeFirstLetter(name)}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        width: 100,
        height: 120,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
    },
    title: {
        fontWeight: 'bold',
        color: 'white',
    },
    titleDiv: {
        backgroundColor: '#E4000F',
        padding: 5,
        borderRadius: 3,
    }
})