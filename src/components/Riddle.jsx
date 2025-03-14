import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground, Modal, ScrollView } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import riddles from "../constants/riddles";

const { height } = Dimensions.get('window');

const Riddle = () => {    
    const [index, setIndex] = useState(0);
    const [started, setStarted] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState("");
    const [showInfo, setShowInfo] = useState(false);

    const handleNext = () => {
        if (index === 1) {
            setStarted(true);
        } else {
            setIndex((prevIndex) => (prevIndex + 1) % 2);
        }
    };

    const handleOptionPress = (option) => {
        setSelectedOption(option);
        if (option === riddles[index].correct) {
            setTimeout(() => {
                setModalText("You answered correctly! The Sphinx could not exist without human intellect.");
                setShowModal(true);
                setShowInfo(true);
            }, 1000);
        } else {
            setTimeout(() => {
                setModalText("That’s not the solution. Give it another go!");
                setShowModal(true);
                setShowInfo(false);
            }, 1000);
        }
    };

    const handleContinue = () => {
        setShowModal(false);
        setSelectedOption(null);

        if (showInfo) {
            if (index < riddles.length - 1) {
                setIndex(index + 1);
            } else {
                setModalText(
                    "You have unlocked the secrets of the Sphinx, but remember, the journey never ends. The mysteries of Ancient Egypt are vast, and every discovery is just the beginning. Keep exploring, for the sands of time will always hold more to uncover."
                );
            }
        }
    };

    const handleTryAgain = () => {
        setShowModal(false);
        setSelectedOption(null);
        setShowInfo(false);
    };
    
    const handleBackToStart = () => {
        setIndex(0);
        setShowModal(false);
        setSelectedOption(null);
        setShowInfo(false);
    };    

    return (
        <>
            {
                started ? (
                         <ImageBackground source={riddles[index]?.background} style={{ flex: 1 }}>
                            <View style={styles.container}>

                                <Image source={riddles[index]?.riddle}  style={{width: 270, height: 320, resizeMode: 'contain', alignSelf: 'flex-end', position: 'absolute', right: 0}} />
                                <Image source={require('../assets/sphinx.png')} style={{width: 248, height: height * 0.25, resizeMode: 'contain', alignSelf: 'flex-start', position: 'absolute', left: -50, top: height * 0.23}} />
                                
                                <View style={styles.optionsContainer}>

                                    {riddles[index]?.options.map((option, idx) => (
                                        <TouchableOpacity
                                            key={idx}
                                            style={styles.option}
                                            onPress={() => handleOptionPress(option)}
                                            disabled={selectedOption !== null}
                                        >
                                            <LinearGradient colors={
                                                    selectedOption === option
                                                        ? option === riddles[index].correct
                                                            ? ["#4CAF50", "#2E7D32"]
                                                            : ["#D32F2F", "#B71C1C"]
                                                        : ["#fee64e", "#b95918"]
                                                } style={styles.option}
                                                >
                                                <Text style={styles.btnText}>{option}</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    ))}

                                </View>

                            </View>
                        </ImageBackground>
                ) : (
                        <ImageBackground source={require('../assets/back/1.png')} style={{flex: 1}}>
                            <View style={styles.container}>
                
                                <View style={{width: '100%', flexGrow: 1, alignItems: 'center'}}>
                                    <Image source={index === 0 
                                            ? require('../assets/riddle/text1.png') 
                                            : require('../assets/riddle/text2.png')
                                        }
                                        style={{width: 270, height: 320, resizeMode: 'contain', alignSelf: 'flex-end', position: 'absolute', right: -20}} />
                                    <Image source={require('../assets/sphinx.png')} style={{width: 248, height: height * 0.27, resizeMode: 'contain', alignSelf: 'flex-start', position: 'absolute', left: -80, bottom: height * 0.18}} />
                                </View>
                
                                <TouchableOpacity style={styles.btn} onPress={handleNext}>
                                    <LinearGradient colors={["#fee64e", "#b95918"]} style={styles.btn}>
                                        <Text style={styles.btnText}>{index === 0 ? 'Begin the journey' : 'Ask me a riddle'}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                
                            </View>
                        </ImageBackground>
                )
            }

            <Modal visible={showModal} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <LinearGradient colors={["#2925dd", "#fc4afc"]}>
                            <View style={styles.modalContentInner}>
                                <ScrollView style={{width: '100%'}}>
                                    <Text style={styles.modalText}>{modalText}</Text>
                                    {showInfo ? (
                                        <>
                                            <Image source={require('../assets/riddle/correct.png')}
                                                style={{ width: '100%', height: 307, resizeMode: 'contain', marginVertical: 15}}
                                            />
                                            <Text style={styles.modalTitle}>{riddles[index]?.title}</Text>
                                            <Text style={styles.modalInfo}>{riddles[index]?.info}</Text>
                                            <TouchableOpacity style={styles.option} onPress={index < riddles.length - 1 ? handleContinue : handleBackToStart}>
                                                <LinearGradient colors={["#fee64e", "#b95918"]} style={styles.option}>
                                                    <Text style={styles.btnText}>
                                                        {index < riddles.length - 1 ? "Continue" : "Back to Start"}
                                                    </Text>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                        </>
                                    ) : (
                                        <>
                                            <Image source={require('../assets/riddle/wrong.png')}
                                                style={{ width: '100%', height: 307, resizeMode: 'contain', marginVertical: 15}}
                                            />
                                            <TouchableOpacity style={styles.option} onPress={handleTryAgain}>
                                                <LinearGradient colors={["#fee64e", "#b95918"]} style={styles.option}>
                                                    <Text style={styles.btnText}>Try again</Text>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                        </>
                                    )}
                                </ScrollView>
                            </View>
                        </LinearGradient>
                    </View>
                </View>
            </Modal>

        </>
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
        fontSize: 28,
        fontWeight: '900',
        color: '#fff',
        marginRight: '35%'
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
    },

    optionsContainer: {
        position: 'absolute',
        bottom: height * 0.12
    },

    option: {
        width: 280,
        height: 57,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        marginBottom: 12,
        alignSelf: 'center',
        zIndex: 10
    },

    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
    },

    modalContent: {
        width: '85%',
        maxHeight: '70%',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#fee64e',
        shadowColor: '#FFA500',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.3,
        shadowRadius: 7,
        overflow: 'hidden'
    },

    modalContentInner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: 17
    },

    modalText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
        color: '#fff'
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
        textAlign: "center",
        color: '#fff'
    },

    modalInfo: {
        fontSize: 16,
        textAlign: "center",
        marginVertical: 10,
        color: '#fff',
        marginBottom: 30
    },

})

export default Riddle;