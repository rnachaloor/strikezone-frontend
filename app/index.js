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
        Lexend_400Regular,
        Montserrat_600SemiBold
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
            colors={['#3c79d7', '#c27b9f']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1.5}}
            style={styles.container}>
            <Text style={styles.titleText}>STRIKEZONE</Text>
            <RoundButton text="Capture"/>
            <RoundButton text="My Games"/>
            <RoundButton text="My Stats"/>
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
                        <Text style={styles.attributeTitle}>AVERAGE SCORE</Text>
                        <Text style={styles.attribute}>132</Text>
                    </View>
                </View>
                <View style={styles.attributeContainer}>
                    <View style={styles.attributeRow}>
                        <Text style={styles.attributeTitle}>MEDIAN SCORE</Text>
                        <Text style={styles.attribute}>125</Text>
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
        justifyContent: 'flex-end',

    },
    titleText: {
        fontFamily: 'Montserrat_600SemiBold', 
        fontWeight:700,
        fontSize: 40,
        padding: 10,
        color: 'white',
        alignSelf: "center"
    },
    homepageStatsContainer: {
        width: width * 0.8,
        marginTop: 80,
        marginBottom: 120,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:'flex-start',
    },
    attributeTitle: {
        fontFamily: 'Lexend_400Regular', 
        fontSize: 13,
        paddingRight: 15,
        color: 'white'
    },
    attribute: {
        fontSize: 30,
        alignSelf: 'auto',
        color: 'white',
    },
    attributeContainer: {
        justifyContent: 'space-between',
        margin: 10,
        width: width * 0.30,
        marginRight: 30,
    },
    
});