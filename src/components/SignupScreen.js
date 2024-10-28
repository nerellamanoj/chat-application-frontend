import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/slices/authSlice';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';

export default function SignupScreen({ navigation }) {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const dispatch = useDispatch();

   const handleSignup = async () => {
      try {
         await dispatch(signup({ email, password })).unwrap();
         navigation.navigate('LoginScreen');
      } catch (error) {
         Alert.alert('Signup Failed', error.message); // Display error if signup fails
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
         <Button title="Sign Up" onPress={handleSignup} />
         <Text onPress={() => navigation.navigate('LoginScreen')}>Log In</Text>
      </View>
   );
}

const styles = StyleSheet.create({
   container: { flex: 1, justifyContent: 'center', padding: 20 },
   input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 },
});
