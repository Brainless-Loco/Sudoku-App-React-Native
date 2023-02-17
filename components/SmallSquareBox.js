import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';


export default function SmallSquareBox({id}) {
  const row = Math.floor(id/10)%10
  const col = id%10
  const value = useSelector(state=>state.grid[row-1][col-1]);
  const is_locked = useSelector(state=>state.is_Num_Button_Locked)

  return (
    <Pressable style={styles.container} onPress={()=>{
        if(is_locked) console.log(id)
        // else 
      }}>
        <Text style={styles.text} >{value}</Text>
      <StatusBar style="auto" />
    </Pressable>
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
