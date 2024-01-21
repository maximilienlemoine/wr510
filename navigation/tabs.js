import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import SearchPage from "../pages/SearchPage";
import HomePage from "../pages/HomePage";
import TeamPage from "../pages/TeamPage";
import SettingsPage from "../pages/SettingsPage";
import {Image, View, Text, StyleSheet} from "react-native";

const Tab = createBottomTabNavigator();

export default function TabsPage() {

        return (
            <Tab.Navigator
                initialRouteName='Pokedex'
                tabBarOptions={{
                    showLabel: false,
                    style: {
                        position: 'absolute',
                        bottom: 25,
                        left: 20,
                        right: 20,
                        elevation: 0,
                        backgroundColor: '#FFFFFF',
                        borderRadius: 15,
                        height: 90,
                        ...styles.shadow
                    }
                }}
                screenOptions={{
                    tabBarActiveTintColor: '#E4000F',
                    tabBarInactiveTintColor: '#000000',
                    tabBarStyle: {
                        backgroundColor: '#FFFFFF',
                        borderTopColor: '#FFFFFF',
                    },
                }}
            >
                <Tab.Screen name='Pokedex' component={HomePage} options={
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
                <Tab.Screen name='Recherche' component={SearchPage} options={
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
                <Tab.Screen name='Mon équipe' component={TeamPage} options={
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
                <Tab.Screen name='Paramètres' component={SettingsPage} options={
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