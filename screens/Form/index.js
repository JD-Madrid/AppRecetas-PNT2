import { Button, ButtonGroup } from '@rneui/themed'
import { useState } from 'react'
import { TextInput, View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Image, Alert, TouchableOpacity, Platform } from "react-native"
import { Rating } from 'react-native-ratings'
import RNPickerSelect from "react-native-picker-select";
import { useNavigation, useRoute } from '@react-navigation/native';
import { agregarReceta, getRecetas, editarReceta } from '../../servicios/Recetas';
import { useRecetas } from "../../hooks/useRecetas"
import ImagenPickerComponente from '../../componentes/ImagenPicker';
import { Ionicons } from '@expo/vector-icons';

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
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Header con botón de cerrar */}
                <View style={styles.header}>
                    <TouchableOpacity 
                        onPress={() => navigation.goBack()}
                        style={styles.closeButton}
                        disabled={isSubmitting}
                    >
                        <Ionicons name="close" size={28} color="#1A1A1A" />
                    </TouchableOpacity>
                    <Text style={styles.titulo}>
                        {recetaData?._id ? "Editar Receta" : "Nueva Receta"}
                    </Text>
                    <TouchableOpacity 
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                    >
                        <Text style={[styles.guardarText, isSubmitting && styles.guardarTextDisabled]}>
                            {isSubmitting ? "..." : "Guardar"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.form_container}>
                    {/* Imagen del plato */}
                    <View style={styles.imagenContainer}>
                        {receta.imagen ? (
                            <Image 
                                source={{ uri: receta.imagen }} 
                                style={styles.imagenPreview} 
                            />
                        ) : (
                            <View style={styles.imagenPlaceholder}>
                                <Ionicons name="camera" size={40} color="#FF6B35" />
                                <Text style={styles.imagenPlaceholderText}>Añadir foto del plato</Text>
                            </View>
                        )}
                        
                        {/* Botones personalizados de imagen */}
                        <View style={styles.botonesImagenContainer}>
                            <ImagenPickerComponente 
                                imagenSeleccionada={(uri) => handleChange("imagen", uri)}
                                customButtons={(onGaleria, onCamara) => (
                                    <View style={styles.botonesImagen}>
                                        <TouchableOpacity 
                                            style={styles.botonImagen}
                                            onPress={onGaleria}
                                        >
                                            <Text style={styles.botonImagenText}>Seleccionar Imagen</Text>
                                        </TouchableOpacity>
                                        
                                        <TouchableOpacity 
                                            style={styles.botonImagen}
                                            onPress={onCamara}
                                        >
                                            <Text style={styles.botonImagenText}>Tomar Foto</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        </View>
                    </View>

                    {/* Nombre de la receta */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nombre de la receta</Text>
                        <TextInput
                            style={[styles.input, errores.nombre && styles.inputError]}
                            placeholder="Ej. Paella Valenciana"
                            placeholderTextColor="#999"
                            value={receta.nombre}
                            onChangeText={(nuevo) => handleChange("nombre", nuevo)}
                            editable={!isSubmitting}
                        />
                        {errores.nombre && <Text style={styles.errorText}>{String(errores.nombre)}</Text>}
                    </View>

                    {/* Tipo de plato */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Tipo de plato</Text>
                        <View style={[styles.pickerContainer, errores.tipo && styles.inputError]}>
                            <RNPickerSelect
                                placeholder={{ label: "Seleccionar tipo", value: null }}
                                value={receta.tipo}
                                onValueChange={(valor) => handleChange("tipo", valor)}
                                items={[
                                    { label: "Entrada", value: "entrada" },
                                    { label: "Plato principal", value: "plato principal" },
                                    { label: "Postre", value: "postre" }
                                ]}
                                style={pickerSelectStyles}
                                Icon={() => <Ionicons name="chevron-down" size={20} color="#FF6B35" />}
                            />
                        </View>
                        {errores.tipo && <Text style={styles.errorText}>{String(errores.tipo)}</Text>}
                    </View>


                    {/* Tiempo */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Tiempo (min)</Text>
                        <TextInput
                            style={[styles.input, errores.tiempo && styles.inputError]}
                            placeholder="45"
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            value={receta.tiempo?.toString() || ""}
                            onChangeText={(nuevo) => handleChange("tiempo", nuevo)}
                            editable={!isSubmitting}
                        />
                        {errores.tiempo && <Text style={styles.errorText}>{String(errores.tiempo)}</Text>}
                    </View>

                    {/* Dificultad */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Dificultad</Text>
                        <View style={styles.dificultadContainer}>
                            {["baja", "media", "alta"].map((nivel, index) => {
                                const isSelected = receta.dificultad === nivel;
                                const labels = { baja: "Fácil", media: "Media", alta: "Difícil" };
                                return (
                                    <TouchableOpacity
                                        key={nivel}
                                        style={[
                                            styles.dificultadButton,
                                            isSelected && styles.dificultadButtonSelected
                                        ]}
                                        onPress={() => handleChange("dificultad", nivel)}
                                        disabled={isSubmitting}
                                    >
                                        <Text style={[
                                            styles.dificultadText,
                                            isSelected && styles.dificultadTextSelected
                                        ]}>
                                            {labels[nivel]}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                        {errores.dificultad && <Text style={styles.errorText}>{String(errores.dificultad)}</Text>}
                    </View>

                    {/* Valoración personal */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Valoración personal</Text>
                        <Rating
                            style={styles.rating}
                            type="star"
                            ratingCount={5}
                            imageSize={40}
                            startingValue={receta.valoracion}
                            tintColor="#F5F5F5"
                            onFinishRating={(rating) => {
                                console.log("Valoracion: ", rating)
                                handleChange('valoracion', rating)
                            }}
                            readonly={isSubmitting}
                        />
                        {errores.valoracion && <Text style={styles.errorText}>{String(errores.valoracion)}</Text>}
                    </View>

                    {/* Descripción y pasos */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Descripción y pasos</Text>
                        <TextInput
                            style={[styles.textArea, errores.descripcion && styles.inputError]}
                            placeholder="Describe los pasos para preparar este plato..."
                            placeholderTextColor="#999"
                            value={receta.descripcion}
                            onChangeText={(nuevo) => handleChange("descripcion", nuevo)}
                            multiline={true}
                            numberOfLines={6}
                            textAlignVertical="top"
                            editable={!isSubmitting}
                        />
                        {errores.descripcion && <Text style={styles.errorText}>{String(errores.descripcion)}</Text>}
                    </View>

                    {/* Botón de guardar grande */}
                    <TouchableOpacity 
                        style={[styles.guardarButton, isSubmitting && styles.guardarButtonDisabled]}
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <Text style={styles.guardarButtonText}>Guardando...</Text>
                        ) : (
                            <>
                                <Ionicons name="bookmark" size={20} color="#FFF" />
                                <Text style={styles.guardarButtonText}>Guardar Receta</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5"
    },
    scrollContainer: {
        paddingBottom: 30
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: "#FFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0"
    },
    closeButton: {
        padding: 4
    },
    titulo: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1A1A1A"
    },
    guardarText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FF6B35"
    },
    guardarTextDisabled: {
        color: "#CCC"
    },
    form_container: {
        paddingHorizontal: 20,
        paddingTop: 20
    },
    imagenContainer: {
        marginBottom: 24,
        position: "relative"
    },
    imagenPreview: {
        width: "100%",
        height: 200,
        borderRadius: 16,
        backgroundColor: "#E0E0E0"
    },
    imagenPlaceholder: {
        width: "100%",
        height: 200,
        borderRadius: 16,
        backgroundColor: "#F0F0F0",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#E0E0E0",
        borderStyle: "dashed"
    },
    imagenPlaceholderText: {
        marginTop: 12,
        fontSize: 14,
        color: "#666",
        fontWeight: "500"
    },
    botonesImagenContainer: {
        marginTop: 16
    },
    botonesImagen: {
        flexDirection: "row",
        gap: 12,
        justifyContent: "center"
    },
    botonImagen: {
        backgroundColor: "#FF6B35",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        minWidth: 150,
        alignItems: "center",
        shadowColor: "#FF6B35",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3
    },
    botonImagenText: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "600"
    },
    inputGroup: {
        marginBottom: 20
    },
    label: {
        fontSize: 15,
        fontWeight: "600",
        color: "#1A1A1A",
        marginBottom: 8
    },
    input: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        color: "#1A1A1A"
    },
    inputError: {
        borderColor: "#E74C3C"
    },
    textArea: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        color: "#1A1A1A",
        minHeight: 120
    },
    pickerContainer: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        paddingHorizontal: 8
    },
    dificultadContainer: {
        flexDirection: "row",
        gap: 10
    },
    dificultadButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        alignItems: "center"
    },
    dificultadButtonSelected: {
        backgroundColor: "#FF6B35",
        borderColor: "#FF6B35"
    },
    dificultadText: {
        fontSize: 15,
        fontWeight: "500",
        color: "#666"
    },
    dificultadTextSelected: {
        color: "#FFF",
        fontWeight: "600"
    },
    rating: {
        alignSelf: "flex-start",
        paddingVertical: 8
    },
    errorText: {
        color: "#E74C3C",
        fontSize: 13,
        marginTop: 6,
        marginLeft: 4
    },
    guardarButton: {
        backgroundColor: "#FF6B35",
        borderRadius: 12,
        paddingVertical: 16,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        marginTop: 12,
        shadowColor: "#FF6B35",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5
    },
    guardarButtonDisabled: {
        backgroundColor: "#CCC",
        shadowOpacity: 0
    },
    guardarButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600"
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 14,
        paddingHorizontal: 10,
        color: "#1A1A1A",
        paddingRight: 30
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 14,
        paddingHorizontal: 10,
        color: "#1A1A1A",
        paddingRight: 30
    },
    placeholder: {
        color: "#999",
        fontSize: 16
    },
    iconContainer: {
        top: 14,
        right: 12
    }
});