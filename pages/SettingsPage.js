import {SafeAreaView, StyleSheet, Text, View, TextInput, Switch, TouchableOpacity, Image} from "react-native";
import {useCallback, useEffect, useState} from "react";
import CustomButton from "../components/customButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import * as ScreenOrientation from 'expo-screen-orientation';

export default function SettingsPage() {
    const [username, setUsername] = useState('');
    const [Orientation, setOrientation] = useState(false);
    const [picture, setPicture] = useState('')
    const navigation = useNavigation();

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

                <View style={styles.setting}>
                    <Text style={styles.label}>Photo de profil:</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
                        { picture === '' ?
                            <Text>Aucune photo</Text> :
                            <Image source={{uri: picture}} style={styles.image}/>
                        }
                        <Text style={styles.button}>Capturer une photo</Text>
                    </TouchableOpacity>
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
    },
    image: {
        width: 330,
        height: 330,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#E4000F',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        marginTop: 5,
    },
});