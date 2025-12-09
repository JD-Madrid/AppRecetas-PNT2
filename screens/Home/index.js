import Header from "../../componentes/Header"
import RecetasFlatList from "../../componentes/RecetasFlatList"
import { StatusBar } from "expo-status-bar"

import { FAB, Icon } from "@rneui/themed"

import { getRecetas, agregarReceta } from "../../servicios/Recetas"
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import { useCallback, useState } from "react"
import { useRecetas } from "../../hooks/useRecetas"
import { useAuth } from "../../hooks/useAuth"

import SideMenu from "../../componentes/SideMenu";
import { StyleSheet } from "react-native";

export default function Home() {

    const { logout, auth } = useAuth()
    const navigation = useNavigation()
    const { recetas, setRecetas } = useRecetas()

    const [menuVisible, setMenuVisible] = useState(false)

    useFocusEffect(
        useCallback(() => {
            getRecetas(auth.access_token) // Le pasamnmos el token al getRecetas de servicio para autenticar con el backend
                .then((r) => setRecetas(r))
                .catch(err => console.log("Error cargando recetas", err))
        }, [])
    )

    return (
        <>
            <Header onMenuPress={() => setMenuVisible(true)} />
            
            {menuVisible && (
                <SideMenu onClose={() => setMenuVisible(false)} logout={logout} />
            )}

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

const styles = StyleSheet.create({

})