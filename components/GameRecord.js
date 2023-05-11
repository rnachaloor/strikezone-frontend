import { useFonts, Montserrat_400Regular, Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import { Lexend_400Regular, Lexend_500Medium } from '@expo-google-fonts/lexend';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { Icon } from "react-native-elements";

export default function GameRecord() {
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_500Medium,
        Lexend_400Regular
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

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: width * 0.9,
        marginTop: 0,
        marginBottom: 6
    },
    attributeTitle: {
        fontFamily: 'Lexend_400Regular', 
        fontSize: 12,
        paddingRight: 15,
        paddingLeft: 15,
        color: 'grey'
    },
    attribute: {
        fontFamily: 'Montserrat_500Medium', 
        fontSize: 30,
        alignSelf: 'center',
        color: 'black'
    }
})