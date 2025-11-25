import { FlatList, StyleSheet } from "react-native";
import Receta from "../Receta";


export default function RecetasFlatList({ recetas }) {
    return (
        <FlatList
            data={recetas}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}  
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => <Receta receta={item} />}
        />
    )
}

const styles = StyleSheet.create({
    row: {
        justifyContent: "space-between", 
        paddingHorizontal: 10,          
    },
    listContainer: {
        paddingVertical: 10
    }
});