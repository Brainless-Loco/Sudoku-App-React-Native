import { View, Text, Image, Pressable, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { db } from '../firebase/firebaseConfig';

export default function SolveWithAI() {

    const [loading, setloading] = useState(false)
    const [imageUri, setImageUri] = useState(null);

    const openCamera = async () => {
        const { status } = await Camera.requestPermissionsAsync();
        const { status: cameraRollStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
        if (status === 'granted' && cameraRollStatus === 'granted') {
          let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });
      
          if (!result.cancelled) {
            setImageUri(result.assets[0].uri);
          }
        } else {
          console.log('Camera permission not granted');
        }
      };

      const uploadPhotoInFirebase = async ()=>{

        const storageUrl = 'sudokuforever-b9936.appspot.com';
          setloading(true)
          const fileName = 'sudoku.jpg';
    
          try {
            const response = await fetch(
              'https://firebasestorage.googleapis.com/v0/b/'+storageUrl+'/o?name='+fileName,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'image/jpeg' || 'image/png' || 'image/jpg',
                },
                body: await fetch(imageUri).then((response) => response.blob()),
              }
            )
            alert('uploaded')
            setloading(false)
           } 
           catch (error) {
            console.error('Error uploading image:', error);
            alert(error.code)
            setloading(false)
          }
    
      }
      
      

    return (
        <View>
            <Pressable style={styles.imageUploadButtonContainer} onPress={openCamera}>
                <Text style={[{fontWeight:'bold',color:'red',position:'absolute',top:'50%',zIndex:50}]}>Click to upload new</Text>
                <Image style={styles.imageStyle} height={'auto'} width={'auto'} source={{uri:imageUri}}/>
            </Pressable>

            <TouchableOpacity style={styles.uploadPictureBtn} onPress={uploadPhotoInFirebase}>
                <Text style={{color:'white',fontSize:20,fontWeight:'600'}}>
                {
                loading? <ActivityIndicator size={20} color={"white"} />:
                <FontAwesome5 name="check" size={20} color="white" >&nbsp; Solve</FontAwesome5>
                }</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    imageUploadButtonContainer:{
        position:'relative',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      marginTop:10,
      padding:20,
      overflow:'hidden'
    },
    imageStyle:{
        height: 450,
        width:'100%',
        borderWidth:1,
        borderColor:'#e80505',
        backgroundColor:'#fff',
        borderRadius:10,
    },
    uploadPictureBtn:{
      backgroundColor:'#e80505',
      height:50,
      borderRadius:10,
      margin:10,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      marginTop:12
    },
  })