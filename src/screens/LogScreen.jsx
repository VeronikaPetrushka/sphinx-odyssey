import { View } from "react-native"
import Log from "../components/Log"

const LogScreen = () => {
    return (
        <View style={styles.container}>
            <Log />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default LogScreen;