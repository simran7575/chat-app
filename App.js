import React, {Component} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ChatScreen from './screens/ChatScreen';
const Stack = createStackNavigator();

export default class App extends Component{
  render(){
    return(

     
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"  >
      <Stack.Screen name="Login" component={LoginScreen}  />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
    </NavigationContainer>
    )
  }

}