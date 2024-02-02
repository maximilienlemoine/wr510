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
                return;
            }

            const json = await response.json();
            setPokemon(json);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <SafeAreaView>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="nom du pokemon en anglais"
                keyboardType="default"
                pointerEvents={'none'}
            ></TextInput>
            <CustomButton title={'Rechercher'} event={searchPokemon} color={'#E4000F'}></CustomButton>

            {pokemon.name !== undefined ? (
                <View>
                    <PokemonCard name={pokemon.name}
                                 url={'https://pokeapi.co/api/v2/pokemon/' + pokemon.id + '/'}></PokemonCard>
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
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 25,

    },
});