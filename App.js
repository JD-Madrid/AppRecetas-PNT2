import "react-native-gesture-handler"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//--
import { getRecetas, agregarReceta } from "./servicios/Recetas"
import Header from "./componentes/Header"

import { useState, useEffect } from 'react';

import RecetasFlatList from "./componentes/RecetasFlatList"
import { SafeAreaView } from 'react-native-safe-area-context';

import { FAB, Divider, Icon } from '@rneui/themed';

import FormularioRecetas from './screens/Form';

export default function App() {

  const [recetas, setRecetas] = useState([])
  const [showForm, setForm] = useState(false)

  useEffect(() => {
    getRecetas().then((recetas) => {
      console.log(recetas)
      setRecetas(recetas)
    })
  }, [])

  const cambiar = () => {
    setForm(!showForm)
  }

  return (
    <SafeAreaView style={styles.container}>

      {
        showForm ? <FormularioRecetas cambiar={cambiar}/> : (
          <>
            <Header />
            <Divider width={1} />
            <RecetasFlatList recetas={recetas} />
            <FAB
              icon={<Icon name="add" type="material" color="white" />}
              color="#1E88E5"
              placement="right"
              onPress={() => setForm(!showForm)}
            />
            <StatusBar style="auto" />
          </>
        )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f8',
  },
});
