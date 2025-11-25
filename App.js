//*** Importaciones de React ***
import { useState, useEffect, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//*** Importaciones de React-Navigation ***
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//*** Importaciones de pantallas ***
import FormularioRecetas from './screens/Form';
import Home from './screens/Home';
import Detalle from "./screens/Detalle"

import { getRecetas } from './servicios/Recetas';

export default function App() {

  const Stack = createNativeStackNavigator()
  const [recetas, setRecetas] = useState([])

  useEffect(() => {
    getRecetas()
      .then((recetas) => setRecetas(recetas)) // ---> ojo  .then(setRecetas) puede ser esta forma
      .catch(err => console.log("Error cargando recetas iniciales", err))
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator >

          {/*Render prop: lo que te permite es pasar props personalizados a la pantalla (recetas y setRecetas)*/}
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {() => <Home
              recetas={recetas}
              setRecetas={setRecetas}
            />
            }
          </Stack.Screen>

          {/*Render prop: lo que te permite es pasar props personalizados a la pantalla (recetas y setRecetas)*/}
          <Stack.Screen name="Formulario" options={{ headerShown: false }}>
            {(props) => {
              return (
                <FormularioRecetas
                  recetas={recetas}
                  setRecetas={setRecetas}
                />)
            }}
          </Stack.Screen>


          {/* component={Home}: Solo le pasás el componente, React Navigation lo instancia automáticamente.*/}
          {/* <Stack.Screen name='Detalle' component={Detalle} options={{ title: "Detalle de la receta" }} /> */}
          <Stack.Screen name="Detalle" options={{ title: "Detalle de la receta" }}>
            {(props) => {
              return (
                <Detalle
                  {...props}
                  recetas={recetas}
                  setRecetas={setRecetas}
                />
              )

            }
            }
          </Stack.Screen>

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
