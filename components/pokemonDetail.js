import {SafeAreaView, StyleSheet, Text, Image, View} from "react-native";
import {useEffect, useState} from "react";
import CustomButton from "./customButton";

export default function PokemonDetail(route) {

    const pokemonId = route.route.params.id;
    const [data, setData] = useState([]);
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
    const imageShiny = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemonId}.png`;

    function capitalizeFirstLetter(string) {
        if (string === undefined)
            return '';

        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonId)
            .then(response => response.json())
            .then(json => {
                setData(json)
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text>Nom : {capitalizeFirstLetter(data.name)} ({data.order})</Text>
            <Text>Taille : {data.height / 10}m</Text>
            <Text>Poids : {data.weight / 10}kg</Text>
            <Text>Types : {data.types && data.types.map((type) => type.type.name).join(', ')}</Text>
            <Text>Expérience de base : {data.base_experience}</Text>
            <Text style={styles.title}>Statistiques : </Text>
                {data.stats && data.stats.map((stat) =>
                    <Text key={stat.stat.name}>{capitalizeFirstLetter(stat.stat.name)} : {stat.base_stat}</Text>
                )}
            <View style={{ flex: 1, flexDirection: 'row', }}>
                <View>
                    <Image style={styles.image} source={{uri: image}}/>
                    <Text style={styles.textCenter}>Visuel normal</Text>
                </View>
                <View>
                    <Image style={styles.image} source={{uri: imageShiny}}/>
                    <Text style={styles.textCenter}>Visuel shiny</Text>
                </View>
            </View>
            <View style={{ bottom: 20}}>
                <CustomButton title="Inclure dans l'equipe" color={'#E4000F'}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
    textCenter: {
        textAlign: 'center',
    },
    title: {
        fontWeight: 'bold',
    }
});