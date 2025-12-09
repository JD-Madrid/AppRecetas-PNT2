import { createContext, useContext, useEffect, useState } from "react";
import { storeData, getData } from "../servicios/AsyncStorage/index.js"
import AuthServices from "../servicios/Auth/authServices.js"
import authServices from "../servicios/Auth/authServices.js";

const AuthData = createContext()

export function AuthProvider({ children }) {

    const [auth, setAuth] = useState(null)

    useEffect(() => {
        getData(authServices.KEY_AUTH)
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
            storeData(AuthServices.KEY_AUTH, auth) //Si tiene datos le inycto la data al storage
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