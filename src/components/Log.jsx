import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, TextInput, Alert, ImageBackground } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchImageLibrary } from "react-native-image-picker";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const Log = () => {
    const navigation = useNavigation();
    const [index, setIndex] = useState(0);
    const [profile, setProfile] = useState(false);
    const [image, setImage] = useState(require('../assets/user.png'));
    const [nickname, setNickname] = useState(null);
    const [age, setAge] = useState(null);

    const loadProfile = async () => {
        try {
            const storedProfile = await AsyncStorage.getItem("profile");
            if (storedProfile) {
                const profile = JSON.parse(storedProfile);
                if (profile) {
                    setProfile(true);
                }
            }
        } catch (error) {
            console.error("Error loading profile:", error);
        }
    };    

    useEffect(() => {
        loadProfile();
    }, []);    

    const handleNext = () => {
        if(profile) {
            navigation.navigate('TopicScreen')
        } else {
            setIndex((prevIndex) => (prevIndex + 1) % 2);
            if(index === 1) {
                createProfile();
            }    
        }
    };

    const uploadAvatar = async () => {
        try {
            const result = await new Promise((resolve, reject) => {
                launchImageLibrary({ mediaType: "photo", quality: 0.8 }, ({ assets, errorMessage }) => {
                    if (errorMessage) reject(errorMessage);
                    else resolve(assets?.[0]?.uri || null);
                });
            });
    
            if (result) setImage(result);
        } catch (error) {
            Alert.alert("Error", "Failed to select image.");
        }
    };

    const createProfile = async () => {
        if (!nickname || !age || !image) {
            Alert.alert("Error", "Please fill in all fields to create your account");
            return;
        }        
        try {
            const profileData = {
                image: image,
                nickname,
                age,
            };
            await AsyncStorage.setItem("profile", JSON.stringify(profileData));
            setProfile(true);
            navigation.navigate('TopicScreen')
            console.log("Profile saved:", profileData);
        } catch (error) {
            console.error("Error saving profile:", error);
        }
    };

    return (
        <ImageBackground source={require('../assets/back/1.png')} style={{flex: 1}}>
            <View style={styles.container}>

                {
                    index === 0 && (
                        <View style={{width: '100%', alignItems: 'center'}}>
                            <Image source={require('../assets/logo.png')} style={{width: 195, height: 100, resizeMode: 'contain', marginBottom: height * 0.1, marginTop: height * 0.2}} />
                            <Text style={styles.text}>Dive into the world of the Sphinx, solve its riddles, and uncover hidden secrets. Explore myths and legends associated with this enigmatic creature, learn about its role in ancient civilizations, and battle enemies in an exciting mini-game. The Sphinx awaits for you to reveal all its mysteries!</Text>
                        </View>
                    )
                }

                {
                    index === 1 && (
                        <View style={{width: '100%', alignItems: 'center', flexGrow: 1}}>
                            <TouchableOpacity style={styles.shadow} onPress={uploadAvatar}>
                                <Image 
                                    source={typeof image === "string" ? { uri: image } : image} 
                                    style={styles.imageContainer} 
                                    />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.input}
                                placeholder="Nickname"
                                placeholderTextColor="#f0e1bc"
                                value={nickname}
                                onChangeText={setNickname}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Age"
                                placeholderTextColor="#f0e1bc"
                                value={age}
                                onChangeText={setAge}
                            />
                        </View>
                    )
                }

                <TouchableOpacity style={styles.btn} onPress={handleNext}>
                    <LinearGradient colors={["#fee64e", "#b95918"]} style={styles.btn}>
                        <Text style={styles.btnText}>{index === 0 ? 'Let`s start' : 'Create account'}</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 40,
        paddingTop: height * 0.07,
    },

    image: {
        resizeMode: 'contain',
        marginBottom: height * 0.09,
    },

    text: {
        fontWeight: '700',
        fontSize: 18,
        color: '#fff',
        lineHeight: 21.6,
        textAlign: 'center'
    },

    shadow: {
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#FFA500',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.6,
        shadowRadius: 30,
        marginVertical: 50
    },

    imageContainer: {
        width: 135,
        height: 135,
        borderRadius: 300,
        backgroundColor: '#FFA500',
        padding: 6,
    },

    input: {
        width: 280, 
        borderRadius: 23,
        backgroundColor: '#535353',
        borderWidth: 1,
        borderColor: '#fee64e',
        padding: 17,
        marginBottom: 20,
        color: '#f0e1bc',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 21.6,
        textAlign: 'center'
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
    }

})

export default Log;