// import "react-native-gesture-handler"
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormularioRecetas from './screens/Form';
import Home from './screens/Home';

export default function App() {

  const [showForm, setForm] = useState(true)

  const cambiar = () => {
    setForm(!showForm)
  }

  return (
    <SafeAreaView style={styles.container}>
      {
        showForm ? <FormularioRecetas cambiar={cambiar} /> : <Home />
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f8',
  },
});
