import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BigSquare from '../components/BigSquare'
import NumberBtnList from '../components/NumberBtnList';
import { useSelector } from 'react-redux'

export default function Playzone({ navigation}) {
  
  
  return (
    <View style={styles.container}>
      <BigSquare/>
      <NumberBtnList/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText:{
    fontWeight: 'bold',
    fontSize: 20,
  },
  logo:{
    width: 150,
    height:150,
    margin: 30
  }
});
