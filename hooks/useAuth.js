import { createContext, useContext, useState } from "react";

const AuthData = createContext()

export function AuthProvider({children}) {

    const [auth, setAuth] = useState(null)

    return (
        <AuthData.Provider value={{auth,setAuth}}>
            {children}
        </AuthData.Provider>
    ) 
}

export function useAuth() {
    const context = useContext(AuthData)
    if(!context) {
        throw new Error("Error al utilizar el custon hooks")
    }
    return context
}