import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "../servicios/AsyncStorage/index.js"
import authServices from "../servicios/Auth/authServices.js";

const AuthData = createContext()

export function AuthProvider({ children }) {

    const [auth, setAuth] = useState(null)

    useEffect(() => {
        AsyncStorage.getData(authServices.KEY_AUTH)
            .then((data) => {
                console.log("Datos obtenidos de AsuncStorage", data)
                if (data) {
                    setAuth(data)
                } else {
                    setAuth(null)
                }
            })
    }, [])

    useEffect(() => {
        if (auth) {
            AsyncStorage.storeData(authServices.KEY_AUTH, auth) //Si tiene datos le inyecto/guardo en el storage.
        } else {
            AsyncStorage.clearData()
        }
    }, [auth])

    const logout = () => {
        setAuth(null)
    }

    return (
        <AuthData.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthData.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthData)
    if (!context) {
        throw new Error("Error al utilizar el custon hooks")
    }
    return context
}

