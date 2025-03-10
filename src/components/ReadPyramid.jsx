import React, { useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, FlatList, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Icons from "./Icons";

const { height, width } = Dimensions.get("window");

const ReadPyramid = ({ item }) => {
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / width);
        setCurrentIndex(index);
    };

    const renderItem = ({ item, index }) => (
        <ScrollView contentContainerStyle={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={{height: 100}} />
        </ScrollView>
    );

    const data = item.title.map((title, index) => ({
        title: item.title[index],
        description: item.description[index],
    }));

    return (
        <LinearGradient colors={["#2925dd", "#fc4afc"]} style={{ width: '100%', height: '100%' }}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Icons type={"back"} />
                </TouchableOpacity>

                <Image source={item.image} style={styles.image} />

                <Image source={require('../assets/decor/separator.png')} style={{width: '100%', height: 16, marginBottom: 20, resizeMode: 'contain', alignSelf: 'center'}} />

                <View style={styles.dotsContainer}>
                    {item.title.map((_, index) => (
                        <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
                    ))}
                </View>

                <FlatList
                    ref={flatListRef}
                    data={data}
                    renderItem={renderItem}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(_, index) => index.toString()}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: height * 0.07,
    },

    backBtn: {
        width: 40,
        height: 40,
        marginBottom: 20,
    },

    dotsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        position: 'absolute',
        top: height * 0.1,
        alignSelf: 'center'
    },

    dot: {
        width: 10,
        height: 10,
        borderRadius: 30,
        backgroundColor: "#767676",
        marginHorizontal: 7,
    },

    activeDot: {
        width: 12,
        height: 12,
        backgroundColor: "#fee64e",
    },

    slide: {
        width: width - 40,
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        fontSize: 24,
        fontWeight: '800',
        color: "#fce55a",
        marginBottom: 18,
        textAlign: 'center'
    },
    
    image: {
        width: '100%',
        resizeMode: "contain",
        marginBottom: 18,
    },

    description: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
        paddingHorizontal: 10,
        textAlign: 'justify'
    },

});

export default ReadPyramid;
