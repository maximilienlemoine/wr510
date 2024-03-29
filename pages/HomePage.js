import {FlatList, SafeAreaView, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import PokemonCard from "../components/pokemonCard";
import {StatusBar} from "expo-status-bar";

export default function HomePage() {
    const [data, setData] = useState([]);
    const [nextPage, setNextPage] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon');

            if (!response.ok) {
                return;
            }

            const json = await response.json();
            setNextPage(json.next);
            setData(json.results);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchMoreData = async () => {
        try {
            const response = await fetch(nextPage.toString());

            if (!response.ok) {
                return;
            }

            const json = await response.json();
            setNextPage(json.next);
            setData([...data, ...json.results]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={styles.list}
                numColumns={3}
                data={data}
                renderItem={({item}) => <PokemonCard name={item.name} url={item.url}/>}
                keyExtractor={item => item.name}
                onEndReached={fetchMoreData}
                onEndReachedThreshold={0.5}
            />
            <StatusBar style="auto"/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    list: {
        paddingLeft: 20,
        paddingRight: 20,
    },
});