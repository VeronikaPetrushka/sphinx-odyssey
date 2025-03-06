import React, { useState } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const SelectedTopic = ({ item }) => {
    const navigation = useNavigation();

    const handleNavigate = (selected) => {
        if(item.topic === 'The Enigma of the Sphinx') {
            navigation.navigate('ReadFirstScreen', {item: selected})
        } else {
            navigation.navigate('ReadSecondScreen', {item: selected})
        }
    }

    return (
        <LinearGradient colors={["#2925dd", "#fc4afc"]} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>

                {
                    item.topic === 'The Enigma of the Sphinx' ? (
                        <ScrollView style={{width: '100%'}}>
                            {
                                item.items.map((i, index) => (
                                    <TouchableOpacity 
                                        key={index} 
                                        style={{marginBottom: 20, width: '100%', alignItems: 'center'}}
                                        onPress={() => handleNavigate(i)}
                                        >
                                        <Image source={i.image} style={{width: '100%', height: 166, resizeMode: 'contain', marginBottom: 10}} />
                                        <Text style={styles.text}>{i.name}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                            <View style={{height: 100}} />
                        </ScrollView>
                    ) : (
                        <ScrollView style={{width: '100%'}}>
                            {
                                item.items.map((i, index) => (
                                    <TouchableOpacity 
                                        key={index}
                                        style={styles.btn} 
                                        onPress={() => handleNavigate(i)}
                                        >
                                        <Text style={styles.btnText}>{i.name}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                            <View style={{height: 100}} />
                        </ScrollView>
                    )
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
        paddingHorizontal: 40,
        paddingTop: height * 0.07,
    },

    text: {
        fontSize: 24,
        fontWeight: '800',
        color: '#fff',
        textAlign: 'center'
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

export default SelectedTopic;