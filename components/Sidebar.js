import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { supabase } from '../supabase';
import { faBars, faTachometerAlt, faCalendarAlt, faBell, faSignOutAlt, faUserClock } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigation = useNavigation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={{ backgroundColor: '#222', paddingTop: 55 }} className={`bg-black ${isOpen ? 'w-60' : 'w-20'} h-full`}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={{ padding: 16 }}>
        <FontAwesomeIcon icon={faBars} size={24} color="white" />
      </TouchableOpacity>
      <View style={{ flex: 1, marginTop: 20, paddingLeft: 16 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
          <FontAwesomeIcon icon={faTachometerAlt} size={24} color="white" />
          {isOpen && <Text style={{ color: 'white', marginLeft: 16, paddingRight:10}}>Dashboard</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Disponibilidad')} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
          <FontAwesomeIcon icon={faCalendarAlt} size={24} color="white" />
          {isOpen && <Text style={{ color: 'white', marginLeft: 16, paddingRight:10 }}>Disponibilidad</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Avisos')} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
          <FontAwesomeIcon icon={faBell} size={24} color="white" />
          {isOpen && <Text style={{ color: 'white', marginLeft: 16, paddingRight:10 }}>Avisos</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Vacaciones')} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
          <FontAwesomeIcon icon={faUserClock} size={24} color="white" />
          {isOpen && <Text style={{ color: 'white', marginLeft: 16, paddingRight:10 }}>Vacaciones</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Asistencia')} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
          <FontAwesomeIcon icon={faCalendarAlt} size={24} color="white" />
          {isOpen && <Text style={{ color: 'white', marginLeft: 16, paddingRight:10 }}>Asistencia</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
          <FontAwesomeIcon icon={faSignOutAlt} size={24} color="white" />
          {isOpen && <Text style={{ color: 'white', marginLeft: 16, paddingRight:10 }}>Salir</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Sidebar;
