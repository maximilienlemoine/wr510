import {SafeAreaView, StyleSheet, Text, Image, View} from "react-native";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "./customButton";

export default function PokemonDetail(route) {

    const pokemonId = route.route.params.id;
    const [data, setData] = useState([]);
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
                const isInTeam = teamArray.some((pokemon) => pokemon[2] === pokemonId);
                setIsInTeam(isInTeam);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonId)
            .then(response => response.json())
            .then(json => {
                setData(json)
                checkIfInTeam();
            })
            .catch(error => console.error(error));
    }, [pokemonId]);

    async function addPokemonToTeam() {
        if (data === undefined)
            return;

        const currentPokemonID = pokemonId;
        const teamMate = [
            'https://pokeapi.co/api/v2/pokemon/' + currentPokemonID,
            data.name,
            currentPokemonID,
        ];

        try {
            const team = await AsyncStorage.getItem('team');
            let teamArray = JSON.parse(team);
            if (teamArray === null) teamArray = [];

            const isInTeam = teamArray.some((pokemon) => pokemon[2] === currentPokemonID);

            if (isInTeam) {
                const index = teamArray.findIndex((pokemon) => pokemon[2] === currentPokemonID);
                teamArray.splice(index, 1);
                await AsyncStorage.setItem('team', JSON.stringify(teamArray));

                setIsInTeam(false);
            } else {
                if (teamArray.length >= 6) {
                    alert('Votre équipe est complète');
                    return;
                }
                teamArray.push(teamMate);
                await AsyncStorage.setItem('team', JSON.stringify(teamArray));

                setIsInTeam(true);
            }
        } catch (error) {
            console.log(error);
        }
    }


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
            <View style={{ bottom: 150}}>
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