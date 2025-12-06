import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Icon, Divider } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";

export default function Header({ logout }) {
    return (
        <View style={styles.container}>
            
            <View style={styles.topRow}>
                <Text style={styles.titulo}>Descubrir</Text>
                <TouchableOpacity>
                    <Icon
                        name="menu"
                        type="material"
                        size={45}
                        color="#000"
                    />
                </TouchableOpacity>
            </View>
            <Divider width={1} style={styles.divider} />
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
                <FontAwesome name="sign-out" size={24} color="black" />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 10
    },
    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    titulo: {
        fontSize: 30,
        fontWeight: "bold",
        paddingLeft: 5
    },
    divider: {
        marginTop: 10,
        marginBottom: 10
    },
    logoutButton: {
        alignSelf: "flex-end",
        padding: 10,
        marginRight: 10
    }
});
