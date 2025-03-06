import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const ReadSecond = ({ item }) => {
    const navigation = useNavigation();

    return (
        <LinearGradient colors={["#2925dd", "#fc4afc"]} style={{width: '100%', height: '100%'}}>
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
        </LinearGradient>
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