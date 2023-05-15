import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, Dimensions, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts, Montserrat_600SemiBold, Montserrat_400Regular, Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import { Lexend_400Regular, Lexend_500Medium } from '@expo-google-fonts/lexend';
import { LinearGradient } from "expo-linear-gradient";
import RoundButton from '../components/RoundButton';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GameRecord from '../components/GameRecord';
import Scorecard from '../components/Scorecard';


export default function App() {

    let backToMenuText = "< Capture"
    const router = useRouter()

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
                    <Scorecard></Scorecard>
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
        height: 200,
        borderRadius: 10,
        alignItems: 'center'
    }
})
