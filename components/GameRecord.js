import { useFonts, Montserrat_400Regular, Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from "react-native-elements";

export default function GameRecord() {
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_500Medium
    })

    if (!fontsLoaded) {
        return null
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.attributeTitle}>Score</Text>
                <Text style={styles.attribute}>186</Text>
            </View>
            <View>
                <Text style={styles.attributeTitle}>Strike %</Text>
                <Text style={styles.attribute}>30</Text>
            </View>
            <View>
                <Text style={styles.attributeTitle}>Spare %</Text>
                <Text style={styles.attribute}>30</Text>
            </View>
            <TouchableOpacity>
                <Icon name="add-outline" type="ionicon" color='black'/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    attributeTitle: {
        fontFamily: 'Montserrat_500Medium', 
        fontSize: 20,
        paddingRight: 15,
        paddingLeft: 15,
        color: 'black'
    },
    attribute: {
        fontFamily: 'Montserrat_600SemiBold', 
        fontSize: 40,
        alignSelf: 'center',
        color: 'black'
    }
})