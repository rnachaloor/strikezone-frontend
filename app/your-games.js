import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, Dimensions, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts, Montserrat_600SemiBold, Montserrat_400Regular, Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import { Lexend_400Regular, Lexend_500Medium } from '@expo-google-fonts/lexend';
import { LinearGradient } from "expo-linear-gradient";
import RoundButton from '../components/RoundButton';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import GameRecord from '../components/GameRecord';


export default function App() {

    let backToMenuText = "< Main Menu"
    const router = useRouter()

    return (
        <LinearGradient
            colors={['#3c79d7', '#c27b9f']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1.5}}
            style={styles.container}>

            <Button title='Back' color='black' style={styles.backButton}/>

            <ScrollView style={styles.gameViewContainer}>
                <Text style={styles.titleText}>Your Games</Text>
                <TouchableOpacity>
                    <Text style={styles.backButton} onPress={() => router.push('/')}>{backToMenuText}</Text>
                </TouchableOpacity>
                <Text style={styles.dateText}>May 12, 2023</Text>
                <GameRecord/>
                <GameRecord/>
                <GameRecord/>
                <GameRecord/>
                <Text style={styles.dateText}>May 10, 2023</Text>
                <GameRecord/>
                <GameRecord/>
                <GameRecord/>
                <GameRecord/>
                <GameRecord/>
                <Text style={styles.dateText}>May 4, 2023</Text>
                <GameRecord/>
                <GameRecord/>
            </ScrollView>

        </LinearGradient>
    )
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent:'flex-start'
    },
    backButton: {
        paddingLeft: 10,
        marginBottom: 5,
        color: 'white'
    },
    titleText: {
        marginTop:40,
        fontFamily: 'Lexend_400Regular', 
        fontSize: 30,
        padding: 10,
        color: 'white',
    },
    dateText: {
        fontFamily: 'Lexend_400Regular', 
        fontSize: 15,
        padding: 10,
        color: 'white',
    },
    gameViewContainer: {
    },
    navBar: {
        backgroundColor: 'white',
        height:80, 
        width: width * 1
    }
})