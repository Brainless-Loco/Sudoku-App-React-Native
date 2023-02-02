import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View,Image, Button } from 'react-native';
import BigSquare from '../components/BigSquare'
import NumberBtnList from '../components/NumberBtnList';
import { useSelector, useDispatch } from 'react-redux'
import { valueUpdate,gridUpdate } from '../redux/actions/Grid_actions';
import SUDOKU from '../sudoku_maker/sudoku_pattern_generator';

export default function Playzone({ navigation}) {
  
  
  const [selectedBtn,setselectedBtn] = useState(' ')
  const grid = useSelector(state => state.grid)
  const dispatch = useDispatch()
  const sqre_value_update = ({index,val}) => dispatch(valueUpdate({index,val}))
  const new_pattern= SUDOKU;
  const update_current_game = (pattern)=>dispatch(gridUpdate(pattern))
  // console.log(grid)
  update_current_game(new_pattern)
  return (
    <View style={styles.container}>
      <Text>{selectedBtn}</Text>
      <BigSquare selectedBtn={selectedBtn}/>
      <NumberBtnList setselectedBtn={sqre_value_update}/>
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
