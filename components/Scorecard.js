import { StyleSheet, TouchableOpacity, Text, View, TouchableHighlight } from 'react-native';
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { useState, useRef } from 'react';
import FrameUpper from '../components/FrameUpper';
import FrameLower from '../components/FrameLower';

export default function Scorecard ({ scorecardSymbols, scorecardScores }) {

    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
    })

    if (!fontsLoaded) {
        return null
    }

    const styles = StyleSheet.create({
        container: {
            marginTop: 20,
            marginBottom: 20,
            width: 350,
            flexDirection: 'row',
            flexWrap: 'wrap'
        },
        frameHeader: {
            width: 35,
            height:20,
        },
        frameLower: {
            width: 35,
            height:30,
            borderColor: 'black',
            alignItems:'center',
            justifyContent: 'center'
        }
    })

    const checkIfNaN = (item) => {
        if (isNaN(item)) {
            return ""
        }
        return item
    }

    const getSymbols = () => {
        console.log("We are in Scorecard.js, symbols is")
        console.log(scorecardSymbols)
        return scorecardSymbols
    }

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

            {scorecardSymbols.map((item, index) => (
                <FrameUpper key={index} symbol={item}/>
            ))}

            {scorecardScores.map((item, index) => (
                <FrameLower key={index} score={checkIfNaN(item)}/>
            ))}
        </View>
    )
}