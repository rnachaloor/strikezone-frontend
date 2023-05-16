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

    const [symbols, setSymbols] = useState(['X', '9-', '8/', 'X', 'X', '9/', '7-', 'X', '9/', '6/9']);
    const [scores, setScores] = useState([]);
    const [frameInputBorderColor, setFrameInputBorderColor] = useState('black');
    const [frameToEdit, setFrameToEdit] = useState(1);
    const [frameSymbol, setFrameSymbol] = useState(symbols[frameToEdit - 1]);

    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Lexend_400Regular
    })

    let backToMenuText = "< Capture"
    const router = useRouter()

    // List of functions to handle a number key press
    const handle0key = () => {
        handleScorecardChange(0)
    }

    const handle1key = () => {
        handleScorecardChange(1)
    }

    const handle2key = () => {
        handleScorecardChange(2)
    }

    const handle3key = () => {
        handleScorecardChange(3)
    }

    const handle4key = () => {
        handleScorecardChange(4)
    }

    const handle5key = () => {
        handleScorecardChange(5)
    }

    const handle6key = () => {
        handleScorecardChange(6)
    }

    const handle7key = () => {
        handleScorecardChange(7)
    }

    const handle8key = () => {
        handleScorecardChange(8)
    }

    const handle9key = () => {
        handleScorecardChange(9)
    }

    const handle10key = () => {
        handleScorecardChange(10)
    }

    const handleClear = () => {
        handleScorecardChange(0)
    }

    // Handle when the frame number input is changed
    const handleFrameInputChange = (value) => {
        setFrameToEdit(value)
    }

    // Handles when the enter button is pressed
    const handleScorecardChange = (pins) => {

        setFrameSymbol(symbols[frameToEdit - 1])

        if (pins === 10) {
            let currentSymbolsList = symbols
            currentSymbolsList[frameToEdit - 1] = "X"
            setSymbols(currentSymbolsList)
            setFrameToEdit(frameToEdit + 1)
        } else {
            console.log("Pins is not 10, it is " + pins)

            setFrameSymbol("" + pins)

            // let currentSymbolsList = symbols
            // let frameString = currentSymbolsList[frameToEdit - 1]
            // frameString = "" + pins
            // currentSymbolsList[frameToEdit - 1] = frameString
            // setSymbols(currentSymbolsList)
        }
    }

    let initialFrameSymbol = symbols[frameToEdit - 1]
    console.log("Initial frame symbol: " + initialFrameSymbol)

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
                        // ['X', '9-', '8/', 'X', 'X', '9/', '7-', 'X', '9/', '6/9']
                        symbols={symbols}
                        scores={scores}
                    />

                    <View style={styles.enterScoresController}>
                        <View style={styles.enterScoresControllerLeft}>
                            <Text style={styles.controlLabel}>Frame to Edit</Text>

                            <TextInput
                                style={[styles.frameInput, { borderColor: frameInputBorderColor }]}
                                onChangeText={handleFrameInputChange}
                                keyboardType="numeric"
                            >{frameToEdit}</TextInput>
                            <View style={styles.frameReader}>
                                {console.log(initialFrameSymbol)}
                                <Text style={styles.frameReaderText}>{initialFrameSymbol}</Text>
                            </View>

                        </View>
                    </View>

                    <Text style={styles.controlLabel}>Pins Knocked Down</Text>
                    <View style={styles.enterScoresControllerButtons}>
                        <RoundButton onPress={handle0key} text="0" borderRadius={0} width={100} margin={5} shadowOpacity={0.4}></RoundButton>
                        <RoundButton onPress={handle1key} text="1" borderRadius={0} width={100} margin={5} shadowOpacity={0.4}></RoundButton>
                        <RoundButton onPress={handle2key} text="2" borderRadius={0} width={100} margin={5} shadowOpacity={0.4}></RoundButton>
                        <RoundButton onPress={handle3key} text="3" borderRadius={0} width={100} margin={5} shadowOpacity={0.4}></RoundButton>
                        <RoundButton onPress={handle4key} text="4" borderRadius={0} width={100} margin={5} shadowOpacity={0.4}></RoundButton>
                        <RoundButton onPress={handle5key} text="5" borderRadius={0} width={100} margin={5} shadowOpacity={0.4}></RoundButton>
                        <RoundButton onPress={handle6key} text="6" borderRadius={0} width={100} margin={5} shadowOpacity={0.4}></RoundButton>
                        <RoundButton onPress={handle7key} text="7" borderRadius={0} width={100} margin={5} shadowOpacity={0.4}></RoundButton>
                        <RoundButton onPress={handle8key} text="8" borderRadius={0} width={100} margin={5} shadowOpacity={0.4}></RoundButton>
                        <RoundButton onPress={handle9key} text="9" borderRadius={0} width={100} margin={5} shadowOpacity={0.4}></RoundButton>
                        <RoundButton onPress={handle10key} text="10" borderRadius={0} width={100} margin={5} shadowOpacity={0.4}></RoundButton>
                        <RoundButton onPress={handleClear} text="Clear Frame" borderRadius={0} width={100} margin={5} shadowOpacity={0.4}></RoundButton>
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
        marginBottom: 40,
        width: 360,
        height: 100,
        flexDirection:'row'
    },
    enterScoresControllerLeft: {
        width: 360,
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
    frameReader: {
        width:50,
        height:50,
        borderWidth: 1,
        borderTopWidth: 0,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,

        justifyContent: 'center',
        alignItems: 'center',
    },
    frameReaderText: {
        fontSize: 20
    },
    enterScoresControllerButtons: {
        width: 360,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        flexWrap: 'wrap',
    },
    controlLabel: {
        color: 'gray',
        fontFamily:'Lexend_400Regular',
        alignSelf: 'center'
    }
})
