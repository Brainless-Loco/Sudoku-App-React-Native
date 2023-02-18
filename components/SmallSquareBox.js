import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { current_grid_update, insert_action_history, update_selected_small_square_index } from '../redux/actions/Grid_actions';


export default function SmallSquareBox({id}) {
  
  const dispatch = useDispatch()

  const square_update = (id,val)=>dispatch(current_grid_update(id,val))
  const select_this_square_for_update = (id)=>dispatch(update_selected_small_square_index(id))
  const insert_an_action = (id,val)=>dispatch(insert_action_history(id,val))

  const row = Math.floor(id/10)%10
  const col = id%10

  const value = useSelector(state=>state.current_playing_grid[row-1][col-1]);
  const is_locked = useSelector(state=>state.is_Num_Button_Locked)
  const locked_button_key = useSelector(state=>state.selected_Button)
  const locked_square = useSelector(state=>state.selected_small_square_index)


  return (
    <Pressable style={[styles.container,locked_square==id ? styles.selected_square:styles.unselected_square]} 
    onPress={()=>{
        select_this_square_for_update(id)
        if(is_locked && locked_button_key) {
          insert_an_action(id,value)
          square_update(id,locked_button_key)
        } 
      }}>
        <Text style={styles.text} >{value}</Text>
      <StatusBar style="auto" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    margin:1,
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
  selected_square:{
    backgroundColor:'#0744e0', 
  },
  unselected_square:{
    backgroundColor: 'red',
  }
});
