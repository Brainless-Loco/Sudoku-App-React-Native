import { View, Text, Image, Pressable, StyleSheet, TouchableOpacity, ActivityIndicator, Modal } from 'react-native'
import React from 'react'
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';  

export default function SolveWithAI() {

    const [loading, setloading] = useState(false)
    const [imageUri, setImageUri] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [grid, setgrid] = useState([[]])

    const closeModal = () => {
      setModalVisible(false);
    };
    
    const openCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        const { status: cameraRollStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
        if (status === 'granted' && cameraRollStatus === 'granted') {
          let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });
      
          if (!result.canceled) {
            setImageUri(result.assets[0].uri);
          }
        } else {
          console.log('Camera permission not granted');
        }
      };

      const SelectFromGallery = async () => {
        try{
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            // aspect: [16, 9],
            quality: 1,
          });
      
          if (!result.canceled) {
            setImageUri(result.assets[0].uri);
          }
        }
        catch(e){
          console.log(e)
        }
        
      };

      const uploadPhotoInFirebase = async ()=>{
        setloading(true)
        const storageUrl = 'sudokuforever-b9936.appspot.com';
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
            );
            FlaskAPICall();
           } 
           catch (error) {
            console.error('Error uploading image:', error);
            alert(error.code)
          }
          setloading(false)
      }

      const FlaskAPICall = ()=>{
        const flaskAPIEndpoint = `http://192.168.0.108:5000/`;
        axios.get(flaskAPIEndpoint)
        .then(response => {
          // Handle the response data
          // console.log(response.data.solution);
          setgrid(response.data.solution)
          setModalVisible(true)
        })
        .catch(error => {
          // Handle any errors that occur during the request
          console.error(error);
        });
        }

        const StartSolvingTheImage = ()=>{
          uploadPhotoInFirebase();
        }

    return (
        <View style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <View style={styles.imageUploadButtonContainer} onPress={openCamera}>
                {imageUri==null && <Text style={[{fontWeight:'bold',color:'red',position:'absolute',top:'50%',zIndex:50}]}>Upload or capture</Text>}
                <Image style={styles.imageStyle} height={'auto'} width={'auto'} source={{uri:imageUri}}/>
            </View>
            <View  style={{flexDirection:'row',marginBottom:15}} >
              <Pressable style={styles.cameraAndGallaryBtn} onPress={SelectFromGallery}>
                <MaterialCommunityIcons style={styles.navigationIcon} name="view-gallery-outline" size={40} color="#e80505" />
                <Text style={styles.btnText}>Gallery</Text>
              </Pressable>
              <Pressable style={styles.cameraAndGallaryBtn} onPress={openCamera}>
                <Entypo name="camera" style={styles.navigationIcon} size={40} color="#e80505" />
                <Text style={styles.btnText}>Camera</Text>
              </Pressable>
            </View>
            

            <TouchableOpacity style={styles.uploadPictureBtn} disabled={imageUri==null} onPress={StartSolvingTheImage}>
                <Text style={{color:'white',fontSize:20,fontWeight:'600'}}>
                  {loading && <ActivityIndicator size={20} color={"white"} /> }&nbsp; {loading? "Solving" : "Solve"}
                </Text>
            </TouchableOpacity>



          <Modal visible={modalVisible} transparent animationType="fade">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Sudoku Solution</Text>
                <View style={styles.gridContainer}>
                  {
                    grid == `Solution doesn't exist. Model misread digits.` ?
                       <Text>{grid}</Text>:
                    grid.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.rowContainer}>
                      {row.map((value, columnIndex) => (
                        <View key={columnIndex} style={styles.cellContainer}>
                          <Text style={styles.cellText}>{value}</Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
                <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    imageUploadButtonContainer:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      marginTop:10,
      padding:20,
      overflow:'hidden',
      flexDirection:'column',
      width:'95%',
      height:270
    },
    imageStyle:{
        height:'100%',
        width:'100%',
        borderWidth:1,
        borderColor:'#e80505',
        backgroundColor:'#fff',
        borderRadius:10,
        resizeMode: 'contain'
    },
    uploadPictureBtn:{
      backgroundColor:'#e80505',
      height:50,
      borderRadius:10,
      margin:10,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      marginTop:12,
      width:'90%'
    },
    cameraAndGallaryBtn:{
      padding: 5,
      backgroundColor: '#fff',
      borderRadius: 8,
      width:'30%',
      borderWidth:0.5,
      borderColor:'#e80505',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      verticalAlign:'middle',
      marginHorizontal:10
    },
    navigationIcon:{
      width:'100%',
      textAlign:'center',
      verticalAlign:'middle'
    },
    btnText: {
      fontSize: 20,
      textAlign:'center',
      fontWeight:'500',
      color:'#e80505',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 8,
      width: '95%',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color:'#e80505',
      textAlign:'center'
    },
    gridContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems:'center',
      overflow:'hidden'
    },
    rowContainer: {
      flexDirection: 'row',
    },
    cellContainer: {
      width: 32,
      height: 32,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor:'#e80505',
    },
    cellText: {
      fontSize: 16,
      fontWeight:'500',
      color:'#138017'
    },
    cancelButton: {
      marginTop: 20,
      backgroundColor: '#e80505',
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent:'center',
      borderRadius: 4,
      marginHorizontal:60
    },
    cancelButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  })