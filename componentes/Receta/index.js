import { Card, Icon } from "@rneui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Receta({ receta }) {
    const navigation = useNavigation()

    return (
        <TouchableOpacity style={styles.container}
            onPress={() => navigation.navigate("Detalle", { id: receta._id })}
        >
            <Card containerStyle={styles.card_container}>
                <View style={styles.header_container}>
                    <View style={styles.header}>
                        <Image
                            source={{ uri: receta.imagen }}
                            style={{ width: "100%", height: 220 }} borderRadius={10}
                            resizeMode="cover"
                        />
                        <Text style={styles.header_titulo}>{receta.nombre}</Text>
                    </View>
                    <View style={styles.card_info}>
                        <View style={styles.tiempo_container}>
                            <Icon name="schedule" type="material" size={16} color="#5A9690" />
                            <Text style={styles.text_tiempo}>{receta.tiempo} min</Text>
                        </View>
                        <View style={styles.estrella_container}>
                            <MaterialIcons name="star" size={20} color="#FFD700" />
                            <Text style={styles.text_estrella}>
                                {receta.valoracion ? `${receta.valoracion}.0` : "0.0"}
                            </Text>
                        </View>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
        width: "48%"
    },
    card_container: {
        borderRadius: 15,
        overflow: "hidden",
        padding: 0,
        marginHorizontal: "1%"
    },
    header_container: {
        flexDirection: "column",
        gap: 15
    },
    header: {
        flexDirection: "column",
        gap: 10
    },
    header_titulo: {
        fontSize: 15,
        fontWeight: "bold",
        paddingLeft: 5,
        paddingRight: 1
    },
    card_info: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingBottom: 10,
        gap: 40
    },
    tiempo_container: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
        paddingLeft: 5
    },
    text_tiempo: {
        color: "#5A9690",
        fontSize: 15
    },
    estrella_container: {
        flexDirection: "row",
        alignItems: "center"
    },
    text_estrella: {
        color: "#5A9690",
        fontSize: 15
    }
});