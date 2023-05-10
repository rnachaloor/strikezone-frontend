import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, Dimensions } from 'react-native';
import { useFonts, Montserrat_600SemiBold, Montserrat_400Regular, Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import { Lexend_400Regular, Lexend_500Medium } from '@expo-google-fonts/lexend';
import { LinearGradient } from "expo-linear-gradient";
import RoundButton from '../components/RoundButton';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import GameRecord from '../components/GameRecord';


export default function App() {

    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_500Medium,
        Lexend_400Regular
    })

    const router = useRouter()

    //no hooks beyond here

    if (!fontsLoaded) {
        return null;
    }

    const handleSignOut = () => {
        signOut(auth).then(() => {
            router.push("/")
        }).catch(error => alert(error.message))
    }

    return (
        <LinearGradient
            colors={['#c27b9f', '#3c79d7']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.container}>
            <Text style={styles.titleText}>STRIKEZONE</Text>
            <SafeAreaView style={styles.homepageStatsContainer}>
                <View style={styles.attributeContainer}>
                    <View style={styles.attributeRow}>
                        <Text style={styles.attributeTitle}>GAMES PLAYED</Text>
                        <Text style={styles.attribute}>11</Text>
                    </View>
                </View>
                <View style={styles.attributeContainer}>
                    <View>
                        <Text style={styles.attributeTitle}>HIGH SCORE</Text>
                        <Text style={styles.attribute}>186</Text>
                    </View>
                </View>
                <View style={styles.attributeContainer}>
                    <View style={styles.attributeRow}>
                        <Text style={styles.attributeTitle}>GAMES PLAYED</Text>
                        <Text style={styles.attribute}>11</Text>
                    </View>
                </View>
                <View style={styles.attributeContainer}>
                    <View style={styles.attributeRow}>
                        <Text style={styles.attributeTitle}>GAMES PLAYED</Text>
                        <Text style={styles.attribute}>11</Text>
                    </View>
                </View>
                {/* <GameRecord /> */}
                <StatusBar style="auto" />
            </SafeAreaView>
        </LinearGradient>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontFamily: 'Montserrat_600SemiBold', 
        fontSize: 40,
        paddingBottom: 100,
        color: 'white',
        alignSelf: "center"
    },
    homepageStatsContainer: {
        width: width * 0.8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:'flex-start'
    },
    attributeTitle: {
        fontFamily: 'Lexend_400Regular', 
        fontSize: 13,
        paddingRight: 15,
        color: 'white'
    },
    attribute: {
        fontFamily: 'Montserrat_600SemiBold', 
        fontSize: 30,
        alignSelf: 'auto',
        color: 'white',
    },
    attributeContainer: {
        justifyContent: 'space-between',
        margin: 10,
        marginRight: 40,
    },
    
});