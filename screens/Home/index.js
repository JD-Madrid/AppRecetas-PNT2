import Header from "../../componentes/Header"
import RecetasFlatList from "../../componentes/RecetasFlatList"
import { StatusBar } from "expo-status-bar"
import { FAB, Icon, Divider } from "@rneui/themed"

import { useState, useEffect } from "react"
import { getRecetas, agregarReceta } from "../../servicios/Recetas"

export default function Home() {

    const [recetas, setRecetas] = useState([])
    // const [showForm, setForm] = useState(false)

    useEffect(() => {
        getRecetas().then((recetas) => {
            console.log(recetas)
            setRecetas(recetas)
        })
    }, [])

    return (
        <>
            <Header />
            <Divider width={1} />
            <RecetasFlatList recetas={recetas} />
            <FAB
                icon={<Icon name="add" type="material" color="white" />}
                color="#1E88E5"
                placement="right"
                onPress={console.log("Agregar nueva receta...")}
            />
            <StatusBar style="auto" />
        </>
    )
}