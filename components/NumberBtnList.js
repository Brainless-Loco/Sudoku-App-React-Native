import { View, Text, StyleSheet, Button, Pressable } from 'react-native'
import React from 'react'

export default function NumberBtnList({setselectedBtn}) {

  const nums = ['1','2','3','4','5','6','7','8','9']
  return (
    <View style={styles.container}>
      <View style={styles.midContainer}>
        {
          nums.map((num)=>{
            return <Pressable style={styles.btn} key={num} onPress={()=>{setselectedBtn(num)}} >
                <Text style={styles.text}>{num}</Text>
              </Pressable>
          })
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:"white",
    backgroundColor: 'white',
    minHeight:60,
    width: '100%',
  },
  midContainer:{
    display:'flex',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    color:"white",
    height:50,
    width: '100%',
  },
  btn:{
    backgroundColor:'red',
    width:'10%',
    height:40,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 5
  },
  text: {
    color:"white",
    fontSize:20,
    fontWeight:"bold",
    margin:'auto'
  },
});