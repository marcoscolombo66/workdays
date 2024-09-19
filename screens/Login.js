import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState, TextInput } from 'react-native'
import { supabase } from '../supabase'
import { Button } from '@rneui/themed'
import { FontAwesome5 } from '@expo/vector-icons'

// Función para agregar un icono a los campos de entrada
const InputWithIcon = ({ iconName, ...rest }) => (
  <View style={styles.inputContainer}>
    <FontAwesome5 name={iconName} size={20} color="#666" style={styles.icon} />
    <TextInput {...rest} style={styles.input} />
  </View>
)

// Listener de AppState
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      Alert.alert(error.message)
    }

    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <InputWithIcon
        iconName="envelope"
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        keyboardType="email-address"
      />
      <InputWithIcon
        iconName="lock"
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
      />
      <Button
        title="Sign in"
        disabled={loading}
        onPress={() => signInWithEmail()}
        style={styles.button}
      />
      <View style={styles.signupButtonContainer}>
      <Button
        title="Sign up"
        disabled={loading}
        onPress={() => signUpWithEmail()}
        style={[styles.button, styles.signupButton]}
      />
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  button: {
    marginTop: 20,
    marginBottom: 10, // Añadir margen inferior al botón "Sign in"
  },
  signupButtonContainer: {
    marginTop: 10,
  },
  signupButton: {
    backgroundColor: '#4CAF50',
  },
})
