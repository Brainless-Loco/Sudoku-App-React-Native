import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function SudokuRow() {
  return (
    <View style={style.container}>
    </View>
  )
}

const style = StyleSheet.create({
    container: {
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
      color:"white",
      width: '100%',
    }
  });