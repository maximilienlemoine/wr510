import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import TabsPage from "./navigation/Tabs";

export default function App() {

    return (
            <NavigationContainer>{
                <TabsPage>
                </TabsPage>
            }</NavigationContainer>
    );
}

const styles = StyleSheet.create({

});
