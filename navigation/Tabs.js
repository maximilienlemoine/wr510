import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import SearchPage from "../pages/SearchPage";
import HomePage from "../pages/HomePage";
import TeamPage from "../pages/TeamPage";
import SettingsPage from "../pages/SettingsPage";
import {Image, View, Text, StyleSheet} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import PokemonDetail from "../components/pokemonDetail";
import CameraComponent from "../components/cameraComponent";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export default function TabsPage() {
    return (
        <Tab.Navigator
            initialRouteName='Pokedex'
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#E4000F',
                tabBarInactiveTintColor: '#000000',
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopColor: '#FFFFFF',
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    borderRadius: 15,
                    height: 90,
                    ...styles.shadow
                },
            }}
        >
            <Tab.Screen name='Pokedex' component={HomeStackNavigator} options={
                {
                    tabBarIcon: ({color}) => (
                        <View style={styles.viewStyle}>
                            <Image
                                source={require('../assets/pokedex.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: color
                                }}
                            />
                            <Text style={{color: color}}>Pokedex</Text>
                        </View>
                    )
                }

            }/>
            <Tab.Screen name='Recherche' component={SearchStackNavigator} options={
                {
                    tabBarIcon: ({color}) => (
                        <View style={styles.viewStyle}>
                            <Image
                                source={require('../assets/search.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: color
                                }}
                            />
                            <Text style={{color: color}}>Recherche</Text>
                        </View>
                    )
                }
            }/>
            <Tab.Screen name='Mon équipe' component={TeamStackNavigator} options={
                {
                    tabBarIcon: ({color}) => (
                        <View style={styles.viewStyle}>
                            <Image
                                source={require('../assets/team.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: color
                                }}
                            />
                            <Text style={{color: color}}>Mon équipe</Text>
                        </View>

                    )
                }

            }/>
            <Tab.Screen name='Paramètres' component={SettingsStackNavigator} options={
                {
                    tabBarIcon: ({color}) => (
                        <View style={styles.viewStyle}>
                            <Image
                                source={require('../assets/setting.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: color
                                }}
                            />
                            <Text style={{color: color}}>Paramètres</Text>
                        </View>

                    )
                }
            }/>
        </Tab.Navigator>
    );
}

function HomeStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Tabs' component={HomePage} options={
                {
                    title: 'Pokedex',
                }
            }
            />
            <Stack.Screen name='Pokemon' component={PokemonDetail} initialParams={{id: 1}} options={{
                title: 'Detail du Pokemon',
            }}
            />
        </Stack.Navigator>
    )
}

function SearchStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Tabs' component={SearchPage} options={
                {
                    title: 'Recherche',
                }
            }
            />
            <Stack.Screen name='Pokemon' component={PokemonDetail} initialParams={{id: 1}} options={{
                title: 'Detail du Pokemon',
            }}
            />
        </Stack.Navigator>
    )
}

function TeamStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Tabs' component={TeamPage} options={
                {
                    title: 'Mon équipe',
                }
            }
            />
            <Stack.Screen name='Pokemon' component={PokemonDetail} initialParams={{id: 1}} options={{
                title: 'Detail du Pokemon',
            }}
            />
        </Stack.Navigator>
    )
}

function SettingsStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Settings' component={SettingsPage} options={
                {
                    title: 'Paramètres',
                }
            }
            />
            <Stack.Screen name='Camera' component={CameraComponent} options={
                {
                    title: 'Camera'
                }
            }
            />
        </Stack.Navigator>
    )

}


const styles = StyleSheet.create({
    viewStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})