import React from "react";
import { Button, View, Platform, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImagenPickerComponente({ imagenSeleccionada }) {
    const pickImage = async () => {
        // Pedimos permiso para galería
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permiso denegado", "No se puede acceder a la galería");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images",
            allowsEditing: true,
            quality: 0.7,
        });
        if (!result.canceled) {
            imagenSeleccionada(result.assets[0].uri);
        }
    }

    const takePhoto = async () => {
        // Pedimos permiso para cámara
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permiso denegado", "No se puede usar la cámara");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.7,
        });

        if (!result.canceled) {
            imagenSeleccionada(result.assets[0].uri);
        }
    };
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
            <Button title="Seleccionar Imagen" onPress={pickImage} />
            <Button title="Tomar Foto" onPress={takePhoto} />
        </View>
    );
};