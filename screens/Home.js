import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';

export default function Home() {

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to <Text style={{color:'red',fontWeight:'bolder'}}> Sudoku Forever</Text></Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
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
