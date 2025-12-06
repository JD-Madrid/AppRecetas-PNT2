import { createContext, useContext, useState, useEffect } from "react"
import { getRecetas } from "../servicios/Recetas"

const RecetasContext = createContext()

export function RecetasProvider({ children }) {

    const [recetas, setRecetas] = useState([])

    useEffect(() => {
        getRecetas()
            .then(setRecetas)
    },[])

    return (
        <RecetasContext.Provider value={{ recetas, setRecetas }}>
            {children}
        </RecetasContext.Provider>
    )
}

export function useRecetas() {
    const contextRecetas = useContext(RecetasContext)

    if (!contextRecetas) {
        throw new Error("Error al usar contectRecetas")
    }
    return contextRecetas
}