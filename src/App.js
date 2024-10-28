import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { store } from './redux/store';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import ChatScreen from './components/ChatScreen';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
   return (
      <Provider store={store}>
         <NavigationContainer>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <Stack.Navigator initialRouteName="LoginScreen">
               <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
               <Stack.Screen name="SignupScreen" component={SignupScreen} />
               <Stack.Screen name="ChatScreen" component={ChatScreen} />
            </Stack.Navigator>
         </NavigationContainer>
      </Provider>
   );
}
