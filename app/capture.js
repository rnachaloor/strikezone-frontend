import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from "expo-camera";
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Icon } from "react-native-elements";
import RoundButton from '../components/RoundButton';

export default function App() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const router = useRouter()

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text>You have not given us permission to access the camera.</Text>
                <RoundButton onPress={requestPermission} text="Give us Permission"/>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Camera style={{flex: 1}} type={type}>
                    <View style={styles.viewFinder}/>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}>
                            <View style={styles.circle}/>
                        </TouchableOpacity>
                    </View>
            </Camera>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    buttonContainer: {
        flex: 1, 
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center'
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },
    viewFinder: {
        width: 400,
        height: 150,
        backgroundColor: 'transparent',
        borderColor: 'red',
        borderWidth: 5,
        alignSelf: 'center',
        marginTop: '80%'
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "white"
    }
})