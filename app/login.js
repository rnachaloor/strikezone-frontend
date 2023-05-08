import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useFonts, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { useEffect, useState } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import RoundedTextInput from '../components/RoundedTextInput';
import RoundButton from '../components/RoundButton';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';

export default function App() {

    let [fontsLoaded] = useFonts({
        Montserrat_600SemiBold,
    }) 
    const [isLogIn, setIsLogIn] = useState(true)
    const [submitText, setSubmitText] = useState("Login")
    const [secondarySubmitText, setSecondarySubmitText] = useState("Don't Have an Account? Create One")
    const [signUpComponents, setComponent] = useState(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const router = useRouter()

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                router.push("home")
            }
        })
    })

    //no hooks beyond here

    if (!fontsLoaded) {
        return null;
    }

    const handleFormType = (bool) => {
        if (bool != isLogIn) {
            setIsLogIn(bool)
            if (isLogIn) {
                setSubmitText("Sign Up")
                setSecondarySubmitText("Already Have an Account? Login Here")
                let components = (
                    <View>
                        <RoundedTextInput 
                            onChangeText={setFirstName}
                            value={firstName}
                            placeholder="First Name"
                        />
                        <RoundedTextInput 
                            onChangeText={setLastName}
                            value={lastName}
                            placeholder="Last Name"
                        />
                    </View>
                )
                setComponent(components)
            } else {
                setSubmitText("Login")
                setSecondarySubmitText("Don't Have an Account? Create One")
                setComponent(null)
            }
        }
    }

    const submitHandler = () => {
        if (!isLogIn) {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCred) => {
                const user = userCred.user
                console.log(user.email)
            })
            .catch(error => {
                alert(error.message)
            })
            
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCred) => {
                    const user = userCred.user
                    console.log("logged in with " + user.email)
                })
                .catch(error => alert(error.message))
        }
        
    }

    return (
        <LinearGradient
            colors={['#3483eb', '#df34eb']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.container}>
            <SafeAreaView>
                <Text style={styles.titleText}>STRIKEZONE</Text>
                {signUpComponents}
                <RoundedTextInput 
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                />
                <RoundedTextInput 
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password"
                    secureTextEntry={true}
                />
                <RoundButton 
                    text={submitText}
                    color='#3483eb'
                    textColor='white'
                    onPress={submitHandler}
                />
                <RoundButton 
                    text={secondarySubmitText}
                    fontSize={12}
                    onPress={() => handleFormType(!isLogIn)}
                />
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
        paddingBottom: 20, 
        color: 'white'
    }
});