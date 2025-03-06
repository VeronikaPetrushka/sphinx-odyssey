import { View } from "react-native"
import Topic from "../components/Topic"
import Menu from "../components/Menu";

const TopicScreen = () => {
    return (
        <View style={styles.container}>
            <Topic />
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

export default TopicScreen;