import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { useState } from "react";
import AuthServices from "../../servicios/Auth/authServices.js"
import { useAuth } from "../../hooks/useAuth.js";
import { Ionicons } from '@expo/vector-icons';

export default function Login() {

    const [formData, setFormData] = useState({
        email: ``,
        contrasenia: ``
    })

    const [msjError, setMsjError] = useState(null)
    const [mostrarPassword, setMostrarPassword] = useState(false)
    const { setAuth } = useAuth()

    const handledSubmit = () => {
        console.log("formData", formData)
        AuthServices.login(formData.email, formData.contrasenia).then((data) => {
            console.log("Usuario autenticado", data)
            setAuth(data)
            setMsjError(null)
        }).catch((error) => {
            console.log("Error ", error)
            setMsjError(error.message)
        })
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
            {/* Logo */}
            <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                    <Ionicons name="restaurant" size={40} color="#FF6B35" />
                </View>
            </View>

            {/* Título y subtítulo */}
            <Text style={styles.titulo}>RecetApp</Text>
            <Text style={styles.subtitulo}>Bienvenido de nuevo</Text>
            <Text style={styles.descripcion}>
                Ingresa tus credenciales para{'\n'}continuar cocinando tus platos{'\n'}favoritos
            </Text>

            {/* Formulario */}
            <View style={styles.input_container}>
                <Text style={styles.label}>Nombre de usuario</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej: chef_master"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={formData.email}
                    onChangeText={(text) =>
                        setFormData({ ...formData, email: text })}
                />

                <Text style={styles.label}>Contraseña</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputPassword}
                        placeholder="••••••••"
                        placeholderTextColor="#999"
                        secureTextEntry={!mostrarPassword}
                        value={formData.contrasenia}
                        onChangeText={(text) =>
                            setFormData({ ...formData, contrasenia: text })
                        }
                    />
                    <TouchableOpacity 
                        style={styles.eyeIcon}
                        onPress={() => setMostrarPassword(!mostrarPassword)}
                    >
                        <Ionicons 
                            name={mostrarPassword ? "eye-off" : "eye"} 
                            size={20} 
                            color="#999" 
                        />
                    </TouchableOpacity>
                </View>

                {msjError && (
                    <Text style={styles.msjError}>{msjError}</Text>
                )}

                <TouchableOpacity 
                    style={styles.botonLogin}
                    onPress={handledSubmit}
                >
                    <Text style={styles.textoBoton}>Iniciar Sesión</Text>
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
        flexGrow: 1,
        paddingHorizontal: 30,
        justifyContent: "center",
        paddingVertical: 20
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 20
    },
    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#FFE8E0",
        justifyContent: "center",
        alignItems: "center"
    },
    titulo: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        color: "#1A1A1A",
        marginBottom: 8
    },
    subtitulo: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        color: "#1A1A1A",
        marginBottom: 8
    },
    descripcion: {
        fontSize: 14,
        textAlign: "center",
        color: "#666",
        lineHeight: 20,
        marginBottom: 40
    },
    input_container: {
        marginTop: 20
    },
    label: {
        fontSize: 14,
        color: "#1A1A1A",
        marginBottom: 8,
        fontWeight: "500"
    },
    input: {
        backgroundColor: "#FFF",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        color: "#1A1A1A"
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        marginBottom: 10
    },
    inputPassword: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: "#1A1A1A"
    },
    eyeIcon: {
        paddingHorizontal: 16
    },
    botonLogin: {
        backgroundColor: "#FF6B35",
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: "center",
        marginTop: 20,
        shadowColor: "#FF6B35",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5
    },
    textoBoton: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600"
    },
    msjError: {
        color: "#E74C3C",
        textAlign: "center",
        marginTop: 10,
        fontSize: 14
    }
});