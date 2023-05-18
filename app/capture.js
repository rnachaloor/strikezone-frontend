import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from "expo-camera";
import { shareAsync } from 'expo-sharing'
import { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import { Icon } from "react-native-elements";
import * as MediaLibrary from 'expo-media-library'
import RoundButton from '../components/RoundButton';
import * as ImagePicker from 'expo-image-picker';
import EnterScore from '../components/EnterScore';

export default function App() {
    let cameraRef = useRef();
    const [type, setType] = useState(CameraType.back);
    const [capturedImage, setCapturedImage] = useState(null);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    let camera = null;

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

    const handleTakePicture = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        console.log(newPhoto['uri'])
        sendPhoto(newPhoto)
        setCapturedImage(newPhoto['uri'])
    }

    /**
     * Function written by ChatGPT to send the photo to the backend
     */
    const sendPhoto = async (photo) => {
        const formData = new FormData();
        formData.append('file', {
          uri: photo.uri,
          type: 'image/jpeg',
          name: 'photo.jpg'
        });
    
        try {
          const response = await fetch('http://192.168.1.212:8080/captures/post-image', {
            method: 'POST',
            body: formData
          });
          console.log(response)
          const responseData = await response.json();
          console.log(responseData);
        } catch (error) {
          console.error(error);
        }
      };

    // React freaks out when the '<' symbol is inside an element, so this is to make sure that doesn't happen
    let backToMenuText = "< Main Menu"
    let toManualScoresText = "Enter score manually >"

    return (
        <SafeAreaView style={styles.container}>
            <Camera style={{flex: 1, opacity:1}} type={type} ref={cameraRef}>
                <Text style={styles.backButton} onPress={() => router.push('/')}>{backToMenuText}</Text>
                <Text style={styles.enterScoreManually} onPress={() => router.push('/enter-score')}>{toManualScoresText}</Text>
                <View style={styles.scorecardRectangle}/>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
                        <View style={styles.circle}/>
                    </TouchableOpacity>
                </View>
            </Camera>
            <EnterScore opacity={1}></EnterScore>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black'
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
    enterScoreManually: {
        paddingLeft: 10,
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