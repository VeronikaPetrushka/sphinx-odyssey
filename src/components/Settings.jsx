import React, { useState } from "react"
import { View, Text, TouchableOpacity, Alert, StyleSheet, Dimensions, Switch, Image } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";
import { useMusic } from '../constants/music.js';

const { height } = Dimensions.get('window');

const Settings = () => {
    const { isPlaying, togglePlay } = useMusic();
    const [vibro, setVibro] = useState(true);

    const resetProgress = async () => {
        try {
            await AsyncStorage.removeItem("profile");
            Alert.alert("Success", "All game data has been reset.");
        } catch (error) {
            console.error("Failed to reset progress", error);
            Alert.alert("Error", "Failed to reset data.");
        }
    };

    const toggleVibro = () => {
        if(vibro) {
            setVibro(false)
        } else {
            setVibro(true)
        }
    }
    

    return (
        <LinearGradient colors={["#2925dd", "#fc4afc"]} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>

                <Image source={require('../assets/sphinx.png')} style={{width: 248, height: 248, resizeMode: 'contain', alignSelf: 'center', marginBottom: 20}} />

                <View style={styles.pyrContainer}>
                    <LinearGradient colors={["#2925dd", "#fc4afc"]}>
                        <View style={styles.pyrInner}>
                            <Text style={styles.title}>Music</Text>
                            <Switch value={isPlaying} onValueChange={togglePlay} thumbColor="#f2b33e" trackColor={{ false: "#ccc", true: "#fce54a" }} />
                        </View>
                        <View style={styles.pyrInner}>
                            <Text style={styles.title}>Vibration</Text>
                            <Switch value={vibro} onValueChange={toggleVibro} thumbColor="#f2b33e" trackColor={{ false: "#ccc", true: "#fce54a" }} />
                        </View>
                    </LinearGradient>
                </View>


                <TouchableOpacity style={styles.btn} onPress={resetProgress}>
                    <LinearGradient colors={["#fee64e", "#b95918"]} style={styles.btn}>
                        <Text style={styles.btnText}>Reset Progress</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>
        </LinearGradient>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 40,
        paddingTop: height * 0.07,
    },

    title: {
        fontSize: 26,
        fontWeight: '900',
        color: '#fff',
    },

    pyrContainer: {
        width: '100%',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#fee64e',
        shadowColor: '#FFA500',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.3,
        shadowRadius: 7,
        overflow: 'hidden',
        marginBottom: height * 0.09
    },

    pyrInner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: 17
    },

    btn: {
        width: 280,
        height: 57,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    },

    btnText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#261в07',
        lineHeight: 21.6
    },

})

export default Settings;