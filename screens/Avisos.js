// screens/Dashboard.js
import * as React from 'react';
import { View, Text,  StyleSheet } from 'react-native';
 
import { supabase } from '../supabase'; // Import UserContext
 
export default function Avisos({ navigation }) {
   
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avisos</Text>     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
