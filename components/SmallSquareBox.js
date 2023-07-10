import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { current_grid_update, increase_mistake_count, insert_action_history, update_selected_small_square_index } from '../redux/actions/Grid_actions';


export default function SmallSquareBox({ id }) {

  const dispatch = useDispatch()

  const square_update = (id, val) => dispatch(current_grid_update(id, val))
  const select_this_square_for_update = (id) => dispatch(update_selected_small_square_index(id))
  const insert_an_action = (id, val) => dispatch(insert_action_history(id, val))
  const did_a_mistake = ()=>dispatch(increase_mistake_count())

  const row = (Math.floor(id / 10) % 10) - 1
  const col = (id % 10) - 1

  const correct_value = useSelector(state => state.grid[row][col]);
  const value = useSelector(state => state.current_playing_grid[row][col]);
  const is_locked = useSelector(state => state.is_Num_Button_Locked)
  const locked_button_key = useSelector(state => state.selected_Button)
  const locked_square = useSelector(state => state.selected_small_square_index)
  const is_editable_square = useSelector(state => state.is_editable[row][col])
  const is_pause = useSelector(state=>state.is_paused)

  // console.log(locked_button_key+' '+value)


  return (
    <Pressable style={[styles.container, !is_editable_square?styles.uneditable_square: locked_square == id ? styles.selected_square : styles.unselected_square,is_pause==true && {backgroundColor:'white',borderColor:'red'},
    is_locked && value==locked_button_key && styles.locked_btn_style]}
      onPress={() => {
        if (is_editable_square) {
          select_this_square_for_update(id)
          if (is_locked && locked_button_key && !is_pause) {
            insert_an_action(id, value)
            square_update(id, locked_button_key)
            if(locked_button_key!=correct_value) did_a_mistake()
          }
        }
        else {
          select_this_square_for_update(0)
        }
      }}>
      <Text style={[(is_locked && id!=locked_square && value==locked_button_key)? styles.locked_text:
      is_editable_square ?
        correct_value==value ? 
          styles.correct_value:styles.incorrect_value
        : is_locked && value==locked_button_key? styles.locked_text:styles.unselected_text]} >{value && !is_pause ? value : ''}</Text>
      <StatusBar style="auto" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: "white",
    height: 32,
    width: '31%',
    borderWidth: 2,
    borderRadius: 4,
  },
  uneditable_square:{
    backgroundColor: '#a30707',
    borderColor:'transparent'
  },
  unselected_square: {
    // backgroundColor: '#ed2d07',
    // borderColor: 'transparent',
    backgroundColor:'#fff',
    borderWidth:1.5,
    borderColor:'#a30707'
  },
  unselected_text: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  selected_square: {
    backgroundColor: '#ededed',
    borderColor: '#ed2d07',
    borderWidth:2, 
  },
  selected_text: {
    color: '#ed2d07',
    fontSize: 15,
    fontWeight: 'bold',
  },
  correct_value: {
    color: '#11c90a',
    fontWeight: 'bold',
  },
  incorrect_value: {
    color:'#7a7a7a',
    fontWeight: 'bold',
  },
  locked_text:{
    color:'cyan',
    fontWeight: 'bold',
  },
  locked_btn_style:{
    backgroundColor:'#540619'
  }

});
