import { Button, ButtonGroup } from '@rneui/themed'
import { useState } from 'react'
import { TextInput, View, Text, StyleSheet } from "react-native"
import { Rating } from 'react-native-ratings'
import RNPickerSelect from "react-native-picker-select";

export default function FormularioRecetas({ cambiar }) {

    const [receta, setReceta] = useState({
        nombre: "",
        tipo: "",
        descripcion: "",
        tiempo: "",
        dificultad: "",
        valorizacion: 0
    })

    // Funcion para ir guardando los ingresos del form
    const manejarIngresos = (key, valor) => {
        setReceta(previo => ({ ...previo, [key]: valor }))
    }

    // Guardamos el objeto al darle en el boton aceptar
    const guardarReceta = () => {
        console.log(receta)
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.titulo}>Añadir receta</Text>
            </View>

            <View style={styles.form_container}>
                <TextInput
                    style={styles.input_form}
                    name="nobre"
                    placeholder="Nombre"
                    value={receta.nombre}
                    onChangeText={(nuevo) => manejarIngresos("nombre", nuevo)}
                />
                <RNPickerSelect
                    placeholder={{
                        label: "Selecciona el tipo de receta...",
                        value: null,
                    }}
                    value={receta.tipo}
                    onValueChange={(valor) => manejarIngresos("tipo", valor)}
                    items={[
                        { label: "Entrada", value: "entrada" },
                        { label: "Plato principal", value: "plato principal" },
                        { label: "Postre", value: "postre" }
                    ]}
                    style={styles.pickerSelectStyles}
                />
                <TextInput
                    style={styles.input_form}
                    name="descripcion"
                    placeholder="Escribe la descripción de la receta..."
                    value={receta.descripcion}
                    onChangeText={(nuevo) => manejarIngresos("descripcion", nuevo)}
                    multiline={true}
                    numberOfLines={6}
                    textAlignVertical="top"
                />
                <TextInput
                    style={styles.input_form}
                    name="tiempo"
                    placeholder="Tiempo"
                    keyboardType="numeric"
                    value={receta.tiempo}
                    onChangeText={(nuevo) => manejarIngresos("tiempo", nuevo)}
                />
                <ButtonGroup
                    containerStyle={styles.boton_group_dificultad}
                    buttons={["baja", "media", "alta"]}
                    selectedIndex={["baja", "media", "alta"].indexOf(receta.dificultad)}
                    onPress={(index) => {
                        console.log("dificulta seleccionada", index)
                        manejarIngresos("dificultad", ["baja", "media", "alta"][index])
                    }}
                />
                <Rating
                style={styles.rating_container}
                    type="star"
                    ratingCount={5}
                    imageSize={50}
                    startingValue={receta.valorizacion}
                    onFinishRating={(rating) => {
                        console.log("valor estrella seleccionada: ", rating)
                        manejarIngresos('valorizacion', rating)
                    }}
                />
            </View>
            <View style={styles.botones}>
                <Button title="Aceptar" onPress={guardarReceta} />
                <Button title="Cancelar" onPress={cambiar} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#ffffff"
    },
    header: {
        alignItems: "center",
        padding: 15
    },
    titulo: {
        fontSize: 35,
        fontWeight: "bold"
    },
    form_container: {
        gap: 20
    },
    botones: {
        justifyContent: "center",
        flexDirection: "row",
        gap: 10,
        padding: 25
    },
    input_form: {
        borderWidth: 1,
        borderColor: "#fac6c6ff",
        borderRadius: 10,
        padding: 10
    },
    rating_container: {

    },
    boton_group_dificultad: {
        overflow: "hidden",
        borderRadius: 10,
        borderWidth: 2,
        fontWeight: "bold"
    },
    pickerSelectStyles: {
        inputIOS: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 5,
            borderColor: "gray",
            borderRadius: 8,
            color: "black",
            paddingRight: 30,
            marginVertical: 8
        },
        inputAndroid: {
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 8,
            color: "black",
            paddingRight: 30,
            marginVertical: 8
        }
    }
})