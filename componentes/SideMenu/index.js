import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth.js"

export default function SideMenu({ onClose, logout }) {
    const { auth } = useAuth()

    return (

        <View style={styles.menu_container}>
            <View style={styles.menu}>
                <Text style={styles.userName}>{auth?.user.fullname}</Text>

                <View style={styles.item_menu}>
                    <TouchableOpacity onPress={logout} style={styles.logoutButton}>
                        <FontAwesome name="sign-out" size={34} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.textCerrar}>Cerrar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    menu_container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1,
    },
    menu: {
        position: "absolute",
        top: 0,
        right: 0,
        width: "70%",
        height: "100%",
        backgroundColor: "rgba(255,255,255,0.95)",
        padding: 20,
        justifyContent: "space-between",
    },
    item_menu: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20
    },
    textCerrar: {
        marginLeft: 8,
        fontSize: 18,
        fontWeight: "bold"
    },
    userName: {
        fontSize: 22,
        fontWeight: "bold"
    }
})