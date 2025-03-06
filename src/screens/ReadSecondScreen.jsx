import { View } from "react-native"
import ReadSecond from "../components/ReadSecond"
import Menu from "../components/Menu";

const ReadSecondScreen = ({ route }) => {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <ReadSecond item={item} />
            <View style={styles.menu}>
                <Menu />
            </View>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    menu: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        zIndex: 10
    }
}

export default ReadSecondScreen;