import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Camera, CameraType } from "expo-camera";
import { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import RoundButton from '../components/RoundButton';
import EnterScore from '../components/EnterScore';

export default function App() {
    let cameraRef = useRef();
    const [type, setType] = useState(CameraType.back);
    const [capturedImage, setCapturedImage] = useState(null);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    const [symbols, setSymbols]= useState(['', '', '', '', '', '', '', '', '', ''])
    const [enterScoreState, setEnterScoreState] = useState(false)

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

            // <LinearGradient
            // colors={['#3c79d7', '#c27b9f']}
            // start={{x: 0, y: 0}}
            // end={{x: 0, y: 1.5}}
            // style={styles.container}>

            //     <View style={styles.container}>
            //             <Text>You have not given us permission to access the camera.</Text>
            //             <RoundButton onPress={requestPermission} text="Give us Permission"/>
            //     </View>

            // </LinearGradient>
        )
    }

    const handleTakePicture = async () => {
        let options = {
            quality: 0.5,
            base64: true,
            exif: false,
            format: 'png'
        };

        if (enterScoreState == false) {
            let newPhoto = await cameraRef.current.takePictureAsync(options);
            
            // RNImageConverter.getPNG(newPhoto, (convertedPhoto) => {
            //     console.log(convertedPhoto);
            //     //4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsND...
            // });

            // console.log("GOT HERE 3")
            console.log(Object.keys(newPhoto))
            uploadImage(newPhoto['uri'])
            setCapturedImage(newPhoto['uri'])
        }
    }

    const cropImage = async (imageUri) => {
        ImageCropPicker.openCropper({
            path: imageUri,
            width: 200,
            height: 200
        })
            .then(image => {
                return image
            })
    }

    // const uploadImageTest = async () => {
    //     const apiUrl = "https://8l5amkvz24.execute-api.us-east-1.amazonaws.com/strikezone-image-uploader";
    //     const fileName = "scorecard1.png";
    //     const fileUri = require("./assets/scorecard1.png"); // Assuming the image file is in the same directory
      
    //     const formData = new FormData();
    //     formData.append("image", {
    //       uri: fileUri,
    //       name: fileName,
    //       type: "image/png",
    //     });
      
    //     try {
    //       const response = await fetch(apiUrl, {
    //         method: "POST",
    //         body: formData,
    //       });
      
    //       if (response.ok) {
    //         console.log("Image uploaded successfully!");
    //         // Handle the response or perform any additional actions
    //       } else {
    //         console.error("Image upload failed!");
    //         // Handle the error
    //       }
    //     } catch (error) {
    //       console.error("An error occurred during image upload:", error);
    //       // Handle the error
    //     }
    //   };

    /**
     * Function written by ChatGPT to send the photo to the backend
     */
    const uploadImage = async (imageUri) => {
        const url = 'https://8l5amkvz24.execute-api.us-east-1.amazonaws.com/strikezone-image-uploader';
        const response = await fetch(imageUri)
        const imgBlob = await response.blob()

        try {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/octet-stream'
                }, 
                body: imgBlob
            })

            if (response.status === 200) {
                const result = await response.text();
                console.log(result);
            } else {
                console.log('Error uploading image. Status code:', response.status);
                console.log(response)
            }
        } catch (error) {
            console.log('Error reading file:', error);
        }
    };


    const handleCameraOpacity = () =>{
        if (enterScoreState) {
            return 0.5
        } else {
            return 1
        }
    }

    const handleEnterScoreComponent = () => {
        if (enterScoreState) {
            return 'block'
        } else {
            return 'none'
        }
    }

    const handleSymbols = () => {
        return symbols
    }

    // React freaks out when the '<' symbol is inside an element, so this is to make sure that doesn't happen
    let backToMenuText = "< Main Menu"
    let toManualScoresText = "Enter score manually >"

    return (
        <SafeAreaView style={styles.container}>
            <Camera style={{flex: 1, opacity: handleCameraOpacity() }} zoom={0.1} type={type} ref={cameraRef}>
            <Text style={styles.backButton} onPress={() => router.push('/')}>{backToMenuText}</Text>
            <Text style={styles.enterScoreManually} onPress={() => {
                enterEnterMode()
                }}>{toManualScoresText}</Text>
            <View style={styles.scorecardRectangle}/>
            <View style={styles.buttdonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
                    <View style={styles.circle}/>
                </TouchableOpacity>
            </View>
            </Camera>
            {console.log("We are in capture.js, symbols is")}
            {console.log(handleSymbols())}
            <EnterScore display={handleEnterScoreComponent()} passedSymbols={handleSymbols()}></EnterScore>
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
