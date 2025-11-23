import Header from "../../componentes/Header"
import RecetasFlatList from "../../componentes/RecetasFlatList"
import { StatusBar } from "expo-status-bar"
import { FAB, Icon, Divider } from "@rneui/themed"

import { useState, useEffect } from "react"
import { getRecetas, agregarReceta } from "../../servicios/Recetas"
import { useNavigation } from "@react-navigation/native"

export default function Home() {

    // const [showForm, setForm] = useState(false)
    const [recetas, setRecetas] = useState([])
    const navigation = useNavigation()

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
                onPress={() => navigation.navigate("Formulario")}
            />
            <StatusBar style="auto" />
        </>
    )
}