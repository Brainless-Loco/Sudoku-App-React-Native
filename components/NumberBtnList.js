import { View, Text, StyleSheet, Button, Pressable } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { current_grid_update, insert_action_history, selected_Button_update } from '../redux/actions/Grid_actions'

export default function NumberBtnList() {

  const nums = ['1','2','3','4','5','6','7','8','9']
  const dispatch = useDispatch()

  const update_selected_button = (id) => dispatch(selected_Button_update(id))
  const square_update = (id,val)=>dispatch(current_grid_update(id,val))
  const insert_an_action = (id,val)=>dispatch(insert_action_history(id,val))

  
  const selected_index = useSelector(state=>state.selected_small_square_index)
  const selected_index_value = useSelector(state=>state.selected_small_square_value);
  const lock_btn_status = useSelector(state=>state.is_Num_Button_Locked)


  return (
    <View style={styles.container}>
      <View style={styles.midContainer}>
        {
          nums.map((num)=>{
            return <Pressable style={styles.btn} key={num} 
              onPress={()=>{
                  update_selected_button(num)
                  if(!lock_btn_status && selected_index) {
                    insert_an_action(selected_index,selected_index_value)
                     square_update(selected_index,num)
                  }
                  }} >
                <Text style={styles.text}>{num}</Text>
              </Pressable>
          })
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:"white",
    backgroundColor: 'white',
    borderColor:'#000099',
    borderTopWidth:1,
    borderBottomWidth:1,
    minHeight:60,
    width: '100%',
  },
  midContainer:{
    display:'flex',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    color:"white",
    height:50,
    width: '100%',
  },
  btn:{
    backgroundColor:'#000099',
    width:'10%',
    height:40,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 5
  },
  text: {
    color:"white",
    fontSize:20,
    fontWeight:"bold",
    margin:'auto'
  },
});