import {Button, FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import PokemonCard from "../components/pokemonCard";
import {StatusBar} from "expo-status-bar";

export default function HomePage() {
    const [data, setData] = useState([]);
    const [nextPage, setNextPage] = useState([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon')
            .then(response => response.json())
            .then(json => {
                setNextPage(json.next)
                setData(json.results)
            })
            .catch(error => console.error(error));
    }, []);

    const fecthMoreData = () => {
        fetch(nextPage.toString())
            .then(response => response.json())
            .then(json => {
                setNextPage(json.next)
                setData([...data, ...json.results])
            })
            .catch(error => console.error(error));
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={styles.list}
                numColumns={3}
                data={data}
                renderItem={({item}) => <PokemonCard name={item.name} url={item.url}/>}
                keyExtractor={item => item.name}
                onEndReached={fecthMoreData}
                onEndReachedThreshold={0.5}
            />
            <StatusBar style="auto"/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    list: {
        padding: 10,
        marginBottom: 15,
    },
});