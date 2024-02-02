import {SafeAreaView, StyleSheet, Text, View, TextInput, Switch, TouchableOpacity} from "react-native";
import {useCallback, useEffect, useState} from "react";
import CustomButton from "../components/customButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "@react-navigation/native";
import * as ScreenOrientation from 'expo-screen-orientation';

export default function SettingsPage() {
    const [username, setUsername] = useState('');
    const [Orientation, setOrientation] = useState(false);
    const [picture, setPicture] = useState('')

    useFocusEffect(
        useCallback(() => {
            getSettings();
        }, [])
    );

    const getSettings = async () => {
        try {
            const username = await AsyncStorage.getItem('username');
            const profilePicture = await AsyncStorage.getItem('picture')
            if (username !== null) {
                setUsername(username);
            }
            if (profilePicture !== null) {
                setPicture(profilePicture)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const updateSettings = async () => {
        try {
            await AsyncStorage.setItem('username', username);
        } catch (error) {
            console.error(error);
        }
    }

    const changeOrientation = async (value) => {
        setOrientation(value);
        if (value) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        } else {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.setting}>
                    <Text style={styles.label}>Nom d'utilisateur:</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        placeholder="Entrez votre nom d'utilisateur"
                        onChangeText={text => setUsername(text)}
                    />
                </View>

                <View style={styles.settingSwitch}>
                    <Text style={styles.label}>Orientation horizontal du telephone:</Text>
                    <Switch
                        value={Orientation}
                        onValueChange={(value) => changeOrientation(value)}
                    />
                </View>
                <CustomButton title={'Enregistrer'} event={updateSettings} color={'#E4000F'}></CustomButton>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    picker: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
    settingSwitch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});