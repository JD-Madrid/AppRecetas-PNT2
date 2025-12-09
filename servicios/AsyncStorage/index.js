import AsyncStorage from "@react-native-async-storage/async-storage";

//Guardamos la data del usuario para persistir la sesion
export const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (error) {
        console.log("Error al guardar los datos en storage", error)
    }
}

export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (error) {
        console.log("Error al obtener los datos den storage", error)
    }
}

//Limpiamos la data cuando hacemos logout
export const clearData = async () => {
    try {
        await AsyncStorage.clear()
    } catch (error) {
        console.log("Error al eliminar los datos", error)
    }
}

export default {
    storeData,
    getData,
    clearData
}


