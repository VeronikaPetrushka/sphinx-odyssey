import { View } from "react-native"
import Pyramids from "../components/Pyramids"
import Menu from "../components/Menu";

const PyramidsScreen = () => {
    return (
        <View style={styles.container}>
            <Pyramids />
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

export default PyramidsScreen;