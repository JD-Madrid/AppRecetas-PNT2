//*** Importaciones de React ***
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//*** Importaciones de React-Navigation ***
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//*** Importaciones de pantallas ***
import FormularioRecetas from './screens/Form';
import Home from './screens/Home';

export default function App() {

  const [showForm, setForm] = useState(true)
  const Stack = createNativeStackNavigator()

  const cambiar = () => {
    setForm(!showForm)
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator > 
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
          <Stack.Screen name="Formulario" component={FormularioRecetas} options={{title: "Añadir receta"}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
