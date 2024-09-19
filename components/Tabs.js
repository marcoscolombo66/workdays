import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTachometerAlt, faCalendarAlt, faBell, faUserClock, faSignOutAlt, faUserTag } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, View } from 'react-native';
import { supabase } from '../supabase';

import Dashboard from '../screens/Dashboard';
import Disponibilidad from '../screens/Disponibilidad';
import Avisos from '../screens/Avisos';
import Vacaciones from '../screens/Vacaciones';
import Asistencia from '../screens/Asistencia';
const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2202',
      marginTop: 10,  
      marginBottom: 10  
    }}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

const CustomTabBar = ({ state, navigation }) => {
  const goToTab = (route) => {
    navigation.navigate(route);
  };

  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#222' }}>
      {state.routes.map((route, index) => (
        <CustomTabBarButton
          key={index}
          onPress={() => goToTab(route.name)}
        >
          {/* Agrega iconos según la pestaña */}
          {route.name === 'Dashboard' && (
            <FontAwesomeIcon icon={faTachometerAlt} size={24} color="white" />
          )}
          {route.name === 'Disponibilidad' && (
            <FontAwesomeIcon icon={faUserTag} size={24} color="white" />
          )}
          {route.name === 'Avisos' && (
            <FontAwesomeIcon icon={faBell} size={24} color="white" />
          )}
          {route.name === 'Vacaciones' && (
            <FontAwesomeIcon icon={faCalendarAlt} size={24} color="white" />
          )}
          {route.name === 'Asistencia' && (
            <FontAwesomeIcon icon={faUserClock} size={24} color="white" />
          )}
        </CustomTabBarButton>
      ))}
    </View>
  );
};

const Tabs = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Disponibilidad" component={Disponibilidad} />
      <Tab.Screen name="Avisos" component={Avisos} />
      <Tab.Screen name="Vacaciones" component={Vacaciones} />
      <Tab.Screen name="Asistencia" component={Asistencia} />
    </Tab.Navigator>
  );
};

export default Tabs;
