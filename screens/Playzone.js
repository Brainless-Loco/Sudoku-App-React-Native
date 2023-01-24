import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View,Image, Button } from 'react-native';
import BigSquare from '../components/BigSquare'
import MediumSquare from '../components/MediumSquare';
import NumberBtnList from '../components/NumberBtnList';
// import SmallSquareBox from '../components/SmallSquareBox';

export default function Playzone({ navigation}) {

  const [selectedBtn,setselectedBtn] = useState(' ')


  return (
    <View style={styles.container}>
      <Text>{selectedBtn}</Text>
      <BigSquare selectedBtn={selectedBtn}/>
      <NumberBtnList setselectedBtn={setselectedBtn}/>
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
