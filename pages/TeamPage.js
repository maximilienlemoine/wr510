import {FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useCallback, useEffect, useState} from "react";
import PokemonCard from "../components/pokemonCard";
import CustomButton from "../components/customButton";
import {useFocusEffect} from "@react-navigation/native";

export default function TeamPage() {

    const [team, setTeam] = useState([]);

    async function getTeam() {
        let storage = await AsyncStorage.getItem('team')
        if (storage) {
            const parsedTeam = JSON.parse(storage);
            if (Array.isArray(parsedTeam) && parsedTeam.length > 0) {
                setTeam(parsedTeam);
            } else {
                setTeam([])
            }
        } else {
            setTeam([])
        }
    }

    useFocusEffect(
        useCallback(() => {
            getTeam();
        }, [])
    );

    function clearTeam() {
        AsyncStorage.clear();
        setTeam([]);
    }

    return (
        <SafeAreaView style={styles.container}>
            {team.length === 0 ? (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 20}}>Aucun pokemon dans l'équipe</Text>
                </View>
            ) : (
                <View>
                    <FlatList
                        style={styles.list}
                        numColumns={2}
                        data={team}
                        renderItem={({item}) =>
                            <PokemonCard name={item[1]} url={'https://pokeapi.co/api/v2/pokemon/' + item[2] + '/'}/>}
                        keyExtractor={item => item[0]}
                    />
                    <View style={{bottom: 150}}>
                        <CustomButton title={'Vider l\'équipe'} event={clearTeam} color={'#E4000F'}></CustomButton>
                    </View>
                </View>
            )}
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
});