import { Text, View, TouchableOpacity, StyleSheet, RootTagContext } from "react-native";
import { Icon } from "@rneui/themed";

export default function Header() {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Descubrir</Text>
            <TouchableOpacity >
                <Icon
                    name="menu"      // el icono de tres rayas
                    type="material"  // fuente Material Icons
                    size={45}
                    color="#000"
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        width: "100%"
    },
    titulo: {
        fontSize: 30,
        fontWeight: "bold",
        paddingLeft: 5
    }
});