import { StyleSheet, TouchableOpacity, Text, View, Dimensions, TouchableHighlight, SectionList } from 'react-native';
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { Lexend_400Regular, Lexend_500Medium } from '@expo-google-fonts/lexend';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { storeJSONData, getJSONData, getStringData } from "../async-functions";
import { Device } from "expo-device"
import Scorecard from './Scorecard';
import RoundButton from './RoundButton';
import GameRecord from './GameRecord';

export default async function ScoreList() {

    const [objList, setObjList] = useState([])
    const [obj, setObj] = useState({})
    const [lastDate, setLastDate] = useState("")

    useEffect(async () => {
        const gameData = await getJSONData('games')
        gameData.forEach(data => {
            if (data.gameDate !== lastDate) {
                setLastDate(data.gameDate);
                dateArr = lastDate.split('-')
                months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                setObjList(curr => [...curr, obj])
                setObj({
                    title: alert(months[dateArr[2]] + ' ' + dateArr[1] + ', ' + dateArr[0]),
                    data: []
                })
            }
            setObj({
                title: obj.title,
                data: [...obj.data, data]
            })
        });
    })

    return (
        <SectionList
            sections={objList}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => {
                <GameRecord
                    
                />
            }}
            renderSectionHeader={({section: {title}}) => {
                <Text>{title}</Text>
            }}
        />
    )


}