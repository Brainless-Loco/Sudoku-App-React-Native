import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function SmallSquareBox() {

    let x = Math.floor(Math.random() * 9) + 1;

  return (
    <View style={styles.container}>
        <Text style={styles.text}>{x}</Text>
      
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
    height:42,
    width: '31%',
    borderRadius: 8,
  },
  text: {
    color:"white",
    fontSize:20,
    fontWeight:"bold",
  },
});
