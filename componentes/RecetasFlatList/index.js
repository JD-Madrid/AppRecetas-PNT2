import { FlatList, StyleSheet } from "react-native";
import Receta from "../Receta";


export default function RecetasFlatList({ recetas }) {
    return (
        <FlatList
            data={recetas}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}   // 👈 clave
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => <Receta receta={item} />}

        />
    )

}

const styles = StyleSheet.create({
    row: {
        justifyContent: "space-between", // 👈 separa las dos columnas
        paddingHorizontal: 10,           // 👈 agrega margen igual a ambos lados
    },
    listContainer: {
        paddingVertical: 10
    }
});