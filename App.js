import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import HomePage from "./pages/HomePage";

const Stack = createStackNavigator();

export default function App() {

    return (
            <NavigationContainer>{
                <Stack.Navigator>
                    <Stack.Screen name='Pokedex' component={HomePage}/>
                </Stack.Navigator>
            }</NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pokedexDiv: {
        padding: 5,
        width: '100%',
        backgroundColor: '#ab0000'
    },
    pokedexTitle: {
        color: 'white',
        fontWeight: 'bold',
    }
});
