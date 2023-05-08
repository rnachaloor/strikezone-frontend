import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { useFonts, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { LinearGradient } from "expo-linear-gradient";
import RoundButton from '../components/RoundButton';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';


export default function App() {

    let [fontsLoaded] = useFonts({
        Montserrat_600SemiBold,
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
            colors={['#3483eb', '#df34eb']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.container}>
            <SafeAreaView>
                <Text style={styles.titleText}>STRIKEZONE</Text>
                <View style={styles.attributeContainer}>
                    <View style={styles.attributeRow}>
                        <Text style={styles.attributeTitle}>Games Played</Text>
                        <Text style={styles.attribute}>11</Text>
                    </View>
                    <View>
                        <Text style={styles.attributeTitle}>High Score</Text>
                        <Text style={styles.attribute}>186</Text>
                    </View>
                </View>
                <View style={styles.attributeContainer}>
                    <View>
                        <Text style={styles.attributeTitle}>Game Average</Text>
                        <Text style={styles.attribute}>11</Text>
                    </View>
                    <View>
                        <Text style={styles.attributeTitle}>Game Median</Text>
                        <Text style={styles.attribute}>11</Text>
                    </View>
                </View>
                <StatusBar style="auto" />
            </SafeAreaView>
        </LinearGradient>
    );
}

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
    attributeTitle: {
        fontFamily: 'Montserrat_600SemiBold', 
        fontSize: 20,
        paddingRight: 15,
        color: 'white'
    },
    attribute: {
        fontFamily: 'Montserrat_600SemiBold', 
        fontSize: 40,
        alignSelf: 'center',
        color: 'white'
    },
    attributeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    
});