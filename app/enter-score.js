import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, Dimensions, Button, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useFonts, Montserrat_600SemiBold, Montserrat_400Regular, Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import { Lexend_400Regular, Lexend_500Medium } from '@expo-google-fonts/lexend';
import { useState } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import RoundButton from '../components/RoundButton';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GameRecord from '../components/GameRecord';
import Scorecard from '../components/Scorecard';


export default function App() {

    const [symbols, setSymbols] = useState(null);
    const [scores, setScores] = useState(null);
    const [frameInputBorderColor, setFrameInputBorderColor] = useState('black');

    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Lexend_400Regular
    })

    let backToMenuText = "< Capture"
    const router = useRouter()

    const handleFrameInputChange = (value) => {
        if (value < 1 || value > 10) {
            setFrameInputBorderColor('red')
        } else {
            setFrameInputBorderColor('black')
        }
    }

    return (
        <LinearGradient
            colors={['#3c79d7', '#c27b9f']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1.5}}
            style={styles.container}>

            <View style={styles.enterScoresContainer}>
                <Text style={styles.titleText}>Enter a Score</Text>
                <TouchableOpacity>
                    <Text style={styles.backButton} onPress={() => router.push('/capture')}>{backToMenuText}</Text>
                </TouchableOpacity>
                <View style={styles.enterScoresView}>
                    <Scorecard
                        symbols={["X", "X", "X", "X", "X", "X", "X", "X", "X", "XXX"]}
                        scores={["30", "60", "90", "120", "150", "180", "210", "240", "270", "300"]}
                    />

                    <View style={styles.enterScoresController}>
                        <View style={styles.enterScoresControllerLeft}>
                            <Text style={styles.controlLabel}>Frame to Edit</Text>

                            <TextInput
                                style={[styles.frameInput, { borderColor: frameInputBorderColor }]}
                                onChangeText={handleFrameInputChange}
                                keyboardType="numeric"
                            />

                        </View>
                        <View style={styles.enterScoresControllerRight}>
                            <Text style={styles.controlLabel}>Frame Symbols</Text>

                            <TextInput
                                style={styles.frameInput}
                            />
                        </View>
                    </View>
                </View>
            </View>

        </LinearGradient>
    )
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    backButton: {
        paddingLeft: 10,
        marginBottom: 5,
        color: 'white'
    },
    titleText: {
        marginTop:100,
        fontFamily: 'Lexend_400Regular', 
        fontSize: 30,
        padding: 10,
        color: 'white',
    },
    enterScoresContainer: {
    },
    enterScoresView: {
        backgroundColor: 'white',
        width: width * 0.9,
        borderRadius: 10,
        alignItems: 'center'
    },
    enterScoresController: {
        width: 360,
        height: 100,
        flexDirection:'row'
    },
    enterScoresControllerLeft: {
        width: 180,
        height: 100,
    },
    frameInput: {
        marginTop: 5,
        width:50,
        height:50,
        borderWidth: 1,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20
    },
    enterScoresControllerRight: {
        width: 180,
        height: 100,
    },
    controlLabel: {
        color: 'gray',
        fontFamily:'Lexend_400Regular',
        alignSelf: 'center'
    }
})
