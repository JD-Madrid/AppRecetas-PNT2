import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../../hooks/useAuth';

import { Home, Detalle, Login, Form } from "../../screens"

const Stack = createNativeStackNavigator()

export default function Navigation() {
    const { auth } = useAuth() //Destructuramos el hook useAuth para obtener solo auth y no setAuth

    return (
        <Stack.Navigator>
            {
                auth ? (
                    <>
                        {/*Render prop: lo que te permite es pasar props personalizados a la pantalla (recetas y setRecetas)*/}
                        < Stack.Screen
                            name="Home"
                            component={Home}
                            options={{ headerShown: false }}
                        />

                        {/*Render prop: lo que te permite es pasar props personalizados a la pantalla (recetas y setRecetas)*/}
                        <Stack.Screen
                            name="Form"
                            component={Form}
                            options={{ headerShown: false }}
                        />

                        {/* component={Home}: Solo le pasás el componente, React Navigation lo instancia automáticamente.*/}
                        {/* <Stack.Screen name='Detalle' component={Detalle} options={{ title: "Detalle de la receta" }} /> */}
                        <Stack.Screen
                            name="Detalle"
                            component={Detalle}
                            options={{ title: "Detalle de la receta" }}
                        />
                    </>
                ) : (
                    <Stack.Screen
                        name='Login'
                        component={Login}
                        options={{ headerShown: false }}
                    />
                )
            }
        </Stack.Navigator>
    )
}