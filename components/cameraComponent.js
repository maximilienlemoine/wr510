import {Camera} from "expo-camera";
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";

export default function CameraComponent() {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


    const takePicture = async () => {
        if (cameraRef) {
            const photo = await cameraRef.takePictureAsync();

            if (photo.uri === undefined) {
                return;
            }

            try {
                await AsyncStorage.setItem('picture', photo.uri);
            } catch (error) {
                console.error(error);
            }

            navigation.navigate('Settings');
        }
    };

    if (hasPermission === null) {
        return <View/>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Camera
                style={{flex: 1}}
                type={Camera.Constants.Type.front}
                ref={(ref) => setCameraRef(ref)}
            >
                <View
                    style={styles.view}
                >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={takePicture}
                    >
                        <Image
                            source={require('../assets/circle.png')}
                            resizeMode='contain'
                            style={{
                                width: 100,
                                height: 100,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </Camera>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 18,
        marginBottom: 10,
        color: 'white'
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    view: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        marginBottom: 125,
    },
})