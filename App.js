import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import TabsPage from "./navigation/tabs";

export default function App() {

    return (
            <NavigationContainer>{
                <TabsPage>
                </TabsPage>
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
