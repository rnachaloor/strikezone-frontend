import { StyleSheet, View, TextInput, Keyboard } from 'react-native';
import { useFonts, Montserrat_300Light } from "@expo-google-fonts/montserrat";

export default function RoundedTextInput({ onChangeText, value, placeholder, secureTextEntry = false}) {

    let [fontsLoaded] = useFonts({
        Montserrat_300Light,
    })

    if (!fontsLoaded) {
        return null
    }

    return (
        <View style={{paddingBottom: 10}}>
            <TextInput 
                style={styles.inputBox}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                onSubmitEditing={Keyboard.dismiss}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputBox: {
        backgroundColor: 'white',
        height: 40,
        borderRadius: 20,
        width: 265,
        color: 'black',
        paddingLeft: 10,
        fontFamily: 'Montserrat_300Light'
    }
})