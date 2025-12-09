import { Button, View, Text, StyleSheet } from "react-native";
import { Input } from "@rneui/base"
import { useState } from "react";
import AuthServices from "../../servicios/Auth/authServices.js"
import { useAuth } from "../../hooks/useAuth.js";

export default function Login() {

    const [formData, setFormData] = useState({
        email: ``,
        contrasenia: ``
    })

    const [msjError, setMsjError] = useState(null)
    const { setAuth } = useAuth()

    const handledSubmit = () => {
        console.log("formData", formData)
        AuthServices.login(formData.email, formData.contrasenia).then((data) => {
            console.log("Usuario autenticado", data)
            setAuth(data)  // Inyectamos la data al estado  global
            setMsjError(null)
        }).catch((error) => {
            console.log("Error ", error)
            setMsjError(error.message)
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Login</Text>

            <View style={styles.input_container}>
                <Input
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={formData.email}
                    onChangeText={(text) =>
                        setFormData({ ...formData, email: text })}
                />
                <Input
                    placeholder="Password"
                    // keyboardType="visible-password"
                    secureTextEntry={true}
                    value={formData.contrasenia}
                    onChangeText={(text) =>
                        setFormData({ ...formData, contrasenia: text })
                    }
                />

                <Button title="Login" onPress={handledSubmit} />
                <Text style={styles.msjError}>{msjError}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center"
    },
    input_container: {
        marginTop: 20
    },
    msjError: {
        color: "red",
        textAlign: "center",
        marginTop: 10
    }

});