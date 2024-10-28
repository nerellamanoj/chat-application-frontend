import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const dispatch = useDispatch();

   const handleLogin = async () => {
      try {
         await dispatch(login({ email, password })).unwrap();
         navigation.navigate('ChatScreen');
      } catch (error) {
         Alert.alert('Login Failed', error.message); // Display error if login fails
      }
   };

   return (
      <View style={styles.container}>
         <TextInput 
            placeholder="Email" 
            style={styles.input} 
            value={email} 
            onChangeText={setEmail} 
            autoCapitalize="none" 
            keyboardType="email-address" 
            textContentType="emailAddress"
         />
         <TextInput 
            placeholder="Password" 
            style={styles.input} 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry 
            textContentType="password"
         />
         <Button title="Login" onPress={handleLogin} />
         <Text onPress={() => navigation.navigate('SignupScreen')}>Sign Up</Text>
      </View>
   );
}

const styles = StyleSheet.create({
   container: { flex: 1, justifyContent: 'center', padding: 20 },
   input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 },
});
