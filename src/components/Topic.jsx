import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Button } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import mythology from "../constants/mythology";

const { height } = Dimensions.get('window');

const Topic = () => {
    const navigation = useNavigation();

    return (
        <LinearGradient colors={["#2925dd", "#fc4afc"]} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>

                {
                    mythology.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.btn} onPress={() => navigation.navigate('SelectedTopicScreen', {item: item})}>
                            <Text style={styles.btnText}>{item.topic.toUpperCase()}</Text>
                        </TouchableOpacity>
                    ))
                }

            </View>
        </LinearGradient>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        paddingTop: height * 0.07,
    },

    btn: {
        width: '100%',
        height: height * 0.17,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#fee64e',
        shadowColor: '#FFA500',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.9,
        shadowRadius: 7,
        marginBottom: 30,
        padding: 40
    },

    btnText: {
        fontSize: 24,
        fontWeight: '800',
        color: '#fee64e',
        textAlign: 'center'
    }

})

export default Topic;