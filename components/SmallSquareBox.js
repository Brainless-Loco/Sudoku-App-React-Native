import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const white=7;
export default function SmallSquareBox({selectedBtn,id}) {
  const row = Math.floor(id/10)%10
  const col = id%10
  const value = useSelector(state=>state.grid[row-1][col-1]);
  return (
    <View style={styles.container}>
        <Text style={styles.text}>{value}</Text>
      
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
