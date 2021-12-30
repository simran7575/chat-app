import {auth,db } from '../Fire';
import React, { useLayoutEffect, useState,useCallback,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity , ImageBackground, Image} from 'react-native';
import { Icon } from 'react-native-elements';
import { Avatar } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase';
const ChatScreen=({navigation})=>{
    const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //   setMessages([
    //     {
    //       _id: 1,
    //       text: 'Hello developer',
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://placeimg.com/140/140/any',
    //       },
    //     },
    //   ])
    // }, [])
    useLayoutEffect(()=>{
        const unsubscribe = db.collection('chats').orderBy('createdAt',
        'desc').onSnapshot(snapshot=>setMessages(
         
            snapshot.docs.map(doc=>({
              
                _id:doc.data()._id,
               createdAt:new Date(doc.data().createdAt.seconds*1000),
            text:doc.data().text,
           user:doc.data().user
            }))
        ))
        return unsubscribe;
       
    },[])
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      const{
          _id,
          createdAt,
          text,
          user
      } = messages[0]
      db.collection('chats').add({
        _id,
        createdAt,
        text,
        user
      })
    }, [])

    const signOut=()=>{
        firebase.auth().signOut()
        .then(() => {
           navigation.replace("Login")
          }).catch((error) => {
            // An error happened.
          });
          
    }
  useLayoutEffect(()=>{
      navigation.setOptions({
          headerLeft:()=>(
              <View style={{marginLeft:20}}>
                  <Avatar rounded style={{width:40,height:40,borderRadius:'50%'}}source={{
                      uri:'data:image/png;base64,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'
                  }}/>
              </View>
          ),
          headerRight:()=>(
              <TouchableOpacity style={styles.logoutButton} onPress={()=>{signOut()}}>
                   <Icon name="logout" color="#0f0757" style={styles.icon}/>
                   <Text style={styles.logoutText}>Log Out</Text>
              </TouchableOpacity>

          )

          
      })

  })


  
    
    
        return (<View style={styles.container}>
            <ImageBackground source={require("../assets/background.jpg")} style={{flex:1,width:'100%',height:"100%"}}>
            <GiftedChat
                messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                name:auth?.currentUser?.displayName,
                avatar:auth?.currentUser?.photoURL
      }}
    />
            </ImageBackground>
            </View>
        );
    
}

export default ChatScreen;

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:"center",
        backgroundColor: '#2c3e50',
        
    },
    header:{
     width:"100%",
     height:"10%",
     backgroundColor:"#ffffff",
    alignItems:"center",
     position:"absolute",
     top:0,
     flexDirection:"row",
     justifyContent:"center"
     
    },
    icon:{
        width:40,
        height:40,
       
    },
    logoutText:{
        fontSize:20,
        color:"#0f0757"
    },
    logoutButton:{
        width:140,
        height:40,
        borderRadius:10,
        borderWidth:2,
        borderColor:"#0f0757",
        flexDirection:"row",
        marginRight:20,
        alignSelf:"flex-end",
        position:"absolute",
        right:0,
        top:10,
        backgroundColor:"#aaabad"

    },
    title:{
        fontSize:30,
        color:"#0f0757",
        textAlign:"center",
        fontWeight:"bold"

    },
    titleApp:{
        fontSize:30,
        color:"#0f0757",
        textAlign:"center",
        

    }, profilepic:{
        width:70,
        height:70,
        borderRadius:'50%',
        borderRadius:1,
        borderColor:"#0f0757",
        position:"absolute",
        left:0

    }
    

});



