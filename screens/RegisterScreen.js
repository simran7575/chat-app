import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image,ImageBackground, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import firebase from 'firebase';
import {auth} from '../Fire';

export default class RegisterScreen extends Component {
    constructor(props){
       super(props);
       this.state={
           name:"",
           email:"",
           password:"" ,
           imageUrl:""
       }
    }

   register(email, password){
       auth.createUserWithEmailAndPassword(email,password)
       .then((userCredential)=>{
           var user = userCredential.user;
           user.updateProfile({
               displayName:this.state.name,
               photoURL:this.state.imageUrl
           }).then(function(){})
           .catch(function(error){
               alert("error occured")
           })
           this.props.navigation.popToTop()
       }).catch((error)=>{
           var errorMessage = error.message;
           alert(errorMessage)
       })
   }


    
    render() {
       
        return (
            <View style={styles.container}>
             <ImageBackground source={require("../assets/back.png")} style={{flex:1, width:'100%',height:'100%',resizeMode:"cover",alignItems:"center"}}>
                 <View style={styles.emailcontainer}>
                <Icon name="badge" color="#0f0757" style={styles.icon}/>
               <TextInput style={styles.input}
               placeholder='Enter Your Name'
               placeholderTextColor="#8d4ed9"
               value={this.state.name}
               onChangeText={text=>this.setState({name:text})}/>
               </View>

                <View style={styles.emailcontainer}>
                <Icon name="email" color="#0f0757" style={styles.icon}/>
               <TextInput style={styles.input}
               placeholder='Enter Your Email'
               placeholderTextColor="#8d4ed9"
               label="Email"
               leftIcon={{name:"material", type:"email"}}
               value={this.state.email}
               onChangeText={text=>this.setState({email:text})}/>
               </View>

               <View style={styles.emailcontainer}>
                   <Icon name="lock" color="#0f0757"style={styles.icon}/>
               <TextInput style={styles.input}
               placeholder='Enter Your Password'
               placeholderTextColor="#8d4ed9"
               label="Password"
               leftIcon={{name:"material", type:"lock"}}
               value={this.state.password}
               onChangeText={text=>this.setState({password:text})}
               secureTextEntry/>
               </View>

               <View style={styles.emailcontainer}>

                <Icon name="face" color="#0f0757" style={styles.icon}/>
               <TextInput style={styles.input}
               placeholder='Enter Your Image Url'
               placeholderTextColor="#8d4ed9"
               value={this.state.imageUrl}
               onChangeText={text=>this.setState({imageUrl:text})}/>
               </View>
              
               <TouchableOpacity style={styles.button} onPress={()=>{this.register(this.state.email,this.state.password);
                }}>
                   <Text style={styles.buttonText}>Register</Text>
               </TouchableOpacity>
               </ImageBackground>
            </View>
               
           
        );
    }
}


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



