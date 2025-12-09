import { Button, ButtonGroup } from '@rneui/themed'
import { useState } from 'react'
import { TextInput, View, Text, StyleSheet, ScrollView, KeyboardAvoidingView,Image} from "react-native"
import { Rating } from 'react-native-ratings'
import RNPickerSelect from "react-native-picker-select";
import { useNavigation, useRoute } from '@react-navigation/native';
import { agregarReceta, getRecetas, editarReceta } from '../../servicios/Recetas';
import { useRecetas } from "../../hooks/useRecetas"
import ImagenPickerComponente from '../../componentes/ImagenPicker';

//Validaciones
import { recetaSchema } from '../../validacion/recetasSchema';

export default function FormularioRecetas() {

    //Receta proveniente de DETALLE para actualizar
    const { recetas, setRecetas } = useRecetas()

    const { recetaData } = useRoute().params || {}
    const navigation = useNavigation()
    const [errores, setErrores] = useState({})

    const [receta, setReceta] = useState({
        nombre: recetaData?.nombre || "",
        tipo: recetaData?.tipo || "",
        descripcion: recetaData?.descripcion || "",
        tiempo: recetaData?.tiempo || "",
        dificultad: recetaData?.dificultad || "",
        valoracion: recetaData?.valoracion || 0,
        imagen: recetaData?.imagen || null
    })

    // Funcion para ir guardando los ingresos del form
    const handleChange = (key, valor) => {
        setReceta(previo => ({ ...previo, [key]: valor }))

        // Si ese campo tenía un error, lo borramos
        if (errores[key]) {
            setErrores(prev => ({ ...prev, [key]: null }));
        }
    }

    // Aca validamos que no haya errores o campos vacios - OPCION ASYNC AWAIT
    const handleSubmit = async () => {
        const resultado = recetaSchema.safeParse(receta)

        if (!resultado.success) {
            const formularioErrores = {}
            resultado.error.issues.forEach(err => {
                const campo = err.path[0]
                formularioErrores[campo] = err.message;
            });
            setErrores(formularioErrores)
            console.log("Errores:", formularioErrores)
            return;
        }

        // OPCION 1: Sintaxis ASYNC-AWAIT
        try {

            if (recetaData?._id) {
                // Actualizamos la receta
                console.log("Editando receta ID:", recetaData._id)
                const recetaEditada = await editarReceta(recetaData._id, receta)

                console.log("Receta editada: ", recetaEditada)

                // Refrescamos la lista en Home
                const todas = await getRecetas()
                setRecetas([...todas])

                navigation.goBack()
            } else {
                // Agregarmos una NUEVA RECETA
                const nueva = await agregarReceta(receta)
                console.log(nueva)
                const todas = await getRecetas()
                setRecetas([...todas])

                // Reseteo los campos del formulario
                setReceta({
                    nombre: "",
                    tipo: "",
                    descripcion: "",
                    tiempo: "",
                    dificultad: "",
                    valoracion: 0
                })
                navigation.goBack()  // Volvemos a la pagina principal al guardar 
            }
        } catch (error) {
            console.log("Error guardando la receta: ", error)
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>

            <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.titulo}>
                            {recetaData?._id ? "Editar receta" : "Añadir receta"}
                        </Text>
                    </View>

                    <View style={styles.form_container}>
                        <TextInput
                            style={styles.input_form}
                            name="nobre"
                            placeholder="Nombre"
                            value={receta.nombre}
                            onChangeText={(nuevo) => handleChange("nombre", nuevo)}
                        />
                        {errores.nombre && <Text style={styles.error}>{String(errores.nombre)}</Text>}

                        <View style={styles.pickerContainer}>
                            <RNPickerSelect
                                placeholder={{
                                    label: "Selecciona el tipo de receta...",
                                    value: null,
                                }}
                                value={receta.tipo}
                                onValueChange={(valor) => handleChange("tipo", valor)}
                                items={[
                                    { label: "Entrada", value: "entrada" },
                                    { label: "Plato principal", value: "plato principal" },
                                    { label: "Postre", value: "postre" }
                                ]}
                                style={styles.pickerSelectStyles}
                            />
                        </View>
                        {errores.tipo && <Text style={styles.error}>{String(errores.tipo)}</Text>}

                        <TextInput
                            style={styles.input_form}
                            name="descripcion"
                            placeholder="Escribe la descripción de la receta..."
                            value={receta.descripcion}
                            onChangeText={(nuevo) => handleChange("descripcion", nuevo)}
                            multiline={true}
                            numberOfLines={6}
                            textAlignVertical="top"
                        />
                        {errores.descripcion && <Text style={styles.error}>{String(errores.descripcion)}</Text>}

                        <TextInput
                            style={styles.input_form}
                            name="tiempo"
                            placeholder="Tiempo"
                            keyboardType="numeric"
                            value={receta.tiempo?.toString() || ""}
                            onChangeText={(nuevo) => handleChange("tiempo", nuevo)}
                        />
                        {errores.tiempo && <Text style={styles.error}>{String(errores.tiempo)}</Text>}

                        <ButtonGroup
                            containerStyle={styles.boton_group_dificultad}
                            buttons={["baja", "media", "alta"]}
                            selectedIndex={["baja", "media", "alta"].indexOf(receta.dificultad)}
                            onPress={(index) => {
                                handleChange("dificultad", ["baja", "media", "alta"][index])
                            }}
                        />
                        {errores.dificultad && <Text style={styles.error}>{String(errores.dificultad)}</Text>}

                        <Rating
                            style={styles.rating_container}
                            type="star"
                            ratingCount={5}
                            imageSize={50}
                            defaultRating={receta.valoracion}
                            onFinishRating={(rating) => {
                                console.log("Valoracion: ", rating)
                                handleChange('valoracion', rating)
                            }}
                        />
                        {errores.valoracion && <Text style={styles.error}>{String(errores.valoracion)}</Text>}

                        {/* ***********************COMPONENTE DE IMAGEN**************** */}
                        <ImagenPickerComponente imagenSeleccionada={(uri) => handleChange("imagen", uri)} />
                        {receta.imagen && (
                            <View style={{ marginVertical: 10, alignItems: "center" }}>
                                <Image source={{ uri: receta.imagen }} style={{ width: 150, height: 150, borderRadius: 10 }} />
                            </View>
                        )}
                    </View>
                    <View style={styles.botones}>
                        <Button title="Aceptar" onPress={handleSubmit} />
                        <Button title="Cancelar" onPress={() => navigation.goBack()} />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#fac6c6ff",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginVertical: 8,
        backgroundColor: "#fff",
    },
    pickerSelectStyles: {
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
    },
    error: {
        color: "red",
        fontSize: 14,
    }
})