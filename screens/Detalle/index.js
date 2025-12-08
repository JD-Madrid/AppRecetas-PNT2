import { useRoute } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { getRecetaById, eliminarReceta } from "../../servicios/Recetas";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import { Button } from '@rneui/themed'

export default function Detalles() {
    const { id } = useRoute().params;
    const [receta, setReceta] = useState(null);
    const navigation = useNavigation()

    const [favorito, setFavorito] = useState(false);

    const toggleFavorito = () => {
        setFavorito(!favorito);
        console.log("A favoritos")
    };

    useFocusEffect(
        useCallback(() => {
            if (id) {
                getRecetaById(id)
                    .then((r) => setReceta(r))
                    .catch((error) => console.log("Error al obtener la receta", error));
            }
        }, [id])
    )

    // useEffect(() => {
    // }, [id]);

    const handleEliminar = () => {
        eliminarReceta(id)
            .then((data) => {
                console.log("Receta eliminada", data)
                navigation.goBack()
            }).catch((error => {
                console.log("Error al eliminar la receta", error)
            }))
    }

    return (
        <ScrollView style={styles.container}>
            {receta && (
                <>
                    <Image
                        source={{ uri: receta.imagen }}
                        style={styles.imagen}
                        borderRadius={10}
                        resizeMode="cover"
                    />

                    <View style={styles.info_container}>
                        <View style={styles.info_row}>
                            <View style={styles.texto_container}>
                                <Text style={styles.titulo}>{receta.nombre}</Text>
                                <Text style={styles.descripcion}>{receta.descripcion}</Text>
                            </View>
                            <TouchableOpacity onPress={toggleFavorito} style={styles.icono_favorito}>
                                <MaterialIcons
                                    name={favorito ? "star" : "star-outline"}
                                    size={40}
                                    color={favorito ? "#FFD700" : "#ccc"}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.botones_container}>
                            <Button buttonStyle={styles.boton} title="Editar" titleStyle={styles.boton_texto} onPress={() => navigation.navigate("Form", { recetaData: receta })} />
                            <Button buttonStyle={styles.boton} title="Borrar" titleStyle={styles.boton_texto} onPress={handleEliminar} />
                        </View>
                    </View>
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    imagen: {
        width: "100%",
        height: 300,
        marginBottom: 16
    },
    info_container: {
        paddingHorizontal: 16,
        paddingBottom: 16
    },
    info_row: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    texto_container: {
        flex: 1, // ocupa todo el espacio disponible a la izquierda
    },
    titulo: {
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 8
    },
    descripcion: {
        fontSize: 16,
        color: "#999999ff"
    },
    icono_favorito: {
        // marginLeft: 12,
        // justifyContent: "flex-start",
        // backgroundColor: "#fcfcfcff",
        // borderRadius: 40,
        // padding: 10,
        // elevation: 3
        marginLeft: 12,
        justifyContent: "flex-start",
        backgroundColor: "#fcfcfcff",
        borderRadius: 40,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    botones_container: {
        justifyContent: "center",
        flexDirection: "row",
        gap: 20,
        padding: 65
    },
    boton: {
        padding: 15,
        borderRadius: 10
    },
    boton_texto: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});