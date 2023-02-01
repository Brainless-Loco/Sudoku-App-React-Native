import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Store } from 'redux';

const white=7;
export default function SmallSquareBox({selectedBtn,id}) {

  return (
    <View style={styles.container}>
        <Text style={styles.text}>{selectedBtn}</Text>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin:1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    color:"white",
    height:32,
    width: '31%',
    borderRadius: 4,
  },
  text: {
    color:"white",
    fontSize:15,
    fontWeight:"bold",
  },
});