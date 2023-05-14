import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View,Image, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { game_pattern_formation, gridUpdate } from '../redux/actions/Grid_actions';
import { generate_a_new_pattern } from '../sudoku_maker/sudoku_pattern_generator';
// import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react';
import { useState } from 'react';

export default function LandingPage({navigation}) {
  const dispatch = useDispatch()

  const update_current_game = (pattern)=>dispatch(gridUpdate(pattern))
  const form_new_game = (grid)=>dispatch(game_pattern_formation(grid))

  const [has_paused_game,set_paused_game_check] = useState(false)

  const is_there_any_paused_game = async ()=>{
    // var ret = await AsyncStorage.getItem('has_saved_game')
    var ret = '1'
    set_paused_game_check((ret === '1'))
  }

  useEffect(()=>{
    is_there_any_paused_game()
  },[])
  

  const current_grid = useSelector(state=>state.current_playing_grid)
  const right_value = useSelector(state=>state.grid)

  const update_everything_for_playzone = async ()=>{
    var new_pattern = generate_a_new_pattern()
    const temp = new_pattern.map((arr)=> arr.slice())
    form_new_game(temp)
    update_current_game(new_pattern)


  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/logo.png')}
      />
      <Text style={styles.welcomeText}>Welcome to <Text style={{color:'red'}}> Sudoku Forever</Text></Text>
      <Text style={styles.welcomeText}>&nbsp;</Text>
      <Pressable
        style={styles.enterPlayzoneBtn}
        onPress={ async () =>{
          update_everything_for_playzone()
          navigation.navigate('Playzone')
        }
        }
        ><Text style={styles.btnText}>Enter the Playzone</Text></Pressable>
        
        
        {
        has_paused_game&&<Pressable
        style={styles.enterPlayzoneBtn}
        onPress={() =>{
          update_everything_for_playzone()
          navigation.navigate('Playzone')
        }
        }
        ><Text style={styles.btnText}> Continue Previous </Text></Pressable>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  enterPlayzoneBtn:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: 'red',
    margin:8,
  },
  btnText:{
    color:'white',
    fontSize: 22
  }
});
