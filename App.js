//*** Importaciones de React ***
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//*** Importaciones de React-Navigation ***
import { NavigationContainer } from '@react-navigation/native';

import Navigation from './componentes/Navigation';
import { AuthProvider } from './hooks/useAuth';
import { RecetasProvider } from './hooks/useRecetas';

export default function App() {

  return (
    <NavigationContainer>
      <AuthProvider>
        <RecetasProvider>
          <SafeAreaView style={styles.container}> 
            <Navigation />
          </SafeAreaView >
        </RecetasProvider>
      </AuthProvider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
