import Header from "../../componentes/Header"
import RecetasFlatList from "../../componentes/RecetasFlatList"
import { StatusBar } from "expo-status-bar"
import { FAB, Icon, Divider } from "@rneui/themed"

import { getRecetas, agregarReceta } from "../../servicios/Recetas"
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import { useCallback } from "react"
import { useRecetas } from "../../hooks/useRecetas"
import { useAuth } from "../../hooks/useAuth"

export default function Home() {

    const { logout } = useAuth()
    const navigation = useNavigation()
    const { recetas, setRecetas } = useRecetas()

    useFocusEffect(
        useCallback(() => {
            getRecetas()
                .then((r) => setRecetas(r))
                .catch(err => console.log("Error cargando recetas", err))
        }, [])
    )

    return (
        <>
            <Header logout={logout}/>
            <RecetasFlatList recetas={recetas} />
            <FAB
                icon={<Icon name="add" type="material" color="white" />}
                color="#1E88E5"
                placement="right"
                onPress={() => navigation.navigate("Form")}
            />
            <StatusBar style="auto" />
        </>
    )
}

