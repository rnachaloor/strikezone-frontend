import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from "expo-camera";
import { useState } from 'react';
import { useRouter } from 'expo-router';
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

    let backToMenuText = "< Main Menu"

    return (
        <View style={styles.container}>
            <Camera style={{flex: 1}} type={type}>
                <Text style={styles.backButton} onPress={() => router.push('/')}>{backToMenuText}</Text>
                <View style={styles.scorecardRectangle}>

                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.text}>Capture</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    scorecardRectangle: {
        marginTop:310,
        borderColor:'white',
        borderWidth: 1,
        height:70,
        width: 390,
        alignSelf:'center'
    },
    buttonContainer: {
        flex: 1, 
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64
    },
    backButton: {
        paddingLeft: 10,
        marginTop: 50,
        color: 'white'
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
    }
})