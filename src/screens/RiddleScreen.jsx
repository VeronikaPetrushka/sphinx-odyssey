import { View } from "react-native"
import Riddle from "../components/Riddle"
import Menu from "../components/Menu";

const RiddleScreen = () => {
    return (
        <View style={styles.container}>
            <Riddle />
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

export default RiddleScreen;