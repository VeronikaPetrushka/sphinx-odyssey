import React, { useState } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ImageBackground } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import pyramids from "../constants/pyramids";

const { height } = Dimensions.get('window');

const Pyramids = () => {
    const navigation = useNavigation();
    const [index, setIndex] = useState(0);
    const [selected, setSelected] = useState(null);

    const handleNext = () => {
        if(index === 1 && selected) {
            navigation.navigate('ReadPyramidScreen', {item: selected})
        } else {
            setIndex((prevIndex) => (prevIndex + 1) % 2);
        }
    };

    return (
        <ImageBackground source={require('../assets/back/1.png')} style={{flex: 1}}>
            <View style={styles.container}>

                {
                    index === 0 && (
                        <View style={{width: '100%', flexGrow: 1, alignItems: 'center'}}>
                            <Image source={require('../assets/decor/pyramids-intro.png')} style={{width: 270, height: 320, resizeMode: 'contain', alignSelf: 'flex-end'}} />
                            <Image source={require('../assets/sphinx.png')} style={{width: 248, height: height * 0.27, resizeMode: 'contain', alignSelf: 'flex-start', position: 'absolute', left: -60, bottom: height * 0.23}} />
                        </View>
                    )
                }

                {
                    index === 1 && (
                        <ScrollView contentContainerStyle={{width: '100%', alignItems: 'center'}}>
                            <View style={{width: '100%', flexDirection: 'row'}}>
                                <Image source={require('../assets/sphinx.png')} style={{width: 248, height: 248, resizeMode: 'contain',position:'absolute', left: -70}} />
                                <View style={{width: 250, height: 120, position: 'absolute', right: 0}}>
                                    <Image source={require('../assets/decor/text-wrap.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
                                    <Text style={styles.text}>{selected ? selected.name : 'Press the pyramid to uncover its secrets!'}</Text>
                                </View>
                            </View>
                            <View style={styles.pyrContainer}>
                                <LinearGradient colors={["#2925dd", "#fc4afc"]}>
                                    <View style={styles.pyrInner}>
                                        {
                                            pyramids.map((item, index) => (
                                                <TouchableOpacity key={index} onPress={() => setSelected(item)}>
                                                    <Image source={item.pyramid} style={{width: height * 0.110, height: height * 0.110, resizeMode: 'contain', margin: 5}} />
                                                </TouchableOpacity>
                                            ))
                                        }
                                    </View>
                                </LinearGradient>
                            </View>
                            <Image source={selected ? selected.pyramid : require('../assets/pyramids/unknown.png')} style={{width: height * 0.110, height: height * 0.110, resizeMode: 'contain', marginTop: 20, alignSelf: 'center'}} />
                            <View style={{height: 170}} />
                        </ScrollView>
                    )
                }

                <TouchableOpacity style={styles.btn} onPress={handleNext}>
                    <LinearGradient colors={["#fee64e", "#b95918"]} style={styles.btn}>
                        <Text style={styles.btnText}>{index === 0 ? 'Sphinx Awaits!' : 'Learn more'}</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: height * 0.07,
    },

    text: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        position: 'absolute',
        top: 40,
        right: 18,
        width: '70%',
        textAlign: 'center'
    },

    pyrContainer: {
        marginTop: height * 0.18,
        width: '100%',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#fee64e',
        shadowColor: '#FFA500',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.3,
        shadowRadius: 7,
        overflow: 'hidden'
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
        borderRadius: 100,
        position: 'absolute',
        bottom: height * 0.06,
        alignSelf: 'center',
        zIndex: 10
    },

    btnText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#261в07',
        lineHeight: 21.6
    }

})

export default Pyramids;