import {SafeAreaView, StyleSheet, Text, Image, View} from "react-native";
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "./customButton";
import {useFocusEffect} from "@react-navigation/native";

export default function PokemonDetail(route) {

    const pokemonId = parseInt(route.route.params.id);
    const [pokemonData, setPokemonData] = useState([]);
    const [isInTeam, setIsInTeam] = useState(false);
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
    const imageShiny = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemonId}.png`;

    function capitalizeFirstLetter(string) {
        if (string === undefined)
            return '';

        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const checkIfInTeam = async () => {
        try {
            const team = await AsyncStorage.getItem('team');
            if (team) {
                const teamArray = JSON.parse(team);
                const isInTeam = teamArray.some((pokemon) => {
                    return pokemon.id === pokemonId
                });
                setIsInTeam(isInTeam);

                if (isInTeam) {
                    const index = teamArray.findIndex((pokemon) => pokemon.id === pokemonId);
                    setPokemonData(teamArray[index]);
                } else {
                    await fetchData();
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    useFocusEffect(
        () => {
        checkIfInTeam()
    });

    const fetchData = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);

            if (!response.ok) {
                return;
            }

            const json = await response.json();
            setPokemonData(json);
        } catch (error) {
            console.error(error);
        }
    };

    async function addPokemonToTeam() {
        if (pokemonData === undefined)
            return;

        try {
            const team = await AsyncStorage.getItem('team');
            let teamArray = JSON.parse(team);
            if (teamArray === null) teamArray = [];

            const isInTeam = teamArray.some((pokemon) => pokemon.id === pokemonId);

            if (isInTeam) {
                const index = teamArray.findIndex((pokemon) => pokemon.id === pokemonId);
                teamArray.splice(index, 1);
                await AsyncStorage.setItem('team', JSON.stringify(teamArray));

                setIsInTeam(false);
            } else {
                if (teamArray.length >= 6) {
                    alert('Votre équipe est complète');
                    return;
                }
                teamArray.push(pokemonData);
                await AsyncStorage.setItem('team', JSON.stringify(teamArray));

                setIsInTeam(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>Nom : {capitalizeFirstLetter(pokemonData.name)} ({pokemonData.order})</Text>
            <Text>Taille : {pokemonData.height / 10}m</Text>
            <Text>Poids : {pokemonData.weight / 10}kg</Text>
            <Text>Types : {pokemonData.types && pokemonData.types.map((type) => type.type.name).join(', ')}</Text>
            <Text>Expérience de base : {pokemonData.base_experience}</Text>
            <Text style={styles.title}>Statistiques : </Text>
            {pokemonData.stats && pokemonData.stats.map((stat) =>
                <Text key={stat.stat.name}>{capitalizeFirstLetter(stat.stat.name)} : {stat.base_stat}</Text>
            )}
            <View style={{flex: 1, flexDirection: 'row',}}>
                <View>
                    <Image style={styles.image} source={{uri: image}}/>
                    <Text style={styles.textCenter}>Visuel normal</Text>
                </View>
                <View>
                    <Image style={styles.image} source={{uri: imageShiny}}/>
                    <Text style={styles.textCenter}>Visuel shiny</Text>
                </View>
            </View>
            <View style={{bottom: 150}}>
                <CustomButton title={isInTeam ? "Libérer" : "Capturer"} color={'#E4000F'} event={addPokemonToTeam}/>
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