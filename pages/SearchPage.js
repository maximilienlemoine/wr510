import {SafeAreaView, StyleSheet, TextInput, Text, View} from "react-native";
import React, {useState} from "react";
import CustomButton from "../components/customButton";
import PokemonCard from "../components/pokemonCard";

export default function SearchPage() {
    const [text, onChangeText] = useState('');
    const [pokemon, setPokemon] = useState([]);
    const [returnText, setReturnText] = useState('Rechercher un pokemon par son nom en anglais');

    async function searchPokemon() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + text);

            if (!response.ok) {
                setReturnText('Pokemon non trouvé');
                setPokemon([]);
                return;
            }

            const json = await response.json();
            setPokemon(json);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.setting}>
                <Text style={styles.label}>Nom d'un pokemon:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Entrer le nom d'un pokemon"
                    keyboardType="default"
                    pointerEvents={'none'}
                ></TextInput>
            </View>
            <CustomButton title={'Rechercher'} event={searchPokemon} color={'#E4000F'}></CustomButton>

            {pokemon.name !== undefined ? (
                <View style={styles.resultView}>
                    <PokemonCard name={pokemon.name} url={'https://pokeapi.co/api/v2/pokemon/' + pokemon.id + '/'}></PokemonCard>
                </View>
            ) : (
                <View>
                    <Text> {returnText}</Text>
                </View>
            )
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    setting: {
        marginBottom: 15,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    resultView: {
        flex: 1,
        alignItems: 'center',
    },
});