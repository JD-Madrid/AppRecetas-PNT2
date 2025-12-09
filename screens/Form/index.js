import { Button, ButtonGroup } from '@rneui/themed'
import { useState } from 'react'
import { TextInput, View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Image, Alert } from "react-native"
import { Rating } from 'react-native-ratings'
import RNPickerSelect from "react-native-picker-select";
import { useNavigation, useRoute } from '@react-navigation/native';
import { agregarReceta, getRecetas, editarReceta } from '../../servicios/Recetas';
import { useRecetas } from "../../hooks/useRecetas"
import ImagenPickerComponente from '../../componentes/ImagenPicker';

//Validaciones
import { recetaSchema } from '../../validacion/recetasSchema';

export default function FormularioRecetas() {

    const { recetas, setRecetas } = useRecetas()
    const { recetaData } = useRoute().params || {}
    const navigation = useNavigation()
    const [errores, setErrores] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [receta, setReceta] = useState({
        nombre: recetaData?.nombre || "",
        tipo: recetaData?.tipo || "",
        descripcion: recetaData?.descripcion || "",
        tiempo: recetaData?.tiempo || "",
        dificultad: recetaData?.dificultad || "",
        valoracion: recetaData?.valoracion || 0,
        imagen: recetaData?.imagen || null
    })

    const handleChange = (key, valor) => {
        setReceta(previo => ({ ...previo, [key]: valor }))
        if (errores[key]) {
            setErrores(prev => ({ ...prev, [key]: null }));
        }
    }

    const handleSubmit = async () => {
        if (isSubmitting) {
            console.log("Ya hay un envío en proceso, ignorando");
            return;
        }

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

        setIsSubmitting(true);

        try {
            if (recetaData?._id) {
                console.log("Editando receta ID:", recetaData._id)
                const recetaEditada = await editarReceta(recetaData._id, receta)
                console.log("Receta editada: ", recetaEditada)
                
                const todas = await getRecetas()
                setRecetas([...todas])
                navigation.goBack()
            } else {
                const nueva = await agregarReceta(receta)
                console.log("Nueva receta agregada:", nueva)
                
                const todas = await getRecetas()
                setRecetas([...todas])

                setReceta({
                    nombre: "",
                    tipo: "",
                    descripcion: "",
                    tiempo: "",
                    dificultad: "",
                    valoracion: 0,
                    imagen: null
                })
                navigation.goBack()
            }
        } catch (error) {
            console.log("Error guardando la receta: ", error)
            Alert.alert("Error", "No se pudo guardar la receta. Intenta nuevamente.");
        } finally {
            setIsSubmitting(false);
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
                            placeholder="Nombre"
                            value={receta.nombre}
                            onChangeText={(nuevo) => handleChange("nombre", nuevo)}
                            editable={!isSubmitting}
                        />
                        {errores.nombre && <Text style={styles.error}>{String(errores.nombre)}</Text>}

                        <View style={styles.pickerContainer}>
                            <RNPickerSelect
                                placeholder={{ label: "Selecciona el tipo de receta...", value: null }}
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

                        {/* SOLUCIÓN iOS COMENTADA - TouchableOpacity + ref (no funciona en Android)
                        <TouchableOpacity 
                            onPress={() => {
                                console.log("Abriendo picker...");
                                pickerRef.current?.togglePicker();
                            }}
                            activeOpacity={0.7}
                            disabled={isSubmitting}
                        >
                            <View pointerEvents="none">
                                <RNPickerSelect
                                    ref={pickerRef}
                                    placeholder={{ label: "Selecciona el tipo de receta...", value: null }}
                                    value={receta.tipo || null}
                                    onValueChange={(valor) => {
                                        console.log("Valor seleccionado:", valor);
                                        handleChange("tipo", valor);
                                    }}
                                    items={[
                                        { label: "Entrada", value: "entrada" },
                                        { label: "Plato principal", value: "plato principal" },
                                        { label: "Postre", value: "postre" }
                                    ]}
                                    style={styles.pickerSelectStyles}
                                    useNativeAndroidPickerStyle={false}
                                    doneText="Aceptar"
                                    disabled={isSubmitting}
                                />
                            </View>
                        </TouchableOpacity>
                        */}

                        <TextInput
                            style={styles.input_form}
                            placeholder="Escribe la descripción de la receta..."
                            value={receta.descripcion}
                            onChangeText={(nuevo) => handleChange("descripcion", nuevo)}
                            multiline={true}
                            numberOfLines={6}
                            textAlignVertical="top"
                            editable={!isSubmitting}
                        />
                        {errores.descripcion && <Text style={styles.error}>{String(errores.descripcion)}</Text>}

                        <TextInput
                            style={styles.input_form}
                            placeholder="Tiempo"
                            keyboardType="numeric"
                            value={receta.tiempo?.toString() || ""}
                            onChangeText={(nuevo) => handleChange("tiempo", nuevo)}
                            editable={!isSubmitting}
                        />
                        {errores.tiempo && <Text style={styles.error}>{String(errores.tiempo)}</Text>}

                        <ButtonGroup
                            containerStyle={styles.boton_group_dificultad}
                            buttons={["baja", "media", "alta"]}
                            selectedIndex={["baja", "media", "alta"].indexOf(receta.dificultad)}
                            onPress={(index) => handleChange("dificultad", ["baja", "media", "alta"][index])}
                            disabled={isSubmitting}
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

                        <ImagenPickerComponente 
                            imagenSeleccionada={(uri) => handleChange("imagen", uri)} 
                        />
                        {receta.imagen && (
                            <View style={{ marginVertical: 10, alignItems: "center" }}>
                                <Image 
                                    source={{ uri: receta.imagen }} 
                                    style={{ width: 150, height: 150, borderRadius: 10 }} 
                                />
                            </View>
                        )}
                    </View>

                    <View style={styles.botones}>
                        <Button 
                            title={isSubmitting ? "Guardando..." : "Aceptar"}
                            onPress={handleSubmit}
                            disabled={isSubmitting}
                            loading={isSubmitting}
                        />
                        <Button 
                            title="Cancelar" 
                            onPress={() => navigation.goBack()}
                            disabled={isSubmitting}
                        />
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
    rating_container: {},
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
        inputIOS: {
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 8,
            color: "black",
            paddingRight: 30,
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
        },
        placeholder: {
            color: "#C7C7CD",
            fontSize: 16,
        }
    },
    error: {
        color: "red",
        fontSize: 14,
    }
})