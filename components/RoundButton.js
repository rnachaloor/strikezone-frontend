import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";

export default function RoundButton({ onPress, text, width = 265, height = 50, color = 'white', textColor = 'black', fontSize=14}) {
    
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
    })

    if (!fontsLoaded) {
        return null
    }

    const styles = StyleSheet.create({
        container: {
            width: width,
            height: height,
            backgroundColor: color,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
        },
        textStyle: {
            fontFamily: 'Montserrat_400Regular',
            color: textColor,
            fontSize: fontSize
        }
    })

    return (
        <View style={{paddingBottom: 10}}>
            <TouchableOpacity
                onPress={onPress}
                style={styles.container}
            >
                <Text style={styles.textStyle}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}