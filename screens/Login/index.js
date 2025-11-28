import { Button, View, Text, StyleSheet } from "react-native";
import { Input } from "@rneui/base"

export default function Login() {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Login</Text>

            <View style={styles.input_container}>
                <Input placeholder="Email" keyboardType="email-address" autoCapitalize="none" />
                <Input placeholder="Password" secureTextEntry={true} keyboardType="visible-password" />
                <Button title="Login" onPress={() => console.log("login")} />
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
    }

});