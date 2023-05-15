import { StyleSheet, TouchableOpacity, Text, View, TouchableHighlight } from 'react-native';
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";

export default function Scorecard () {

    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
    })

    if (!fontsLoaded) {
        return null
    }

    const styles = StyleSheet.create({
        container: {
            marginTop: 10,
            width: 350,
            flexDirection: 'row',
            flexWrap: 'wrap'
        },
        frameHeader: {
            width: 35,
            height:20,
        },
        frameUpper: {
            width: 35,
            height:30,
            borderColor: 'black',
            alignItems:'center',
            justifyContent: 'center'
        },
        frameLower: {
            width: 35,
            height:30,
            borderColor: 'black',
            alignItems:'center',
            justifyContent: 'center'
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.frameHeader}>
                <Text style={{  alignSelf: 'center' }}>1</Text>
            </View>
            <View style={styles.frameHeader}>
                <Text style={{  alignSelf: 'center' }}>2</Text>
            </View>
            <View style={styles.frameHeader}>
                <Text style={{  alignSelf: 'center' }}>3</Text>
            </View>
            <View style={styles.frameHeader}>
                <Text style={{  alignSelf: 'center' }}>4</Text>
            </View>
            <View style={styles.frameHeader}>
                <Text style={{  alignSelf: 'center' }}>5</Text>
            </View>
            <View style={styles.frameHeader}>
                <Text style={{  alignSelf: 'center' }}>6</Text>
            </View>
            <View style={styles.frameHeader}>
                <Text style={{  alignSelf: 'center' }}>7</Text>
            </View>
            <View style={styles.frameHeader}>
                <Text style={{  alignSelf: 'center' }}>8</Text>
            </View>
            <View style={styles.frameHeader}>
                <Text style={{  alignSelf: 'center' }}>9</Text>
            </View>
            <View style={styles.frameHeader}>
                <Text style={{  alignSelf: 'center' }}>10</Text>
            </View>
            <TouchableOpacity style={styles.frameUpper}>
                <Text>X</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.frameUpper}>
                <Text>9 -</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.frameUpper}>
                <Text>6 /</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.frameUpper}>
                <Text>X</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.frameUpper}>
                <Text>9 /</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.frameUpper}>
                <Text>7 /</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.frameUpper}>
                <Text>8 /</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.frameUpper}>
                <Text>6 3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.frameUpper}>
                <Text>8 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.frameUpper}>
                <Text>X8/</Text>
            </TouchableOpacity>
            <View style={styles.frameLower}>
                <Text>19</Text>
            </View>
            <View style={styles.frameLower}>
                <Text>28</Text>
            </View>
            <View style={styles.frameLower}>
                <Text>48</Text>
            </View>
            <View style={styles.frameLower}>
                <Text>68</Text>
            </View>
            <View style={styles.frameLower}>
                <Text>85</Text>
            </View>
            <View style={styles.frameLower}>
                <Text>103</Text>
            </View>
            <View style={styles.frameLower}>
                <Text>119</Text>
            </View>
            <View style={styles.frameLower}>
                <Text>128</Text>
            </View>
            <View style={styles.frameLower}>
                <Text>137</Text>
            </View>
            <View style={styles.frameLower}>
                <Text>157</Text>
            </View>
        </View>
    )
}