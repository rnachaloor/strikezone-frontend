import { StyleSheet, TouchableOpacity, Text, View, TouchableHighlight } from 'react-native';
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { useState, useRef } from 'react';


export default function FrameUpper ({ symbol }) {
    const styles = StyleSheet.create({
        frameUpper: {
            width: 35,
            height:30,
            borderColor: 'black',
            alignItems:'center',
            justifyContent: 'center'
        },
    })

    return (
        <View style={styles.frameUpper}>
            <Text>{symbol}</Text>
        </View>
    )
}
