import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Button, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';
import {auth} from '../Fire'
import firebase from 'firebase';

const LoginScreen=({navigation}) =>{
   const [email, setEmail] = useState('');
   const[password,setPassword] = useState('')
   
   const signIn=()=>{
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {

      const user = userCredential.user;
      
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage)
    });

   }
   
    
  
        useEffect(()=>{
            const unsubscribe= auth.onAuthStateChanged((user) => {
                if (user) {
                      
                  const uid = user.uid;
                  navigation.replace("Chat")
                  // ...
                } else {
                 navigation.canGoBack()&&
                 navigation.popToPop();
                }
              });
              return unsubscribe
    
        },[]);
        return (
            <View style={styles.container}>
                <ImageBackground source={require("../assets/back.png")} style={{flex:1, width:'100%',height:'100%',resizeMode:"cover",alignItems:"center"}}>
                <View style={styles.emailcontainer}>
                <Icon name="email" color="#0f0757" style={styles.icon}/>
               <TextInput style={styles.input}
               placeholder='Enter Your Email'
               placeholderTextColor="#8d4ed9"
               label="Email"
               leftIcon={{name:"material", type:"email"}}
               value={email}
               onChangeText={text=>setEmail(text)}/>
               </View>

               <View style={styles.emailcontainer}>
                   <Icon name="lock" color="#0f0757"style={styles.icon}/>
               <TextInput style={styles.input}
               placeholder='Enter Your Password'
               placeholderTextColor="#8d4ed9"
               label="Password"
               leftIcon={{name:"material", type:"lock"}}
               value={password}
               onChangeText={text=>setPassword(text)}
               secureTextEntry/>
               </View>
               <TouchableOpacity style={styles.button} onPress={()=>{signIn()}}>
                   <Text style={styles.buttonText}>Login</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Register")}>
                   <Text style={styles.buttonText}>Register</Text>
               </TouchableOpacity>
               </ImageBackground>
            </View>
               
           
        );
    
}
export default LoginScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        backgroundColor: '#8747d1',
        
    },
    button:{
        width:140,
        height:50,
        borderRadius:10,
        marginTop:30,
        backgroundColor:"#0f0757",
      
    },
    buttonText:{
        fontSize:23,
        color:"#e8e4ed",
        textAlign:"center",
        marginTop:7
     
       
    },
    emailcontainer:{
        flexDirection:"row",
        width:400,
        height:100,
        alignItems:"center"
    },
    icon:{
        width:40,
        height:40,
       
    },
    input:{
        width:400,
        height:50,
        padding:20,
        backgroundColor:"#e8e4ed",
        borderRadius:5,
      

    }
    
});



