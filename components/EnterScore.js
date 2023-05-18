import { StyleSheet, TouchableOpacity, Text, View, Dimensions, TouchableHighlight } from 'react-native';
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { Lexend_400Regular, Lexend_500Medium } from '@expo-google-fonts/lexend';
import { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import { storeJSONData, getJSONData, getStringData } from "../async-functions";
import { Device } from "expo-device"
import Scorecard from './Scorecard';
import RoundButton from './RoundButton';

export default function EnterScore ({ opacity=1 }) {
    const [symbols, setSymbols] = useState(['', '', '', '', '', '', '', '', '', '']);
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

    const handleLeftArrow = () => {
        if (frameToEdit != 1) {
            setFrameToEdit(frameToEdit - 1)
        }
    }

    const handleRightArrow = () => {
        if (frameToEdit != 10) {
            setFrameToEdit(frameToEdit + 1)
        }
    }

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
        let newSymbols = [...symbols]
        newSymbols[frameToEdit - 1] = ""
        setSymbols(newSymbols)
        handleScoresList()
    }

    // Handle when the frame number input is changed
    const handleFrameInputChange = (value) => {
        setFrameToEdit(value)

        
    }

    const tenthIsComplete = (tenthFrameSymbol) => {
        if (tenthFrameSymbol.length == 3) {
            return true
        }

        // tenth frame symbol length = 2 
        if (tenthFrameSymbol.length == 2 && tenthFrameSymbol[0] != "X" && tenthFrameSymbol[1] != "/") {
            return true
        } 
        return false
    }

    // Handles when the enter button is pressed
    const handleScorecardChange = (pins) => {
        let newSymbols = [...symbols]

        if (frameToEdit == 10) {

            if (tenthIsComplete(newSymbols[frameToEdit - 1])) {

            } else if (newSymbols[frameToEdit - 1].length == 0) {
                if (pins == 0) {
                    newSymbols[frameToEdit - 1] = "-"
                    setSymbols(newSymbols)
                } else if (pins == 10) {
                    newSymbols[frameToEdit - 1] = "X"
                    setSymbols(newSymbols)
                } else {
                    newSymbols[frameToEdit - 1] = newSymbols[frameToEdit - 1] + pins + ""
                    setSymbols(newSymbols)
                }
            } else if (newSymbols[frameToEdit - 1].length == 1) {
                // If the first frame is a strike, just add the number of the pinfall unless strike
                if (newSymbols[frameToEdit - 1][0] == "X") {
                    if (pins == 0) {
                        newSymbols[frameToEdit - 1] = newSymbols[frameToEdit - 1] + "-"
                        setSymbols(newSymbols)
                    } else if (pins == 10) {
                        newSymbols[frameToEdit - 1] = "XX"
                        setSymbols(newSymbols)
                    } else {
                        newSymbols[frameToEdit - 1] = newSymbols[frameToEdit - 1] + pins + ""
                        setSymbols(newSymbols)
                    }
                } else {
                    let currentFrameValue = 0

                    // The character could be a - which means 0 pins
                    if (newSymbols[frameToEdit - 1] == "-") {
                        currentFrameValue = 0
                    } else {
                        currentFrameValue = parseInt(newSymbols[frameToEdit - 1])
                    }

                    // The second roll should add to currentFrameValue and keep the frame value less than or equal to 10
                    // If the current frame value plus whatever is rolled is 10, it is a spare
                    if (currentFrameValue + pins == 10) {
                        // Add a spare to the frame
                        newSymbols[frameToEdit - 1] = newSymbols[frameToEdit - 1] + "/"
                        setSymbols(newSymbols)

                        // Autoset to next frame
                        if (frameToEdit != 10) {
                            setFrameToEdit(frameToEdit + 1)
                        }
                    } else if (currentFrameValue + pins < 10) {
                        // Add whatever number to the frame

                        // If zero pins, -
                        if (pins == 0) {
                            newSymbols[frameToEdit - 1] = newSymbols[frameToEdit - 1] + "-"
                            setSymbols(newSymbols)
                        } else {
                            newSymbols[frameToEdit - 1] = newSymbols[frameToEdit - 1] + pins + ""
                            setSymbols(newSymbols)
                        }

                        // Autoset to next frame
                        if (frameToEdit != 10) {
                            setFrameToEdit(frameToEdit + 1)
                        }
                    } else {
                        // Do nothing, because it adds to more than 10
                    }
                }
            } else if (newSymbols[frameToEdit - 1].length == 2) {
                let lastTwoFrameValue = 0
                if (newSymbols[frameToEdit - 1][0] == "X" && newSymbols[frameToEdit - 1][1] != "X") {
                    // The character could be a - which means 0 pins
                    if (newSymbols[frameToEdit - 1][1] == "-") {
                        lastTwoFrameValue = 0
                    } else {
                        lastTwoFrameValue = parseInt(newSymbols[frameToEdit - 1][1])
                    }


                    // The second roll should add to currentFrameValue and keep the frame value less than or equal to 10
                    // If the current frame value plus whatever is rolled is 10, it is a spare
                    if (lastTwoFrameValue + pins == 10) {
                        // Add a spare to the frame
                        newSymbols[frameToEdit - 1] = newSymbols[frameToEdit - 1] + "/"
                        setSymbols(newSymbols)

                        // Autoset to next frame
                        if (frameToEdit != 10) {
                            setFrameToEdit(frameToEdit + 1)
                        }
                    } else if (lastTwoFrameValue + pins < 10) {
                        // Add whatever number to the frame

                        // If zero pins, -
                        if (pins == 0) {
                            newSymbols[frameToEdit - 1] = newSymbols[frameToEdit - 1] + "-"
                            setSymbols(newSymbols)
                        } else {
                            newSymbols[frameToEdit - 1] = newSymbols[frameToEdit - 1] + pins + ""
                            setSymbols(newSymbols)
                        }

                        // Autoset to next frame
                        if (frameToEdit != 10) {
                            setFrameToEdit(frameToEdit + 1)
                        }
                    } else {
                        // Do nothing, because it adds to more than 10
                    }
                } else if (newSymbols[frameToEdit - 1][0] == "X" && newSymbols[frameToEdit - 1][1] == "X") {
                    if (pins == 0) {
                        newSymbols[frameToEdit - 1] = newSymbols[frameToEdit - 1] + "-"
                        setSymbols(newSymbols)
                    } else if (pins == 10) {
                        newSymbols[frameToEdit - 1] = newSymbols[frameToEdit - 1] + "X"
                        setSymbols(newSymbols)
                    } else {
                        newSymbols[frameToEdit - 1] = newSymbols[frameToEdit - 1] + pins + ""
                        setSymbols(newSymbols)
                    }
                } else {
                    if (pins == 0) {
                        newSymbols[frameToEdit - 1] = newSymbols[frameToEdit - 1] + "-"
                        setSymbols(newSymbols)
                    } else if (pins == 10) {
                        newSymbols[frameToEdit - 1] = newSymbols[frameToEdit - 1] + "X"
                        setSymbols(newSymbols)
                    } else {
                        newSymbols[frameToEdit - 1] = newSymbols[frameToEdit - 1] + pins + ""
                        setSymbols(newSymbols)
                    }
                }     
            }




        } else {
            // This condition deals with if the frame is complete
            if (newSymbols[frameToEdit - 1].length == 2 || newSymbols[frameToEdit - 1] == "X") {

            // This condition deals with if the frame is incomplete
            } else if (newSymbols[frameToEdit - 1].length == 1) {
                let currentFrameValue = 0

                // The character could be a - which means 0 pins
                if (newSymbols[frameToEdit - 1] == "-") {
                    currentFrameValue = 0
                } else {
                    currentFrameValue = parseInt(newSymbols[frameToEdit - 1])
                }

                // The second roll should add to currentFrameValue and keep the frame value less than or equal to 10
                // If the current frame value plus whatever is rolled is 10, it is a spare
                if (currentFrameValue + pins == 10) {
                    // Add a spare to the frame
                    newSymbols[frameToEdit - 1] = newSymbols[frameToEdit - 1] + "/"
                    setSymbols(newSymbols)

                    // Autoset to next frame
                    if (frameToEdit != 10) {
                        setFrameToEdit(frameToEdit + 1)
                    }
                } else if (currentFrameValue + pins < 10) {
                    // Add whatever number to the frame

                    // If zero pins, -
                    if (pins == 0) {
                        newSymbols[frameToEdit - 1] = newSymbols[frameToEdit - 1] + "-"
                        setSymbols(newSymbols)
                    } else {
                        newSymbols[frameToEdit - 1] = newSymbols[frameToEdit - 1] + pins + ""
                        setSymbols(newSymbols)
                    }

                    // Autoset to next frame
                    if (frameToEdit != 10) {
                        setFrameToEdit(frameToEdit + 1)
                    }
                } else {
                    // Do nothing, because it adds to more than 10
                }

            } else { // The frame is currently empty
                if (pins == 10) {
                    // Add a strike and go to the next frame
                    newSymbols[frameToEdit - 1] = "X"
                    setSymbols(newSymbols)
                    
                    if (frameToEdit != 10) {
                        setFrameToEdit(frameToEdit + 1)
                    }
                } else if (pins == 0) {
                    // Add a -
                    newSymbols[frameToEdit - 1] = "-"
                    setSymbols(newSymbols)
                } else {
                    newSymbols[frameToEdit - 1] = pins + ""
                    setSymbols(newSymbols)
                }
            }
        }

        let scoreList = handleScoresList()
        setScores(scoreList)
    }

    const scorecardComplete = () => {
        for (let i = 0; i < 9; i++) {
            if (symbols[i].length == 2 || symbols[i] == "X") {
                
            } else {
                return false
            }
        }

        if (!tenthIsComplete(symbols[9])) {
            return false
        }

        return true
    }

    const handleScoresList = () => {
        // Convert the symbols to a list of numbers
        let combinedSymbols = symbols.join()
        combinedSymbols = combinedSymbols.replace(/,/g, "")

        let rollsList = []
        for (let i = 0; i < combinedSymbols.length; i++) {
            if (combinedSymbols[i] == "X") {
                rollsList.push(10)
            } else if (combinedSymbols[i] == "-") {
                rollsList.push(0)
            } else if (combinedSymbols[i] == "/") {
                rollsList.push(10 - rollsList[i-1])
            } else {
                rollsList.push(parseInt(combinedSymbols[i]))
            }
        }

        let scoreList = []
        let cumilativeScore = 0
        let currentFrame = 0
        let currentRoll = 0
        while (scoreList.length <= 8) {
            if (rollsList[currentRoll] == 10) { // It's a strike
                cumilativeScore = cumilativeScore + 10
                cumilativeScore = cumilativeScore + rollsList[currentRoll + 1] + rollsList[currentRoll + 2]
                scoreList.push(cumilativeScore)
                currentRoll++
            } else {
                cumilativeScore = cumilativeScore + rollsList[currentRoll]
                currentRoll++
                if (rollsList[currentRoll] + rollsList[currentRoll - 1] == 10) { // Its a spare
                    cumilativeScore = cumilativeScore + rollsList[currentRoll]
                    cumilativeScore = cumilativeScore + rollsList[currentRoll + 1]
                    scoreList.push(cumilativeScore)
                    currentRoll++
                } else {
                    cumilativeScore = cumilativeScore + rollsList[currentRoll]
                    scoreList.push(cumilativeScore)
                    currentRoll++
                }
            }
        }

        // 10th frame
        for (let i = currentRoll; i < rollsList.length; i++) {
            cumilativeScore = cumilativeScore + rollsList[i]
        }
        scoreList.push(cumilativeScore)

        return scoreList
    }

    const handleSubmit = async () => {
        handleScorecardChange()
        if (!scorecardComplete()) {
            console.log("Scorecard is not complete")
        } else {

            // An example of a storage object
            /*
                
            {
                deviceId: '2357237',
                gameDate: '05-02-2023',
                gameSymbols: ['9/', '45', '6/', '6/', '8/', 'X', 'X', '8/', 'X', '8/-']
                gameScore: 189 (ignore this attribute for now)
            }

            */
            const symbolsToStore = symbols
            console.log("Calling Scores List function")
            let scoresFromFunction = handleScoresList()
            const gameScore = scoresFromFunction.slice(-1)

            console.log(symbolsToStore)
            console.log(gameScore)
            const deviceId = await Device.getDeviceIdAsync()

            //date code by chatgpt
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1; // Months are zero-based, so adding 1
            const day = today.getDate();

            // Format the date as desired (e.g., "YYYY-MM-DD")
            const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

            const gameData = {
                deviceId: deviceId,
                gameDate: formattedDate,
                gameSymbols: symbolsToStorage,
            }

            /**
             * [
                {
                    game 1 data
                },
                {
                    game 2 data
                }
            ]
             */

            let oldData = await getJSONData('games')
            oldData.push(gameData)
            storeJSONData('games', oldData)

        }
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
            color: 'black'
        },
        titleText: {
            marginTop: 20,
            fontFamily: 'Lexend_400Regular', 
            fontSize: 30,
            padding: 10,
            color: 'black',
        },
        enterScoresContainer: {
            position:'absolute',
            alignSelf: 'center',
            marginBottom: 100,
            opacity: opacity,
        },
        enterScoresView: {
            marginTop: 10,
            backgroundColor: 'white',
            width: width * 0.9,
            borderRadius: 10,
            alignItems: 'center',
        },
        enterScoresController: {
            width: 360,
            marginBottom: 20,
            flexDirection:'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        enterScoresControllerLeft: {
            width: 360,
            flexDirection:'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        frameInput: {
            marginTop: 5,
            width:50,
            height:50,
            borderWidth: 1,
            alignSelf: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center'
        },
        frameReaderContainer: {
            marginBottom: 20
        },
        frameReader: {
            width:50,
            height:50,
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
            marginTop: 10,
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

    let initialFrameSymbol = symbols[frameToEdit - 1]
    let leftArrow = "<"
    let rightArrow = ">"

    return (
        
        <View style={styles.enterScoresContainer}>
            <View style={styles.enterScoresView}>
                <Text style={styles.titleText}>Enter a Score</Text>
                <TouchableOpacity>
                    <Text style={styles.backButton} onPress={() => router.push('/capture')}>{backToMenuText}</Text>
                </TouchableOpacity>
                <Scorecard
                    // ['X', '9-', '8/', 'X', 'X', '9/', '7-', 'X', '9/', '6/9']
                    symbols={symbols}
                    scores={scores}
                />

                <View style={styles.enterScoresController}>
                    <Text style={styles.controlLabel}>Frame to Edit</Text>
                    <View style={styles.enterScoresControllerLeft}>

                        <RoundButton onPress={handleLeftArrow} text="<" borderRadius={0} width={50} marginTop={10} shadowOpacity={0.0}></RoundButton>
                        <View style={styles.frameInput}>
                            <Text style={styles.frameReaderText}>{frameToEdit}</Text>
                        </View>
                        <RoundButton onPress={handleRightArrow} text=">" borderRadius={0} width={50} marginTop={10} shadowOpacity={0.0}></RoundButton>

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

                <RoundButton onPress={handleSubmit} color='#9900fe' text="Submit Score" textColor='white' width={200} margin={5} ></RoundButton>
            </View>

        </View>
    )
}