import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ImageBackground } from "react-native"
import { useNavigation } from "@react-navigation/native";
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const ReadSecond = ({ item }) => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../assets/back/2.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <TouchableOpacity style={{width: 40, height: 40, marginBottom: 20}} onPress={() => navigation.goBack('')}>
                    <Icons type={'back'} />
                </TouchableOpacity>

                <Image source={item.image} style={{width: '100%', height: 250, resizeMode: 'contain', marginBottom: 32}} />

                <ScrollView style={{width: '100%'}}>
                    {
                        item.content.map((desc, i) => (
                            <Text style={styles.text} key={i}>{desc}</Text>
                        ))
                    }
                    <View style={{height: 100}} />
                </ScrollView>

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
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 20
    },

})

export default ReadSecond;