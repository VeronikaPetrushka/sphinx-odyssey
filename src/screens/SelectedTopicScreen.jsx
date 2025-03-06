import { View } from "react-native"
import SelectedTopic from "../components/SelectedTopic"
import Menu from "../components/Menu";

const SelectedTopicScreen = ({ route }) => {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <SelectedTopic item={item} />
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

export default SelectedTopicScreen;