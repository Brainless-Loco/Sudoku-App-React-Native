import { View, Text, Image, Pressable, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth, db } from '../firebase/firebaseConfig';
import { useSelector } from 'react-redux';
import { addDoc, collection, query, where,getDocs, Timestamp, updateDoc, doc } from 'firebase/firestore/lite';
import { useState } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect } from 'react';


export default function Profile({navigation}) {

  const storageRef = getStorage();
  const usersColRef = collection(db,'users')

  
  const [imageUri, setImageUri] = useState(null);
  const [password, setpassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [newImageUri, setnewImageUri] = useState(null)


  const {userRef,userProfilePic,userEmail,userName} = useSelector(state=>state.currentPlayer_info)


  const preFetchDP = ()=>{
    const imageRef = ref(storageRef, userProfilePic);
    getDownloadURL(imageRef)
    .then((url) => {
      setImageUri(url);
    })
    .catch((error) => {
      console.error('Error retrieving image:', error);
    });
  }

  
  const getImageUrlToShow = (image)=>{
      const storageUrl = 'sudokuforever-b9936.appspot.com';
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${storageUrl}/o/${encodeURIComponent(image)}?alt=media`;
      return imageUrl

  }

  useEffect(() => {
    preFetchDP()
  }, [])

  const uploadAnImage = async () => {
    try{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
  
      if (!result.canceled) {
        setnewImageUri(result.assets[0].uri);
        setImageUri(result.assets[0].uri)
      }
    }
    catch(e){
      console.log(e)
    }
    
  };


  const updateProfileInformation = async ()=>{

    const storageUrl = 'sudokuforever-b9936.appspot.com';

    if (newImageUri) {
      const fileName = `images/${userRef}_${Date.now()}`;

      try {
        const response = await fetch(
          'https://firebasestorage.googleapis.com/v0/b/'+storageUrl+'/o?name='+fileName,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'image/jpeg' || 'image/png' || 'image/jpg',
            },
            body: await fetch(newImageUri).then((response) => response.blob()),
          }
        );
  
        if (response.ok) {
          const userDocRef = doc(db, 'users', userRef)
          try {
            await updateDoc(userDocRef, { dp_url: fileName });
          } catch (error) {
            console.error('Error updating profile picture:', error);
          }
          alert('Profile Information Updated')
        } 
        else {
          console.error('Error uploading image:', response.statusText);
        }
       } 
       catch (error) {
        console.error('Error uploading image:', error);
      }
    }

  }


  const signOutBtn = ()=>{
    signOut(auth)
    navigation.navigate('LogIn')
  }


  return (
    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={{backgroundColor:'white',paddingTop:20}}>


      {/* New Profile Picture Upload */}
      <Pressable style={styles.imageUploadButtonContainer} onPress={uploadAnImage}>
        <Image style={styles.imageStyle} source={{uri:imageUri}}/>
        <View style={styles.overlayEffect}>
            <Text style={{fontWeight:'bold',color:'cyan'}}>Click to upload new</Text>
        </View>
      </Pressable>

    {/* Change User Name */}

    <View style={{margin:5}}>
      <TextInput editable={false} style={styles.textInputStyle} value={userName}/>
      <TextInput style={styles.textInputStyle} secureTextEntry={true} showSoftInputOnFocus={true} onChangeText={(text)=>{setpassword(text)}} placeholder='Password'/>
      <TextInput style={styles.textInputStyle} secureTextEntry={true} showSoftInputOnFocus={true} onChangeText={(text)=>{setconfirmPassword(text)}} placeholder='Confirm Password'/>
    </View>

      <TouchableOpacity style={styles.updateProfileBtn} onPress={updateProfileInformation}>
        <Text style={{color:'white',fontSize:20,fontWeight:'600'}}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signOutBtn} onPress={signOutBtn}>
        <Text style={{color:'white',fontSize:20,fontWeight:'600'}}>Sign Out</Text>
      </TouchableOpacity>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  imageUploadButtonContainer:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height:'auto',
    padding:10,
    margin:5
  },
  imageStyle:{
    height:250,
    width:250,
    borderWidth:3,
    borderColor:'#0274ed',
    borderRadius:125
  },
  overlayEffect:{
    height:250,
    width:250,
    backgroundColor:'gray',
    opacity:0.8,
    position:'absolute',
    borderRadius:125,
    display:'flex',
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center',
    borderWidth:3,
    borderColor:'#0274ed',
  },
  textInputStyle:{
    borderWidth:2,
    borderColor:'#0274ed',
    borderRadius:30,
    height:50,
    color:'#0274ed',
    padding:10,
    fontWeight:'bold',
    marginBottom:10
  },
  updateProfileBtn:{
    backgroundColor:'#e80505',
    height:50,
    borderRadius:25,
    margin:10,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:12
  },
  signOutBtn:{
    display:'flex',
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    backgroundColor:'#a32121',
    width:'60%',
    height:50,
    borderRadius:25,
    textAlign:'center',
  }
})