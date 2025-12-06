import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../../hooks/useAuth';

import { Home, Detalle, Login, Form } from "../../screens/indexScreens"

const Stack = createNativeStackNavigator()

export default function Navigation() {
    const { auth } = useAuth() //Destructuramos el hook useAuth para obtener solo auth y no setAuth

    return (
        <Stack.Navigator>
            {
                auth ? (
                    <>
                        < Stack.Screen
                            name="Home"
                            component={Home}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Form"
                            component={Form}
                            options={{ headerShown: false }}
                        />
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