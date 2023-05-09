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

    return (
        <View style={styles.container}>
            <Camera style={{flex: 1}} type={type}>
                
            </Camera>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
})