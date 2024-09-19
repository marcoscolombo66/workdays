import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { supabase } from './supabase';
import Login from './screens/Login';
 
 
import Tabs from './components/Tabs'; // Cambio de Sidebar a Tabs

const Stack = createNativeStackNavigator();

function App() {
  const [session, setSession] = React.useState(null);

  React.useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      <View style={styles.container}>
        {session ? (
          // Aquí usamos el componente Tabs en lugar de Sidebar
          <Tabs />
        ) : (
          // Aquí mantenemos el enrutamiento de autenticación igual
          <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name="Login" component={Login} />
            
          </Stack.Navigator>
        )}
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default gestureHandlerRootHOC(App);
