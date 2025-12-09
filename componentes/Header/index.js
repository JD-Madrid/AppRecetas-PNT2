import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Divider, Icon } from "@rneui/themed";

export default function Header({ onMenuPress }) {

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Descubrir</Text>

            <TouchableOpacity onPress={onMenuPress} style={styles.icon_menu}>
                <Icon name="menu" type="material" size={45} color="#000" />
            </TouchableOpacity>

            <Divider width={1} style={styles.divider} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
    },
    titulo: {
        fontSize: 30,
        fontWeight: "bold",
        paddingLeft: 5
    },
    icon_menu: {
        paddingLeft: 160
    }
});
